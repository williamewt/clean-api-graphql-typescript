import { Author } from '@prisma/client'
import { mock, MockProxy } from 'jest-mock-extended'
import { setupUpdateAuthor, UpdateAuthor } from '@/domain/use-cases'
import { UpdateAuthorRepository } from '@/domain/contracts/repos'

describe('UpdateAuthor', () => {
  let sut: UpdateAuthor
  let updateAuthorRepo: MockProxy<UpdateAuthorRepository>
  let authorData: Author
  let newAuthorData: { id: number, name: string }

  beforeAll(() => {
    updateAuthorRepo = mock()
    authorData = {
      id: 1,
      name: 'any_name',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    updateAuthorRepo.update.mockResolvedValue(authorData)
    newAuthorData = { id: 1, name: 'any_name' }
  })

  beforeEach(() => {
    sut = setupUpdateAuthor(updateAuthorRepo)
  })

  it('Should call updateAuthor.update with corrects params', async () => {
    await sut(newAuthorData)

    expect(updateAuthorRepo.update).toHaveBeenCalledWith(newAuthorData)
    expect(updateAuthorRepo.update).toHaveBeenCalledTimes(1)
  })

  it('Should return new category create', async () => {
    const newAuthor = await sut(newAuthorData)

    expect(newAuthor).toEqual(authorData)
  })

  it('Should return undefined if updateAuthorRepo.getOneById returns undefined', async () => {
    updateAuthorRepo.update.mockResolvedValueOnce(undefined)

    const author = await sut(newAuthorData)

    expect(author).toBeUndefined()
  })
})
