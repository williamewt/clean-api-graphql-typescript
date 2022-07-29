import { Author } from '@prisma/client'
import { UpdateAuthorController } from '@/application/controllers'
import { ServerError } from '@/application/errors'

describe('UpdateAuthorController', () => {
  let updateAuthor: jest.Mock
  let sut: UpdateAuthorController
  let id: number
  let name: string
  let authorData: Author

  beforeAll(() => {
    updateAuthor = jest.fn()
    authorData = {
      id: 1,
      name: 'any_name',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    updateAuthor.mockResolvedValue(authorData)
    id = 1
    name = 'any_name'
  })

  beforeEach(() => {
    sut = new UpdateAuthorController(updateAuthor)
  })

  it('should call UpdateAuthor with correct params', async () => {
    await sut.handle({ id, name })

    expect(updateAuthor).toHaveBeenCalledWith({ id, name })
    expect(updateAuthor).toHaveBeenCalledTimes(1)
  })

  it('should return error if updateAuthor returns undefined', async () => {
    updateAuthor.mockResolvedValueOnce(undefined)

    const response = await sut.handle({ id, name })

    expect(response).toEqual(new ServerError())
  })

  it('should return a new data if updateAuthor success', async () => {
    const response = await sut.handle({ id, name })

    expect(response).toEqual(authorData)
  })
})
