import { Book } from '@prisma/client'
import { GetAllBookController } from '@/application/controllers'
import { HttpResponse, serverError } from '@/application/helpers'

describe('GetAllBookController', () => {
  let getAllBook: jest.Mock
  let sut: GetAllBookController
  let bookData: HttpResponse<Book[]>

  beforeAll(() => {
    getAllBook = jest.fn()
    bookData = {
      data:
        [
          {
            id: 1,
            name: 'any_name',
            categoryId: 1,
            authorId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
      statusCode: 200
    }
    getAllBook.mockResolvedValue(bookData.data)
  })

  beforeEach(() => {
    sut = new GetAllBookController(getAllBook)
  })

  it('should return a new data if getAllBook success', async () => {
    const response = await sut.handle()

    expect(response).toEqual(bookData)
  })

  it('should return a Server Error if getAllBook throws', async () => {
    getAllBook.mockRejectedValueOnce(new Error('any_error'))

    const response = await sut.handle()

    expect(response).toEqual(serverError(new Error('any_error')))
  })
})
