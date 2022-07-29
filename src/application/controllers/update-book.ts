import { UpdateBook } from '@/domain/use-cases'
import { Book } from '@prisma/client'
import { ServerError } from '@/application/errors'

type Input = { id: number, name: string, categoryId: number, authorId: number }
type Output = Error | Book

export class UpdateBookController {
  constructor (private readonly updateBook: UpdateBook) {}

  async handle (params: Input): Promise<Output> {
    const author = await this.updateBook(params)
    if (author !== undefined) {
      return author
    }

    return new ServerError()
  }
}
