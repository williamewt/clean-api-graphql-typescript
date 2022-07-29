
import { GetAllBookController } from '@/application/controllers'
import { makeGetAllBook } from '@/main/factories/use-cases'

export const makeGetAllBookController = (): GetAllBookController => {
  return new GetAllBookController(makeGetAllBook())
}
