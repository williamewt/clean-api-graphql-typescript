import { CreateBook, setupCreateBook } from '@/domain/use-cases'
import { makePgBookRepository } from '@/main/factories/repos/postgres'

export const makeCreateBook = (): CreateBook => {
  return setupCreateBook(
    makePgBookRepository()
  )
}
