import { CreateCategory, setupCreateCategory } from '@/domain/use-cases'
import { makePgCategoryRepository } from '@/main/factories/repos/postgres'

export const makeCreateCategory = (): CreateCategory => {
  return setupCreateCategory(
    makePgCategoryRepository()
  )
}
