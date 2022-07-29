import { DeleteBookRepository } from '@/domain/contracts/repos'
import { Book } from '@prisma/client'

type Setup = (deleteBookRepo: DeleteBookRepository) => DeleteBook

type Input = { id: number }
type Output = Book | undefined

export type DeleteBook = (params: Input) => Promise<Output>

export const setupDeleteBook: Setup = (deleteBookRepo) => async params => {
  const book = await deleteBookRepo.delete(params)
  return book
}
