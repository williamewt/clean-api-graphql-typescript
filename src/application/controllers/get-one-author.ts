import { GetOneByIdAuthor } from '@/domain/use-cases'
import { Author } from '@prisma/client'
import { ok, serverError, HttpResponse, badRequest } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { NotFindError } from '../errors'

type Input = { id: number }

export class GetOneByIdAuthorController implements Controller {
  constructor (private readonly getOneByIdAuthor: GetOneByIdAuthor) {}

  async handle (params: Input): Promise<HttpResponse<Author | Error>> {
    try {
      const author = await this.getOneByIdAuthor(params)
      if (author !== undefined) {
        return ok(author)
      }
      return badRequest(new NotFindError('Author'))
    } catch (error: any) {
      return serverError(error)
    }
  }
}
