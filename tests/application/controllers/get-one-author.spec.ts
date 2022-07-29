import { Author } from '@prisma/client'
import { GetOneByIdAuthorController } from '@/application/controllers'
import { ServerError } from '@/application/errors'

describe('GetOneByIdAuthorController', () => {
  let getOneByIdAuthor: jest.Mock
  let sut: GetOneByIdAuthorController
  let id: number
  let authorData: Author

  beforeAll(() => {
    getOneByIdAuthor = jest.fn()
    authorData = {
      id: 1,
      name: 'any_name',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    getOneByIdAuthor.mockResolvedValue(authorData)
    id = 1
  })

  beforeEach(() => {
    sut = new GetOneByIdAuthorController(getOneByIdAuthor)
  })

  it('should call GetOneByIdAuthor with correct params', async () => {
    await sut.handle({ id })

    expect(getOneByIdAuthor).toHaveBeenCalledWith({ id })
    expect(getOneByIdAuthor).toHaveBeenCalledTimes(1)
  })

  it('should return error if getOneByIdAuthor returns undefined', async () => {
    getOneByIdAuthor.mockResolvedValueOnce(undefined)

    const response = await sut.handle({ id })

    expect(response).toEqual(new ServerError())
  })

  it('should return a new data if getOneByIdAuthor success', async () => {
    const response = await sut.handle({ id })

    expect(response).toEqual(authorData)
  })
})
