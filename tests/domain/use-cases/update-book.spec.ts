import { Book } from '@prisma/client'
import { mock, MockProxy } from 'jest-mock-extended'
import { setupUpdateBook, UpdateBook } from '@/domain/use-cases'
import { UpdateBookRepository } from '@/domain/contracts/repos'

describe('UpdateBook', () => {
  let sut: UpdateBook
  let updateBookRepo: MockProxy<UpdateBookRepository>
  let bookData: Book
  let newBookData: {
    id: number
    name: string
    categoryId: number
    authorId: number
  }

  beforeAll(() => {
    updateBookRepo = mock()
    bookData = {
      id: 1,
      name: 'any_name',
      categoryId: 1,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    updateBookRepo.update.mockResolvedValue(bookData)
    newBookData = {
      id: 1,
      name: 'any_name',
      categoryId: 1,
      authorId: 1
    }
  })

  beforeEach(() => {
    sut = setupUpdateBook(updateBookRepo)
  })

  it('Should call updateBook.update with corrects params', async () => {
    await sut(newBookData)

    expect(updateBookRepo.update).toHaveBeenCalledWith(newBookData)
    expect(updateBookRepo.update).toHaveBeenCalledTimes(1)
  })

  it('Should return new category update', async () => {
    const newBook = await sut(newBookData)

    expect(newBook).toEqual(bookData)
  })

  it('Should return undefined if updateBookRepo.getOneById returns undefined', async () => {
    updateBookRepo.update.mockResolvedValueOnce(undefined)

    const book = await sut(newBookData)

    expect(book).toBeUndefined()
  })
})
