import { GetAllBook } from '@/domain/use-cases'
import { Book } from '@prisma/client'
import { ok, serverError, HttpResponse } from '@/application/helpers'
import { Controller } from '@/application/controllers'

export class GetAllBookController implements Controller {
  constructor (private readonly getAllBook: GetAllBook) {}

  async handle (): Promise<HttpResponse<Book[] | Error>> {
    try {
      const book = await this.getAllBook()
      return ok(book)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
