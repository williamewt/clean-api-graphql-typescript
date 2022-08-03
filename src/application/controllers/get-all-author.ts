import { GetAllAuthor } from '@/domain/use-cases'
import { Author } from '@prisma/client'
import { ok, serverError, HttpResponse } from '@/application/helpers'
import { Controller } from '@/application/controllers'

export class GetAllAuthorController implements Controller {
  constructor (private readonly getAllAuthor: GetAllAuthor) {}

  async handle (): Promise<HttpResponse<Author[] | Error>> {
    try {
      const author = await this.getAllAuthor()
      return ok(author)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
