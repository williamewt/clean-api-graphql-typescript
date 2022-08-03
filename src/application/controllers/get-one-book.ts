import { GetOneByIdBook } from '@/domain/use-cases'
import { Book } from '@prisma/client'
import { ok, serverError, HttpResponse, badRequest } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { NotFindError } from '@/application/errors'

type Input = { id: number }

export class GetOneByIdBookController implements Controller {
  constructor (private readonly getOneByIdBook: GetOneByIdBook) {}

  async handle (params: Input): Promise<HttpResponse<Book | Error>> {
    try {
      const book = await this.getOneByIdBook(params)
      if (book !== undefined) {
        return ok(book)
      }
      return badRequest(new NotFindError('Book'))
    } catch (error: any) {
      return serverError(error)
    }
  }
}
