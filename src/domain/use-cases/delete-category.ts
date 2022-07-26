import { DeleteCategoryRepository } from '@/domain/contracts/repos'

type Setup = (deleteCategoryRepo: DeleteCategoryRepository) => DeleteCategory

type Input = { id: number }
type Output = boolean

export type DeleteCategory = (params: Input) => Promise<Output>

export const setupDeleteCategory: Setup = (deleteCategoryRepo) => async params => {
  const category = await deleteCategoryRepo.delete(params)
  return category
}
