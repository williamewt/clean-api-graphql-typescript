
import { DeleteAuthorController } from '@/application/controllers'
import { makeDeleteAuthor } from '@/main/factories/use-cases'

export const makeDeleteAuthorController = (): DeleteAuthorController => {
  return new DeleteAuthorController(makeDeleteAuthor())
}
