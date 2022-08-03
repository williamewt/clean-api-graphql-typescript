import { Book } from '@prisma/client'
import { CreateBook } from '@/domain/use-cases'
import { ok, serverError, HttpResponse } from '@/application/helpers'
import { Controller } from '@/application/controllers'

type Input = { name: string, categoryId: number, authorId: number }

export class CreateBookController implements Controller {
  constructor (private readonly createBook: CreateBook) {}

  async handle (params: Input): Promise<HttpResponse<Book | Error>> {
    try {
      const book = await this.createBook(params)
      return ok(book)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
