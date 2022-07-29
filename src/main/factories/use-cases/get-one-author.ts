import { GetOneByIdAuthor, setupGetOneByIdAuthor } from '@/domain/use-cases'
import { makePgAuthorRepository } from '@/main/factories/repos/postgres'

export const makeGetOneByIdAuthor = (): GetOneByIdAuthor => {
  return setupGetOneByIdAuthor(
    makePgAuthorRepository()
  )
}
