import { UpdateCategoryRepository } from '@/domain/contracts/repos'
import { Category } from '@prisma/client'

type Setup = (updateCategoryRepo: UpdateCategoryRepository) => UpdateCategory

type Input = { id: number, name: string }
type Output = Category | undefined

export type UpdateCategory = (params: Input) => Promise<Output>

export const setupUpdateCategory: Setup = (updateCategoryRepo) => async params => {
  const category = await updateCategoryRepo.update(params)
  return category
}
