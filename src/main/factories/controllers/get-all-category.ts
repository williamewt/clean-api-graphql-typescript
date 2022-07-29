
import { GetAllCategoryController } from '@/application/controllers'
import { makeGetAllCategory } from '@/main/factories/use-cases'

export const makeGetAllCategoryController = (): GetAllCategoryController => {
  return new GetAllCategoryController(makeGetAllCategory())
}
