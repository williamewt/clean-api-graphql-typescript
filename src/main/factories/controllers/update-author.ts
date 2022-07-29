
import { UpdateAuthorController } from '@/application/controllers'
import { makeUpdateAuthor } from '@/main/factories/use-cases'

export const makeUpdateAuthorController = (): UpdateAuthorController => {
  return new UpdateAuthorController(makeUpdateAuthor())
}
