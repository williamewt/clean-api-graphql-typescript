
import { CreateBookController } from '@/application/controllers'
import { makeCreateBook } from '@/main/factories/use-cases'

export const makeCreateBookController = (): CreateBookController => {
  return new CreateBookController(makeCreateBook())
}
