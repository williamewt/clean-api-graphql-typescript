import { UpdateAuthor } from '@/domain/use-cases'
import { Author } from '@prisma/client'
import { ServerError } from '@/application/errors'

type Input = { id: number, name: string }
type Output = Error | Author

export class UpdateAuthorController {
  constructor (private readonly updateAuthor: UpdateAuthor) {}

  async handle (params: Input): Promise<Output> {
    const author = await this.updateAuthor(params)
    if (author !== undefined) {
      return author
    }

    return new ServerError()
  }
}
