import { Author } from '@prisma/client'
import { mock, MockProxy } from 'jest-mock-extended'
import { GetOneByIdAuthor, setupGetOneByIdAuthor } from '@/domain/use-cases'
import { GetOneByIdAuthorRepository } from '@/domain/contracts/repos'

describe('GetOneByIdAuthor', () => {
  let sut: GetOneByIdAuthor
  let getOneByAuthorRepo: MockProxy<GetOneByIdAuthorRepository>
  let authorData: Author

  beforeAll(() => {
    getOneByAuthorRepo = mock()
    authorData = {
      id: 1,
      name: 'any_name',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    getOneByAuthorRepo.getOneById.mockResolvedValue(authorData)
  })

  beforeEach(() => {
    sut = setupGetOneByIdAuthor(getOneByAuthorRepo)
  })

  it('Should call getOneByAuthorRepo.getOneById with corrects params', async () => {
    await sut({ id: 1 })

    expect(getOneByAuthorRepo.getOneById).toHaveBeenCalledWith({ id: 1 })
    expect(getOneByAuthorRepo.getOneById).toHaveBeenCalledTimes(1)
  })

  it('Should return one category by Id', async () => {
    const author = await sut({ id: 1 })

    expect(author).toEqual(authorData)
  })

  it('Should return undefined if getOneByAuthorRepo.getOneById returns undefined', async () => {
    getOneByAuthorRepo.getOneById.mockResolvedValueOnce(undefined)

    const author = await sut({ id: 1 })

    expect(author).toBeUndefined()
  })
})
