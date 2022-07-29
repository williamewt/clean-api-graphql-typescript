import { GetOneByIdAuthor } from '@/domain/use-cases'
import { Author } from '@prisma/client'
import { ServerError } from '@/application/errors'

type Input = { id: number }
type Output = Error | Author

export class GetOneByIdAuthorController {
  constructor (private readonly getOneByIdAuthor: GetOneByIdAuthor) {}

  async handle (params: Input): Promise<Output> {
    const author = await this.getOneByIdAuthor(params)
    if (author !== undefined) {
      return author
    }

    return new ServerError()
  }
}
