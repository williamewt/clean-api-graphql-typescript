import { Author } from '@prisma/client'
import { GetAllAuthorController } from '@/application/controllers'
import { ServerError } from '@/application/errors'

describe('GetAllAuthorController', () => {
  let getAllAuthor: jest.Mock
  let sut: GetAllAuthorController
  let authorData: Author[]

  beforeAll(() => {
    getAllAuthor = jest.fn()
    authorData = [
      {
        id: 1,
        name: 'any_name',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    getAllAuthor.mockResolvedValue(authorData)
  })

  beforeEach(() => {
    sut = new GetAllAuthorController(getAllAuthor)
  })

  it('should return error if getAllAuthor returns undefined', async () => {
    getAllAuthor.mockResolvedValueOnce(undefined)

    const response = await sut.handle()

    expect(response).toEqual(new ServerError())
  })

  it('should return a new data if getAllAuthor success', async () => {
    const response = await sut.handle()

    expect(response).toEqual(authorData)
  })
})
