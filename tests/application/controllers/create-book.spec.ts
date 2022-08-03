import { Book } from '@prisma/client'
import { CreateBookController } from '@/application/controllers'
import { HttpResponse, serverError } from '@/application/helpers'

describe('CreateBookController', () => {
  let createBook: jest.Mock
  let sut: CreateBookController
  let name: string
  let categoryId: number
  let authorId: number
  let bookData: HttpResponse<Book>

  beforeAll(() => {
    createBook = jest.fn()
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
    createBook.mockResolvedValue(bookData.data)
    name = 'any_name'
    categoryId = 1
    authorId = 1
  })

  beforeEach(() => {
    sut = new CreateBookController(createBook)
  })

  it('should call createBook with correct params', async () => {
    await sut.handle({ name, categoryId, authorId })

    expect(createBook).toHaveBeenCalledWith({ name, categoryId, authorId })
    expect(createBook).toHaveBeenCalledTimes(1)
  })

  it('should return a new data if createBook success', async () => {
    const response = await sut.handle({ name, categoryId, authorId })

    expect(response).toEqual(bookData)
  })

  it('should return a Server Error if createBook throws', async () => {
    createBook.mockRejectedValueOnce(new Error('any_error'))

    const response = await sut.handle({ name, categoryId, authorId })

    expect(response).toEqual(serverError(new Error('any_error')))
  })
})
