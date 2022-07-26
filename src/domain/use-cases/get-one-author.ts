import { GetOneByIdAuthorRepository } from '@/domain/contracts/repos'
import { Author } from '@prisma/client'

type Setup = (getOneByAuthorRepo: GetOneByIdAuthorRepository) => GetOneByIdAuthor
type Input = { id: number}
type Output = Author | undefined

export type GetOneByIdAuthor = (params: Input) => Promise<Output>

export const setupGetOneByIdAuthor: Setup = (getOneByAuthorRepo) => async params => {
  const categories = await getOneByAuthorRepo.getOneById(params)
  return categories
}
