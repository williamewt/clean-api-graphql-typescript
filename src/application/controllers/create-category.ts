import { Controller } from '@/application/controllers'
import { CreateCategory } from '@/domain/use-cases'
import { Category } from '@prisma/client'
import { ok, serverError, HttpResponse } from '@/application/helpers'

type Input = { name: string }

export class CreateCategoryController implements Controller {
  constructor (private readonly createCategory: CreateCategory) {}

  async handle (params: Input): Promise<HttpResponse<Category | Error>> {
    try {
      const category = await this.createCategory(params)
      return ok(category)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
