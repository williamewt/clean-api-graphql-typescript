
import { GetOneByIdCategoryController } from '@/application/controllers'
import { makeGetOneByIdCategory } from '@/main/factories/use-cases'

export const makeGetOneByIdCategoryController = (): GetOneByIdCategoryController => {
  return new GetOneByIdCategoryController(makeGetOneByIdCategory())
}
