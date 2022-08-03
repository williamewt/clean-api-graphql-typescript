import { Book } from '@prisma/client'
import { GetOneByIdBookController } from '@/application/controllers'
import { HttpResponse, serverError } from '@/application/helpers'
import { NotFindError } from '@/application/errors'

describe('GetOneByIdBookController', () => {
  let getOneByIdBook: jest.Mock
  let sut: GetOneByIdBookController
  let id: number
  let bookData: HttpResponse<Book>

  beforeAll(() => {
    getOneByIdBook = jest.fn()
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
    getOneByIdBook.mockResolvedValue(bookData.data)
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

    expect(response).toEqual({
      data: new NotFindError('Book'),
      statusCode: 400
    })
  })

  it('should return a new data if getOneByIdBook success', async () => {
    const response = await sut.handle({ id })

    expect(response).toEqual(bookData)
  })

  it('should return a Server Error if getOneByIdBook throws', async () => {
    getOneByIdBook.mockRejectedValueOnce(new Error('any_error'))

    const response = await sut.handle({ id })

    expect(response).toEqual(serverError(new Error('any_error')))
  })
})
