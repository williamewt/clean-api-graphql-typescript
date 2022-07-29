import { Book } from '@prisma/client'
import { mock, MockProxy } from 'jest-mock-extended'
import { CreateBook, setupCreateBook } from '@/domain/use-cases'
import { CreateBookRepository } from '@/domain/contracts/repos'

describe('CreateBook', () => {
  let sut: CreateBook
  let createBookRepo: MockProxy<CreateBookRepository>
  let bookData: Book
  let newBookData: {
    name: string
    categoryId: number
    authorId: number
  }

  beforeAll(() => {
    createBookRepo = mock()
    bookData = {
      id: 1,
      name: 'any_name',
      categoryId: 1,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    createBookRepo.create.mockResolvedValue(bookData)
    newBookData = {
      name: 'any_name',
      categoryId: 1,
      authorId: 1
    }
  })

  beforeEach(() => {
    sut = setupCreateBook(createBookRepo)
  })

  it('Should call createBook.create with corrects params', async () => {
    await sut(newBookData)

    expect(createBookRepo.create).toHaveBeenCalledWith(newBookData)
    expect(createBookRepo.create).toHaveBeenCalledTimes(1)
  })

  it('Should return new category create', async () => {
    const newBook = await sut(newBookData)

    expect(newBook).toEqual(bookData)
  })

  it('Should return undefined if createBookRepo.create returns undefined', async () => {
    createBookRepo.create.mockResolvedValueOnce(undefined)

    const newBook = await sut(newBookData)

    expect(newBook).toBeUndefined()
  })
})
