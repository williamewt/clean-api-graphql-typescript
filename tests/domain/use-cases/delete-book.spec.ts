import { mock, MockProxy } from 'jest-mock-extended'
import { DeleteBookRepository } from '@/domain/contracts/repos'
import { DeleteBook, setupDeleteBook } from '@/domain/use-cases'
import { Book } from '@prisma/client'

describe('DeleteBook', () => {
  let sut: DeleteBook
  let deleteBookRepo: MockProxy<DeleteBookRepository>
  let deletedData: Book

  beforeAll(() => {
    deleteBookRepo = mock()
    deletedData = {
      id: 1,
      name: 'any_name',
      categoryId: 1,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    deleteBookRepo.delete.mockResolvedValue(deletedData)
  })

  beforeEach(() => {
    sut = setupDeleteBook(deleteBookRepo)
  })

  it('Should call deleteBook.delete with corrects params', async () => {
    await sut({ id: 1 })

    expect(deleteBookRepo.delete).toHaveBeenCalledWith({ id: 1 })
    expect(deleteBookRepo.delete).toHaveBeenCalledTimes(1)
  })

  it('Should return a book if was deleted', async () => {
    const deleteBook = await sut({ id: 1 })

    expect(deleteBook).toEqual(deletedData)
  })

  it('Should return undefined if book was not deleted', async () => {
    deleteBookRepo.delete.mockResolvedValueOnce(undefined)

    const deleteBook = await sut({ id: 1 })

    expect(deleteBook).toBeUndefined()
  })
})
