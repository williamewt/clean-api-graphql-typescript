import { DeleteAuthor } from '@/domain/use-cases'
import { Author } from '@prisma/client'
import { ok, serverError, HttpResponse } from '@/application/helpers'
import { Controller } from '@/application/controllers'

type Input = { id: number }

export class DeleteAuthorController implements Controller {
  constructor (private readonly deleteAuthor: DeleteAuthor) {}

  async handle (params: Input): Promise<HttpResponse<Author | Error>> {
    try {
      const author = await this.deleteAuthor(params)
      return ok(author)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
