import { CreateCategory } from '@/domain/use-cases'
import { Category } from '@prisma/client'
import { ServerError } from '@/application/errors'

type Input = { name: string }
type Output = Error | Category

export class CreateCategoryController {
  constructor (private readonly createCategory: CreateCategory) {}

  async handle (params: Input): Promise<Output> {
    const category = await this.createCategory(params)
    if (category !== undefined) {
      return category
    }

    return new ServerError()
  }
}
