import { DeleteAuthor } from '@/domain/use-cases'
import { Author } from '@prisma/client'
import { ServerError } from '@/application/errors'

type Input = { id: number }
type Output = Error | Author

export class DeleteAuthorController {
  constructor (private readonly deleteAuthor: DeleteAuthor) {}

  async handle (params: Input): Promise<Output> {
    const category = await this.deleteAuthor(params)
    if (category !== undefined) {
      return category
    }

    return new ServerError()
  }
}
