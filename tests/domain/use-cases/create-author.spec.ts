import { Author } from '@prisma/client'
import { mock, MockProxy } from 'jest-mock-extended'
import { CreateAuthor, setupCreateAuthor } from '@/domain/use-cases'
import { CreateAuthorRepository } from '@/domain/contracts/repos'

describe('CreateAuthor', () => {
  let sut: CreateAuthor
  let createAuthorRepo: MockProxy<CreateAuthorRepository>
  let authorData: Author
  let newAuthorData: { name: string }

  beforeAll(() => {
    createAuthorRepo = mock()
    authorData = {
      id: 1,
      name: 'any_name',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    createAuthorRepo.create.mockResolvedValue(authorData)
    newAuthorData = { name: 'any_name' }
  })

  beforeEach(() => {
    sut = setupCreateAuthor(createAuthorRepo)
  })

  it('Should call createAuthor.create with corrects params', async () => {
    await sut(newAuthorData)

    expect(createAuthorRepo.create).toHaveBeenCalledWith(newAuthorData)
    expect(createAuthorRepo.create).toHaveBeenCalledTimes(1)
  })

  it('Should return new category create', async () => {
    const newAuthor = await sut(newAuthorData)

    expect(newAuthor).toEqual(authorData)
  })
})
