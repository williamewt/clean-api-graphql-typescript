import { Book } from '@prisma/client'
import { DeleteBookController } from '@/application/controllers'
import { ServerError } from '@/application/errors'

describe('DeleteBookController', () => {
  let deleteBook: jest.Mock
  let sut: DeleteBookController
  let id: number
  let bookData: Book

  beforeAll(() => {
    deleteBook = jest.fn()
    bookData = {
      id: 1,
      name: 'any_name',
      categoryId: 1,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    deleteBook.mockResolvedValue(bookData)
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

  it('should return error if deleteBook returns undefined', async () => {
    deleteBook.mockResolvedValueOnce(undefined)

    const response = await sut.handle({ id })

    expect(response).toEqual(new ServerError())
  })

  it('should return a new data if deleteBook success', async () => {
    const response = await sut.handle({ id })

    expect(response).toEqual(bookData)
  })
})
