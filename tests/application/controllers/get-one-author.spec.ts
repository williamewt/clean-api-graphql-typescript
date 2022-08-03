import { Author } from '@prisma/client'
import { GetOneByIdAuthorController } from '@/application/controllers'
import { HttpResponse, serverError } from '@/application/helpers'
import { NotFindError } from '@/application/errors'

describe('GetOneByIdAuthorController', () => {
  let getOneByIdAuthor: jest.Mock
  let sut: GetOneByIdAuthorController
  let id: number
  let authorData: HttpResponse<Author>

  beforeAll(() => {
    getOneByIdAuthor = jest.fn()
    authorData = {
      data: {
        id: 1,
        name: 'any_name',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      statusCode: 200
    }
    getOneByIdAuthor.mockResolvedValue(authorData.data)
    id = 1
  })

  beforeEach(() => {
    sut = new GetOneByIdAuthorController(getOneByIdAuthor)
  })

  it('should call GetOneByIdAuthor with correct params', async () => {
    await sut.handle({ id })

    expect(getOneByIdAuthor).toHaveBeenCalledWith({ id })
    expect(getOneByIdAuthor).toHaveBeenCalledTimes(1)
  })

  it('should return error if getOneByIdAuthor returns undefined', async () => {
    getOneByIdAuthor.mockResolvedValueOnce(undefined)

    const response = await sut.handle({ id })

    expect(response).toEqual({
      data: new NotFindError('Author'),
      statusCode: 400
    })
  })

  it('should return a new data if getOneByIdAuthor success', async () => {
    const response = await sut.handle({ id })

    expect(response).toEqual(authorData)
  })

  it('should return a Server Error if getOneByIdAuthor throws', async () => {
    getOneByIdAuthor.mockRejectedValueOnce(new Error('any_error'))

    const response = await sut.handle({ id })

    expect(response).toEqual(serverError(new Error('any_error')))
  })
})
