import { UpdateCategory } from '@/domain/use-cases'
import { Category } from '@prisma/client'
import { ok, serverError, HttpResponse, badRequest } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { NotUpdateError } from '@/application/errors'

type Input = { id: number, name: string }

export class UpdateCategoryController implements Controller {
  constructor (private readonly updateCategory: UpdateCategory) {}

  async handle (params: Input): Promise<HttpResponse<Category | Error>> {
    try {
      const category = await this.updateCategory(params)
      if (category !== undefined) {
        return ok(category)
      }
      return badRequest(new NotUpdateError('Category'))
    } catch (error: any) {
      return serverError(error)
    }
  }
}
