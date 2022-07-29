import { DeleteCategory, setupDeleteCategory } from '@/domain/use-cases'
import { makePgCategoryRepository } from '@/main/factories/repos/postgres'

export const makeDeleteCategory = (): DeleteCategory => {
  return setupDeleteCategory(
    makePgCategoryRepository()
  )
}
