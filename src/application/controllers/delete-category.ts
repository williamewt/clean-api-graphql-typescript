import { DeleteCategory } from '@/domain/use-cases'
import { Category } from '@prisma/client'
import { ServerError } from '@/application/errors'

type Input = { id: number }
type Output = Error | Category

export class DeleteCategoryController {
  constructor (private readonly deleteCategory: DeleteCategory) {}

  async handle (params: Input): Promise<Output> {
    const category = await this.deleteCategory(params)
    if (category !== undefined) {
      return category
    }

    return new ServerError()
  }
}
