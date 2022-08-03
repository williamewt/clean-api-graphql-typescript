import { GetAllCategory } from '@/domain/use-cases'
import { Category } from '@prisma/client'
import { ok, serverError, HttpResponse } from '@/application/helpers'
import { Controller } from '@/application/controllers'

export class GetAllCategoryController implements Controller {
  constructor (private readonly getAllCategory: GetAllCategory) {}

  async handle (): Promise<HttpResponse<Category[] | Error>> {
    try {
      const category = await this.getAllCategory()
      return ok(category)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
