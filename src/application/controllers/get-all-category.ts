import { GetAllCategory } from '@/domain/use-cases'
import { Category } from '@prisma/client'
import { ServerError } from '@/application/errors'

type Output = Error | Category[]

export class GetAllCategoryController {
  constructor (private readonly getAllCategory: GetAllCategory) {}

  async handle (): Promise<Output> {
    const category = await this.getAllCategory()
    if (category !== undefined) {
      return category
    }

    return new ServerError()
  }
}
