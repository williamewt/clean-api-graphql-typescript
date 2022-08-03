import { Book } from '@prisma/client'
import { CreateBookRepository } from '@/domain/contracts/repos'

type Setup = (createBookRepo: CreateBookRepository) => CreateBook

type Input = {
  name: string
  categoryId: number
  authorId: number
}

type Output = Book

export type CreateBook = (params: Input) => Promise<Output>

export const setupCreateBook: Setup = (createBookRepo) => async params => {
  const book = await createBookRepo.create(params)
  return book
}
