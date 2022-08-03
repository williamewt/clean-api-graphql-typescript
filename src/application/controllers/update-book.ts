import { UpdateBook } from '@/domain/use-cases'
import { Book } from '@prisma/client'
import { ok, serverError, HttpResponse, badRequest } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { NotUpdateError } from '@/application/errors'

type Input = { id: number, name: string, categoryId: number, authorId: number }

export class UpdateBookController implements Controller {
  constructor (private readonly updateBook: UpdateBook) {}

  async handle (params: Input): Promise<HttpResponse<Book | Error>> {
    try {
      const book = await this.updateBook(params)
      if (book !== undefined) {
        return ok(book)
      }
      return badRequest(new NotUpdateError('Book'))
    } catch (error: any) {
      return serverError(error)
    }
  }
}
