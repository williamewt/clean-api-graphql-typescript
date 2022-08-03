import { DeleteAuthorRepository } from '@/domain/contracts/repos'
import { Author } from '@prisma/client'

type Setup = (deleteAuthorRepo: DeleteAuthorRepository) => DeleteAuthor

type Input = { id: number }
type Output = Author

export type DeleteAuthor = (params: Input) => Promise<Output>

export const setupDeleteAuthor: Setup = (deleteAuthorRepo) => async params => {
  const category = await deleteAuthorRepo.delete(params)
  return category
}
