import { mock, MockProxy } from 'jest-mock-extended'
import { DeleteAuthorRepository } from '@/domain/contracts/repos'
import { DeleteAuthor, setupDeleteAuthor } from '@/domain/use-cases'

describe('DeleteAuthor', () => {
  let sut: DeleteAuthor
  let deleteAuthorRepo: MockProxy<DeleteAuthorRepository>

  beforeAll(() => {
    deleteAuthorRepo = mock()
    deleteAuthorRepo.delete.mockResolvedValue(true)
  })

  beforeEach(() => {
    sut = setupDeleteAuthor(deleteAuthorRepo)
  })

  it('Should call deleteAuthor.delete with corrects params', async () => {
    await sut({ id: 1 })

    expect(deleteAuthorRepo.delete).toHaveBeenCalledWith({ id: 1 })
    expect(deleteAuthorRepo.delete).toHaveBeenCalledTimes(1)
  })

  it('Should return true if category was deleted', async () => {
    const deleteAuthor = await sut({ id: 1 })

    expect(deleteAuthor).toBeTruthy()
  })

  it('Should return false if category was not deleted', async () => {
    deleteAuthorRepo.delete.mockResolvedValueOnce(false)

    const deleteAuthor = await sut({ id: 1 })

    expect(deleteAuthor).toBeFalsy()
  })
})
