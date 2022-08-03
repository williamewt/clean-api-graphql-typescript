import { DeleteBook } from '@/domain/use-cases'
import { Book } from '@prisma/client'
import { ok, serverError, HttpResponse } from '@/application/helpers'
import { Controller } from '@/application/controllers'

type Input = { id: number }

export class DeleteBookController implements Controller {
  constructor (private readonly deleteBook: DeleteBook) {}

  async handle (params: Input): Promise<HttpResponse<Book | Error>> {
    try {
      const book = await this.deleteBook(params)
      return ok(book)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
