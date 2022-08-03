import { UpdateAuthor } from '@/domain/use-cases'
import { Author } from '@prisma/client'
import { ok, serverError, HttpResponse, badRequest } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { NotUpdateError } from '@/application/errors'

type Input = { id: number, name: string }

export class UpdateAuthorController implements Controller {
  constructor (private readonly updateAuthor: UpdateAuthor) {}

  async handle (params: Input): Promise<HttpResponse<Author | Error>> {
    try {
      const author = await this.updateAuthor(params)
      if (author !== undefined) {
        return ok(author)
      }
      return badRequest(new NotUpdateError('Author'))
    } catch (error: any) {
      return serverError(error)
    }
  }
}
