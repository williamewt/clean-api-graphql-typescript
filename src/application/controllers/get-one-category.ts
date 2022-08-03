import { GetOneByIdCategory } from '@/domain/use-cases'
import { Category } from '@prisma/client'
import { ok, serverError, HttpResponse, badRequest } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { NotFindError } from '@/application/errors'

type Input = { id: number }

export class GetOneByIdCategoryController implements Controller {
  constructor (private readonly getOneByIdCategory: GetOneByIdCategory) {}

  async handle (params: Input): Promise<HttpResponse<Category | Error>> {
    try {
      const category = await this.getOneByIdCategory(params)
      if (category !== undefined) {
        return ok(category)
      }
      return badRequest(new NotFindError('Category'))
    } catch (error: any) {
      return serverError(error)
    }
  }
}
