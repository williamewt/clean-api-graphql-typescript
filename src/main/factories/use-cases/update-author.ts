import { UpdateAuthor, setupUpdateAuthor } from '@/domain/use-cases'
import { makePgAuthorRepository } from '@/main/factories/repos/postgres'

export const makeUpdateAuthor = (): UpdateAuthor => {
  return setupUpdateAuthor(
    makePgAuthorRepository()
  )
}
