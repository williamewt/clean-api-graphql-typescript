import { DeleteAuthorRepository } from '@/domain/contracts/repos'

type Setup = (deleteAuthorRepo: DeleteAuthorRepository) => DeleteAuthor

type Input = { id: number }
type Output = boolean

export type DeleteAuthor = (params: Input) => Promise<Output>

export const setupDeleteAuthor: Setup = (deleteAuthorRepo) => async params => {
  const category = await deleteAuthorRepo.delete(params)
  return category
}
