import { CreateAuthorRepository } from '@/domain/contracts/repos'
import { Author } from '@prisma/client'

type Setup = (createAuthorRepo: CreateAuthorRepository) => CreateAuthor

type Input = { name: string }
type Output = Author | undefined

export type CreateAuthor = (params: Input) => Promise<Output>

export const setupCreateAuthor: Setup = (createAuthorRepo) => async params => {
  const category = await createAuthorRepo.create(params)
  return category
}
