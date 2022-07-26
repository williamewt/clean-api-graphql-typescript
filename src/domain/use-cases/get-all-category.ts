import { GetAllCategoryRepository } from '@/domain/contracts/repos'
import { Category } from '@prisma/client'

type Setup = (getAllCategoryRepo: GetAllCategoryRepository) => GetAllCategory
type Output = Category[] | undefined

export type GetAllCategory = () => Promise<Output>

export const setupGetAllCategory: Setup = (getAllCategoryRepo) => async () => {
  const categories = await getAllCategoryRepo.getAll()
  return categories
}
