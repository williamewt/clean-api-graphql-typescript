import { GetAllCategory, setupGetAllCategory } from '@/domain/use-cases'
import { makePgCategoryRepository } from '@/main/factories/repos/postgres'

export const makeGetAllCategory = (): GetAllCategory => {
  return setupGetAllCategory(
    makePgCategoryRepository()
  )
}
