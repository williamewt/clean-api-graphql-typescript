
import { DeleteBookController } from '@/application/controllers'
import { makeDeleteBook } from '@/main/factories/use-cases'

export const makeDeleteBookController = (): DeleteBookController => {
  return new DeleteBookController(makeDeleteBook())
}
