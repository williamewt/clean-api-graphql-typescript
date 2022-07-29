
import { GetOneByIdAuthorController } from '@/application/controllers'
import { makeGetOneByIdAuthor } from '@/main/factories/use-cases'

export const makeGetOneByIdAuthorController = (): GetOneByIdAuthorController => {
  return new GetOneByIdAuthorController(makeGetOneByIdAuthor())
}
