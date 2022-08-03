import { mock, MockProxy } from 'jest-mock-extended'
import { DeleteAuthorRepository } from '@/domain/contracts/repos'
import { DeleteAuthor, setupDeleteAuthor } from '@/domain/use-cases'
import { Author } from '@prisma/client'

describe('DeleteAuthor', () => {
  let sut: DeleteAuthor
  let deleteAuthorRepo: MockProxy<DeleteAuthorRepository>
  let deletedData: Author

  beforeAll(() => {
    deleteAuthorRepo = mock()
    deletedData = {
      id: 1,
      name: 'any_name',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    deleteAuthorRepo.delete.mockResolvedValue(deletedData)
  })

  beforeEach(() => {
    sut = setupDeleteAuthor(deleteAuthorRepo)
  })

  it('Should call deleteAuthor.delete with corrects params', async () => {
    await sut({ id: 1 })

    expect(deleteAuthorRepo.delete).toHaveBeenCalledWith({ id: 1 })
    expect(deleteAuthorRepo.delete).toHaveBeenCalledTimes(1)
  })

  it('Should return a author if was deleted', async () => {
    const deleteAuthor = await sut({ id: 1 })

    expect(deleteAuthor).toEqual(deletedData)
  })
})
