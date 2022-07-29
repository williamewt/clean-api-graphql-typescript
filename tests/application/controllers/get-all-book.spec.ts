import { Book } from '@prisma/client'
import { GetAllBookController } from '@/application/controllers'
import { ServerError } from '@/application/errors'

describe('GetAllBookController', () => {
  let getAllBook: jest.Mock
  let sut: GetAllBookController
  let authorData: Book[]

  beforeAll(() => {
    getAllBook = jest.fn()
    authorData = [
      {
        id: 1,
        name: 'any_name',
        categoryId: 1,
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    getAllBook.mockResolvedValue(authorData)
  })

  beforeEach(() => {
    sut = new GetAllBookController(getAllBook)
  })

  it('should return error if getAllBook returns undefined', async () => {
    getAllBook.mockResolvedValueOnce(undefined)

    const response = await sut.handle()

    expect(response).toEqual(new ServerError())
  })

  it('should return a new data if getAllBook success', async () => {
    const response = await sut.handle()

    expect(response).toEqual(authorData)
  })
})
