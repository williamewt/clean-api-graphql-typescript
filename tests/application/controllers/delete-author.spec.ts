import { Author } from '@prisma/client'
import { DeleteAuthorController } from '@/application/controllers'
import { ServerError } from '@/application/errors'

describe('DeleteAuthorController', () => {
  let deleteAuthor: jest.Mock
  let sut: DeleteAuthorController
  let id: number
  let authorData: Author

  beforeAll(() => {
    deleteAuthor = jest.fn()
    authorData = {
      id: 1,
      name: 'any_name',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    deleteAuthor.mockResolvedValue(authorData)
    id = 1
  })

  beforeEach(() => {
    sut = new DeleteAuthorController(deleteAuthor)
  })

  it('should call DeleteAuthor with correct params', async () => {
    await sut.handle({ id })

    expect(deleteAuthor).toHaveBeenCalledWith({ id })
    expect(deleteAuthor).toHaveBeenCalledTimes(1)
  })

  it('should return error if deleteAuthor returns undefined', async () => {
    deleteAuthor.mockResolvedValueOnce(undefined)

    const response = await sut.handle({ id })

    expect(response).toEqual(new ServerError())
  })

  it('should return a new data if deleteAuthor success', async () => {
    const response = await sut.handle({ id })

    expect(response).toEqual(authorData)
  })
})
