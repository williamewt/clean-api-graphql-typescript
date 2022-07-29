import { Book } from '@prisma/client'
import { CreateBookController } from '@/application/controllers'
import { ServerError } from '@/application/errors'

describe('CreateBookController', () => {
  let createBook: jest.Mock
  let sut: CreateBookController
  let name: string
  let categoryId: number
  let authorId: number
  let bookData: Book

  beforeAll(() => {
    createBook = jest.fn()
    bookData = {
      id: 1,
      name: 'any_name',
      categoryId: 1,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    createBook.mockResolvedValue(bookData)
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

  it('should return error if createBook returns undefined', async () => {
    createBook.mockResolvedValueOnce(undefined)

    const response = await sut.handle({ name, categoryId, authorId })

    expect(response).toEqual(new ServerError())
  })

  it('should return a new data if createBook success', async () => {
    const response = await sut.handle({ name, categoryId, authorId })

    expect(response).toEqual(bookData)
  })
})
