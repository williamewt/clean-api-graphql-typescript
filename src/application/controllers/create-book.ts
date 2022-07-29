import { Book } from '@prisma/client'
import { CreateBook } from '@/domain/use-cases'
import { ServerError } from '@/application/errors'

type Input = { name: string, categoryId: number, authorId: number }
type Output = Error | Book

export class CreateBookController {
  constructor (private readonly createBook: CreateBook) {}

  async handle (params: Input): Promise<Output> {
    const book = await this.createBook(params)
    if (book !== undefined) {
      return book
    }

    return new ServerError()
  }
}
