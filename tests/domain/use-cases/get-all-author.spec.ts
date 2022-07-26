import { Author } from '@prisma/client'
import { mock, MockProxy } from 'jest-mock-extended'
import { GetAllAuthor, setupGetAllAuthor } from '@/domain/use-cases'
import { GetAllAuthorRepository } from '@/domain/contracts/repos'

describe('GetAllAuthor', () => {
  let sut: GetAllAuthor
  let getAllAuthorRepo: MockProxy<GetAllAuthorRepository>
  let authorData: Author[]

  beforeAll(() => {
    getAllAuthorRepo = mock()
    authorData = [
      {
        id: 1,
        name: 'any_name',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    getAllAuthorRepo.getAll.mockResolvedValue(authorData)
  })

  beforeEach(() => {
    sut = setupGetAllAuthor(getAllAuthorRepo)
  })

  it('Should return all authors', async () => {
    const authors = await sut()

    expect(authors).toEqual(authorData)
  })

  it('Should return undefined if getAllAuthorRepo.getAll returns undefined', async () => {
    getAllAuthorRepo.getAll.mockResolvedValueOnce(undefined)

    const authors = await sut()

    expect(authors).toBeUndefined()
  })
})
