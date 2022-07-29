import { UpdateCategory } from '@/domain/use-cases'
import { Category } from '@prisma/client'
import { ServerError } from '@/application/errors'

type Input = { id: number, name: string }
type Output = Error | Category

export class UpdateCategoryController {
  constructor (private readonly updateCategory: UpdateCategory) {}

  async handle (params: Input): Promise<Output> {
    const category = await this.updateCategory(params)
    if (category !== undefined) {
      return category
    }

    return new ServerError()
  }
}
