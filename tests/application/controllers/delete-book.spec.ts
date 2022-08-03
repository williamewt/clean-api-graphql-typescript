import { Book } from '@prisma/client'
import { DeleteBookController } from '@/application/controllers'
import { HttpResponse, serverError } from '@/application/helpers'

describe('DeleteBookController', () => {
  let deleteBook: jest.Mock
  let sut: DeleteBookController
  let id: number
  let bookData: HttpResponse<Book>

  beforeAll(() => {
    deleteBook = jest.fn()
    bookData = {
      data: {
        id: 1,
        name: 'any_name',
        categoryId: 1,
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      statusCode: 200
    }
    deleteBook.mockResolvedValue(bookData.data)
    id = 1
  })

  beforeEach(() => {
    sut = new DeleteBookController(deleteBook)
  })

  it('should call DeleteBook with correct params', async () => {
    await sut.handle({ id })

    expect(deleteBook).toHaveBeenCalledWith({ id })
    expect(deleteBook).toHaveBeenCalledTimes(1)
  })

  it('should return a new data if deleteBook success', async () => {
    const response = await sut.handle({ id })

    expect(response).toEqual(bookData)
  })

  it('should return a Server Error if deleteBook throws', async () => {
    deleteBook.mockRejectedValueOnce(new Error('any_error'))

    const response = await sut.handle({ id })

    expect(response).toEqual(serverError(new Error('any_error')))
  })
})
