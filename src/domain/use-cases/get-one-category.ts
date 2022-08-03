import { GetOneByIdCategoryRepository } from '@/domain/contracts/repos'
import { Category } from '@prisma/client'

type Setup = (getOneByCategoryRepo: GetOneByIdCategoryRepository) => GetOneByIdCategory
type Input = { id: number}
type Output = Category | undefined

export type GetOneByIdCategory = (params: Input) => Promise<Output>

export const setupGetOneByIdCategory: Setup = (getOneByCategoryRepo) => async params => {
  const category = await getOneByCategoryRepo.getOneById(params)
  return category
}
