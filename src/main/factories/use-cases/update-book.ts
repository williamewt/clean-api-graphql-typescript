import { UpdateBook, setupUpdateBook } from '@/domain/use-cases'
import { makePgBookRepository } from '@/main/factories/repos/postgres'

export const makeUpdateBook = (): UpdateBook => {
  return setupUpdateBook(
    makePgBookRepository()
  )
}
