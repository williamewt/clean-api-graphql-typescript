import { Book } from '@prisma/client'
import { GetOneByIdBookRepository } from '@/domain/contracts/repos'

type Setup = (getOneByBookRepo: GetOneByIdBookRepository) => GetOneByIdBook
type Input = { id: number}
type Output = Book | undefined

export type GetOneByIdBook = (params: Input) => Promise<Output>

export const setupGetOneByIdBook: Setup = (getOneByBookRepo) => async params => {
  const books = await getOneByBookRepo.getOneById(params)
  return books
}
