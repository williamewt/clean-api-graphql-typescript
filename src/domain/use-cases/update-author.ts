import { UpdateAuthorRepository } from '@/domain/contracts/repos'
import { Author } from '@prisma/client'

type Setup = (updateAuthorRepo: UpdateAuthorRepository) => UpdateAuthor

type Input = { id: number, name: string }
type Output = Author | undefined

export type UpdateAuthor = (params: Input) => Promise<Output>

export const setupUpdateAuthor: Setup = (updateAuthorRepo) => async params => {
  const author = await updateAuthorRepo.update(params)
  return author
}
