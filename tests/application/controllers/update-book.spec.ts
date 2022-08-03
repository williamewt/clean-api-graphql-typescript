import { Book } from '@prisma/client'
import { UpdateBookController } from '@/application/controllers'
import { HttpResponse, serverError } from '@/application/helpers'
import { NotUpdateError } from '@/application/errors'

describe('UpdateBookController', () => {
  let updateBook: jest.Mock
  let sut: UpdateBookController
  let id: number
  let name: string
  let categoryId: number
  let authorId: number
  let bookData: HttpResponse<Book>

  beforeAll(() => {
    updateBook = jest.fn()
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
    updateBook.mockResolvedValue(bookData.data)
    id = 1
    categoryId = 1
    authorId = 1
  })

  beforeEach(() => {
    sut = new UpdateBookController(updateBook)
  })

  it('should call UpdateBook with correct params', async () => {
    await sut.handle({ id, name, categoryId, authorId })

    expect(updateBook).toHaveBeenCalledWith({ id, name, categoryId, authorId })
    expect(updateBook).toHaveBeenCalledTimes(1)
  })

  it('should return error if updateBook returns undefined', async () => {
    updateBook.mockResolvedValueOnce(undefined)

    const response = await sut.handle({ id, name, categoryId, authorId })

    expect(response).toEqual({
      data: new NotUpdateError('Book'),
      statusCode: 400
    })
  })

  it('should return a new data if updateBook success', async () => {
    const response = await sut.handle({ id, name, categoryId, authorId })

    expect(response).toEqual(bookData)
  })

  it('should return a Server Error if updateBook throws', async () => {
    updateBook.mockRejectedValueOnce(new Error('any_error'))

    const response = await sut.handle({ id, name, categoryId, authorId })

    expect(response).toEqual(serverError(new Error('any_error')))
  })
})
