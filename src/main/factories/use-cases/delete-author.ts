import { DeleteAuthor, setupDeleteAuthor } from '@/domain/use-cases'
import { makePgAuthorRepository } from '@/main/factories/repos/postgres'

export const makeDeleteAuthor = (): DeleteAuthor => {
  return setupDeleteAuthor(
    makePgAuthorRepository()
  )
}
