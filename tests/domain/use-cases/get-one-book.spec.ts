import { Book } from '@prisma/client'
import { mock, MockProxy } from 'jest-mock-extended'
import { GetOneByIdBook, setupGetOneByIdBook } from '@/domain/use-cases'
import { GetOneByIdBookRepository } from '@/domain/contracts/repos'

describe('GetOneByIdBook', () => {
  let sut: GetOneByIdBook
  let getOneByBookRepo: MockProxy<GetOneByIdBookRepository>
  let bookData: Book

  beforeAll(() => {
    getOneByBookRepo = mock()
    bookData = {
      id: 1,
      name: 'any_name',
      categoryId: 1,
      authorId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    getOneByBookRepo.getOneById.mockResolvedValue(bookData)
  })

  beforeEach(() => {
    sut = setupGetOneByIdBook(getOneByBookRepo)
  })

  it('Should call getOneByBookRepo.getOneById with corrects params', async () => {
    await sut({ id: 1 })

    expect(getOneByBookRepo.getOneById).toHaveBeenCalledWith({ id: 1 })
    expect(getOneByBookRepo.getOneById).toHaveBeenCalledTimes(1)
  })

  it('Should return one category by Id', async () => {
    const author = await sut({ id: 1 })

    expect(author).toEqual(bookData)
  })

  it('Should return undefined if getOneByBookRepo.getOneById returns undefined', async () => {
    getOneByBookRepo.getOneById.mockResolvedValueOnce(undefined)

    const author = await sut({ id: 1 })

    expect(author).toBeUndefined()
  })
})
