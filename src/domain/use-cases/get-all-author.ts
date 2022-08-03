import { GetAllAuthorRepository } from '@/domain/contracts/repos'
import { Author } from '@prisma/client'

type Setup = (getAllAuthorRepo: GetAllAuthorRepository) => GetAllAuthor
type Output = Author[]

export type GetAllAuthor = () => Promise<Output>

export const setupGetAllAuthor: Setup = (getAllAuthorRepo) => async () => {
  const categories = await getAllAuthorRepo.getAll()
  return categories
}
