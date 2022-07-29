import { GetOneByIdBook, setupGetOneByIdBook } from '@/domain/use-cases'
import { makePgBookRepository } from '@/main/factories/repos/postgres'

export const makeGetOneByIdBook = (): GetOneByIdBook => {
  return setupGetOneByIdBook(
    makePgBookRepository()
  )
}
