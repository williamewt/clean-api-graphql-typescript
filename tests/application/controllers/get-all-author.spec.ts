import { Author } from '@prisma/client'
import { GetAllAuthorController } from '@/application/controllers'
import { HttpResponse, serverError } from '@/application/helpers'

describe('GetAllAuthorController', () => {
  let getAllAuthor: jest.Mock
  let sut: GetAllAuthorController
  let authorData: HttpResponse<Author[]>

  beforeAll(() => {
    getAllAuthor = jest.fn()
    authorData = {
      data: [
        {
          id: 1,
          name: 'any_name',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      statusCode: 200
    }
    getAllAuthor.mockResolvedValue(authorData.data)
  })

  beforeEach(() => {
    sut = new GetAllAuthorController(getAllAuthor)
  })

  it('should return a new data if getAllAuthor success', async () => {
    const response = await sut.handle()

    expect(response).toEqual(authorData)
  })

  it('should return a Server Error if getAllAuthor throws', async () => {
    getAllAuthor.mockRejectedValueOnce(new Error('any_error'))

    const response = await sut.handle()

    expect(response).toEqual(serverError(new Error('any_error')))
  })
})
