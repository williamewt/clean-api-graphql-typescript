import { CreateCategoryRepository } from '@/domain/contracts/repos'
import { Category } from '@prisma/client'

type Setup = (createCategoryRepo: CreateCategoryRepository) => CreateCategory

type Input = { name: string }
type Output = Category

export type CreateCategory = (params: Input) => Promise<Output>

export const setupCreateCategory: Setup = (createCategoryRepo) => async params => {
  const category = await createCategoryRepo.create(params)
  return category
}
