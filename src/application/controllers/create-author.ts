import { Author } from '@prisma/client'
import { CreateAuthor } from '@/domain/use-cases'
import { ok, serverError, HttpResponse } from '@/application/helpers'
import { Controller } from '@/application/controllers'

type Input = { name: string }

export class CreateAuthorController implements Controller {
  constructor (private readonly createAuthor: CreateAuthor) { }

  async handle (params: Input): Promise<HttpResponse<Author | Error>> {
    try {
      const author = await this.createAuthor(params)
      return ok(author)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
