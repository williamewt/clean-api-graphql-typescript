import { GetOneByIdCategory, setupGetOneByIdCategory } from '@/domain/use-cases'
import { makePgCategoryRepository } from '@/main/factories/repos/postgres'

export const makeGetOneByIdCategory = (): GetOneByIdCategory => {
  return setupGetOneByIdCategory(
    makePgCategoryRepository()
  )
}
