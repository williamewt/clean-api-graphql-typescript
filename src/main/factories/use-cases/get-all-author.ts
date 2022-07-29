import { GetAllAuthor, setupGetAllAuthor } from '@/domain/use-cases'
import { makePgAuthorRepository } from '@/main/factories/repos/postgres'

export const makeGetAllAuthor = (): GetAllAuthor => {
  return setupGetAllAuthor(
    makePgAuthorRepository()
  )
}
