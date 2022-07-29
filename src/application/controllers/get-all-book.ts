import { GetAllBook } from '@/domain/use-cases'
import { Book } from '@prisma/client'
import { ServerError } from '@/application/errors'

type Output = Error | Book[]

export class GetAllBookController {
  constructor (private readonly getAllBook: GetAllBook) {}

  async handle (): Promise<Output> {
    const category = await this.getAllBook()
    if (category !== undefined) {
      return category
    }

    return new ServerError()
  }
}
