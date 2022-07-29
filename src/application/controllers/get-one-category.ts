import { GetOneByIdCategory } from '@/domain/use-cases'
import { Category } from '@prisma/client'
import { ServerError } from '@/application/errors'

type Input = { id: number }
type Output = Error | Category

export class GetOneByIdCategoryController {
  constructor (private readonly getOneByIdCategory: GetOneByIdCategory) {}

  async handle (params: Input): Promise<Output> {
    const category = await this.getOneByIdCategory(params)
    if (category !== undefined) {
      return category
    }

    return new ServerError()
  }
}
