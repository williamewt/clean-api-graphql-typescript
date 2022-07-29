import { DeleteBook, setupDeleteBook } from '@/domain/use-cases'
import { makePgBookRepository } from '@/main/factories/repos/postgres'

export const makeDeleteBook = (): DeleteBook => {
  return setupDeleteBook(
    makePgBookRepository()
  )
}
