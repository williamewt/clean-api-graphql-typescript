import { Book } from '@prisma/client'
import { GetOneByIdBookController } from '@/application/controllers'
import { ServerError } from '@/application/errors'

describe('GetOneByIdBookController', () => {
  let getOneByIdBook: jest.Mock
  let sut: GetOneByIdBookController
  let id: number
  let bookData: Book

  beforeAll(() => {
    getOneByIdBook = jest.fn()
    bookData = {
      id: 1,
      name: 'any_name',
      categoryId: 1,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    getOneByIdBook.mockResolvedValue(bookData)
    id = 1
  })

  beforeEach(() => {
    sut = new GetOneByIdBookController(getOneByIdBook)
  })

  it('should call GetOneByIdBook with correct params', async () => {
    await sut.handle({ id })

    expect(getOneByIdBook).toHaveBeenCalledWith({ id })
    expect(getOneByIdBook).toHaveBeenCalledTimes(1)
  })

  it('should return error if getOneByIdBook returns undefined', async () => {
    getOneByIdBook.mockResolvedValueOnce(undefined)

    const response = await sut.handle({ id })

    expect(response).toEqual(new ServerError())
  })

  it('should return a new data if getOneByIdBook success', async () => {
    const response = await sut.handle({ id })

    expect(response).toEqual(bookData)
  })
})
