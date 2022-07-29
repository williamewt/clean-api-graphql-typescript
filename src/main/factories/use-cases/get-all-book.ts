import { GetAllBook, setupGetAllBook } from '@/domain/use-cases'
import { makePgBookRepository } from '@/main/factories/repos/postgres'

export const makeGetAllBook = (): GetAllBook => {
  return setupGetAllBook(
    makePgBookRepository()
  )
}
