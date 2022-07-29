import { GetAllAuthor } from '@/domain/use-cases'
import { Author } from '@prisma/client'
import { ServerError } from '@/application/errors'

type Output = Error | Author[]

export class GetAllAuthorController {
  constructor (private readonly getAllAuthor: GetAllAuthor) {}

  async handle (): Promise<Output> {
    const author = await this.getAllAuthor()
    if (author !== undefined) {
      return author
    }

    return new ServerError()
  }
}
