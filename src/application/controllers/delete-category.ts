import { DeleteCategory } from '@/domain/use-cases'
import { Category } from '@prisma/client'
import { ok, serverError, HttpResponse } from '@/application/helpers'
import { Controller } from '@/application/controllers'

type Input = { id: number }

export class DeleteCategoryController implements Controller {
  constructor (private readonly deleteCategory: DeleteCategory) {}

  async handle (params: Input): Promise<HttpResponse<Category | Error>> {
    try {
      const category = await this.deleteCategory(params)
      return ok(category)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
