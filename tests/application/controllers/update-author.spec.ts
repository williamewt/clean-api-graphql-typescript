import { Author } from '@prisma/client'
import { UpdateAuthorController } from '@/application/controllers'
import { HttpResponse, serverError } from '@/application/helpers'
import { NotUpdateError } from '@/application/errors'

describe('UpdateAuthorController', () => {
  let updateAuthor: jest.Mock
  let sut: UpdateAuthorController
  let id: number
  let name: string
  let authorData: HttpResponse<Author>

  beforeAll(() => {
    updateAuthor = jest.fn()
    authorData = {
      data: {
        id: 1,
        name: 'any_name',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      statusCode: 200
    }
    updateAuthor.mockResolvedValue(authorData.data)
    id = 1
    name = 'any_name'
  })

  beforeEach(() => {
    sut = new UpdateAuthorController(updateAuthor)
  })

  it('should call UpdateAuthor with correct params', async () => {
    await sut.handle({ id, name })

    expect(updateAuthor).toHaveBeenCalledWith({ id, name })
    expect(updateAuthor).toHaveBeenCalledTimes(1)
  })

  it('should return error if updateAuthor returns undefined', async () => {
    updateAuthor.mockResolvedValueOnce(undefined)

    const response = await sut.handle({ id, name })

    expect(response).toEqual({
      data: new NotUpdateError('Author'),
      statusCode: 400
    })
  })

  it('should return a new data if updateAuthor success', async () => {
    const response = await sut.handle({ id, name })

    expect(response).toEqual(authorData)
  })

  it('should return a Server Error if updateAuthor throws', async () => {
    updateAuthor.mockRejectedValueOnce(new Error('any_error'))

    const response = await sut.handle({ id, name })

    expect(response).toEqual(serverError(new Error('any_error')))
  })
})
