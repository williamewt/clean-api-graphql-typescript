import { Author } from '@prisma/client'
import { CreateAuthor } from '@/domain/use-cases'
import { ServerError } from '@/application/errors'

type Input = { name: string }
type Output = Error | Author

export class CreateAuthorController {
  constructor (private readonly createAuthor: CreateAuthor) {}

  async handle (params: Input): Promise<Output> {
    const author = await this.createAuthor(params)
    if (author !== undefined) {
      return author
    }

    return new ServerError()
  }
}
