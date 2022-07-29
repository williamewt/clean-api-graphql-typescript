
import { UpdateCategoryController } from '@/application/controllers'
import { makeUpdateCategory } from '@/main/factories/use-cases'

export const makeUpdateCategoryController = (): UpdateCategoryController => {
  return new UpdateCategoryController(makeUpdateCategory())
}
