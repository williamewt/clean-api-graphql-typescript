import { CreateAuthor, setupCreateAuthor } from '@/domain/use-cases'
import { makePgAuthorRepository } from '@/main/factories/repos/postgres'

export const makeCreateAuthor = (): CreateAuthor => {
  return setupCreateAuthor(
    makePgAuthorRepository()
  )
}
