import { mock, MockProxy } from 'jest-mock-extended'
import { DeleteBook, setupDeleteBook } from '@/domain/use-cases'
import { DeleteBookRepository } from '@/domain/contracts/repos'

describe('DeleteBook', () => {
  let sut: DeleteBook
  let deleteBookRepo: MockProxy<DeleteBookRepository>

  beforeAll(() => {
    deleteBookRepo = mock()
    deleteBookRepo.delete.mockResolvedValue(true)
  })

  beforeEach(() => {
    sut = setupDeleteBook(deleteBookRepo)
  })

  it('Should call deleteBook.delete with corrects params', async () => {
    await sut({ id: 1 })

    expect(deleteBookRepo.delete).toHaveBeenCalledWith({ id: 1 })
    expect(deleteBookRepo.delete).toHaveBeenCalledTimes(1)
  })

  it('Should return true if category was deleted', async () => {
    const deleteBook = await sut({ id: 1 })

    expect(deleteBook).toBeTruthy()
  })

  it('Should return false if category was not deleted', async () => {
    deleteBookRepo.delete.mockResolvedValueOnce(false)

    const deleteBook = await sut({ id: 1 })

    expect(deleteBook).toBeFalsy()
  })
})
