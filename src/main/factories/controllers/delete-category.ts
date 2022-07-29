
import { DeleteCategoryController } from '@/application/controllers'
import { makeDeleteCategory } from '@/main/factories/use-cases'

export const makeDeleteCategoryController = (): DeleteCategoryController => {
  return new DeleteCategoryController(makeDeleteCategory())
}
