import { Author } from '@prisma/client'
import { CreateAuthorController } from '@/application/controllers'
import { ServerError } from '@/application/errors'

describe('CreateAuthorController', () => {
  let createAuthor: jest.Mock
  let sut: CreateAuthorController
  let name: string
  let authorData: Author

  beforeAll(() => {
    createAuthor = jest.fn()
    authorData = {
      id: 1,
      name: 'any_name',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    createAuthor.mockResolvedValue(authorData)
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

  it('should return error if createAuthor returns undefined', async () => {
    createAuthor.mockResolvedValueOnce(undefined)

    const response = await sut.handle({ name })

    expect(response).toEqual(new ServerError())
  })

  it('should return a new data if createAuthor success', async () => {
    const response = await sut.handle({ name })

    expect(response).toEqual(authorData)
  })
})
