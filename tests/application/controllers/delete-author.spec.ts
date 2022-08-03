import { Author } from '@prisma/client'
import { DeleteAuthorController } from '@/application/controllers'
import { HttpResponse, serverError } from '@/application/helpers'

describe('DeleteAuthorController', () => {
  let deleteAuthor: jest.Mock
  let sut: DeleteAuthorController
  let id: number
  let authorData: HttpResponse<Author>

  beforeAll(() => {
    deleteAuthor = jest.fn()
    authorData = {
      data: {
        id: 1,
        name: 'any_name',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      statusCode: 200
    }
    deleteAuthor.mockResolvedValue(authorData.data)
    id = 1
  })

  beforeEach(() => {
    sut = new DeleteAuthorController(deleteAuthor)
  })

  it('should call DeleteAuthor with correct params', async () => {
    await sut.handle({ id })

    expect(deleteAuthor).toHaveBeenCalledWith({ id })
    expect(deleteAuthor).toHaveBeenCalledTimes(1)
  })

  it('should return a new data if deleteAuthor success', async () => {
    const response = await sut.handle({ id })

    expect(response).toEqual(authorData)
  })

  it('should return a Server Error if deleteAuthor throws', async () => {
    deleteAuthor.mockRejectedValueOnce(new Error('any_error'))

    const response = await sut.handle({ id })

    expect(response).toEqual(serverError(new Error('any_error')))
  })
})
