import { UpdateCategory, setupUpdateCategory } from '@/domain/use-cases'
import { makePgCategoryRepository } from '@/main/factories/repos/postgres'

export const makeUpdateCategory = (): UpdateCategory => {
  return setupUpdateCategory(
    makePgCategoryRepository()
  )
}
