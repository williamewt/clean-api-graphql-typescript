import { Book } from '@prisma/client'
import { UpdateBookRepository } from '@/domain/contracts/repos'

type Setup = (updateBookRepo: UpdateBookRepository) => UpdateBook

type Input = {
  id: number
  name: string
  categoryId: number
  authorId: number
}

type Output = Book | undefined

export type UpdateBook = (params: Input) => Promise<Output>

export const setupUpdateBook: Setup = (updateBookRepo) => async params => {
  const book = await updateBookRepo.update(params)
  return book
}
