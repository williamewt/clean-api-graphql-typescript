import { GetOneByIdBook } from '@/domain/use-cases'
import { Book } from '@prisma/client'
import { ServerError } from '@/application/errors'

type Input = { id: number }
type Output = Error | Book

export class GetOneByIdBookController {
  constructor (private readonly getOneByIdBook: GetOneByIdBook) {}

  async handle (params: Input): Promise<Output> {
    const book = await this.getOneByIdBook(params)
    if (book !== undefined) {
      return book
    }

    return new ServerError()
  }
}
