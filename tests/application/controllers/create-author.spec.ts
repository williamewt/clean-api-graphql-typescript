import { Author } from '@prisma/client'
import { CreateAuthorController } from '@/application/controllers'
import { HttpResponse, serverError } from '@/application/helpers'

describe('CreateAuthorController', () => {
  let createAuthor: jest.Mock
  let sut: CreateAuthorController
  let name: string
  let authorData: HttpResponse<Author>

  beforeAll(() => {
    createAuthor = jest.fn()
    authorData = {
      data: {
        id: 1,
        name: 'any_name',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      statusCode: 200
    }
    createAuthor.mockResolvedValue(authorData.data)
    name = 'any_name'
  })

  beforeEach(() => {
    sut = new CreateAuthorController(createAuthor)
  })

  it('should call createAuthor with correct params', async () => {
    await sut.handle({ name })

    expect(createAuthor).toHaveBeenCalledWith({ name })
    expect(createAuthor).toHaveBeenCalledTimes(1)
  })

  it('should return a new data if createAuthor success', async () => {
    const response = await sut.handle({ name })

    expect(response).toEqual(authorData)
  })

  it('should return a Server Error if createAuthor throws', async () => {
    createAuthor.mockRejectedValueOnce(new Error('any_error'))

    const response = await sut.handle({ name })

    expect(response).toEqual(serverError(new Error('any_error')))
  })
})
