
import { CreateCategoryController } from '@/application/controllers'
import { makeCreateCategory } from '@/main/factories/use-cases'

export const makeCreateCategoryController = (): CreateCategoryController => {
  return new CreateCategoryController(makeCreateCategory())
}
