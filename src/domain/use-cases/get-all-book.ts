import { Book } from '@prisma/client'
import { GetAllBookRepository } from '@/domain/contracts/repos'

type Setup = (getAllBookRepo: GetAllBookRepository) => GetAllBook

type Output = Book[]

export type GetAllBook = () => Promise<Output>

export const setupGetAllBook: Setup = (getAllBookRepo) => async () => {
  const book = await getAllBookRepo.getAll()
  return book
}
