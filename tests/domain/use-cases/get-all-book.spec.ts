import { Book } from '@prisma/client'
import { mock, MockProxy } from 'jest-mock-extended'
import { GetAllBook, setupGetAllBook } from '@/domain/use-cases'
import { GetAllBookRepository } from '../contracts/repos'

describe('GetAllBook', () => {
  let sut: GetAllBook
  let getAllBookRepo: MockProxy<GetAllBookRepository>
  let bookData: Book[]

  beforeAll(() => {
    getAllBookRepo = mock()
    bookData = [
      {
        id: 1,
        name: 'any_name',
        categoryId: 1,
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    getAllBookRepo.getAll.mockResolvedValue(bookData)
  })

  beforeEach(() => {
    sut = setupGetAllBook(getAllBookRepo)
  })

  it('Should return all authors', async () => {
    const authors = await sut()

    expect(authors).toEqual(bookData)
  })

  it('Should return undefined if getAllBookRepo.getAll returns undefined', async () => {
    getAllBookRepo.getAll.mockResolvedValueOnce(undefined)

    const authors = await sut()

    expect(authors).toBeUndefined()
  })
})
