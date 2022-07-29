import { DeleteBook } from '@/domain/use-cases'
import { Book } from '@prisma/client'
import { ServerError } from '@/application/errors'

type Input = { id: number }
type Output = Error | Book

export class DeleteBookController {
  constructor (private readonly deleteBook: DeleteBook) {}

  async handle (params: Input): Promise<Output> {
    const category = await this.deleteBook(params)
    if (category !== undefined) {
      return category
    }

    return new ServerError()
  }
}
