
import { UpdateBookController } from '@/application/controllers'
import { makeUpdateBook } from '@/main/factories/use-cases'

export const makeUpdateBookController = (): UpdateBookController => {
  return new UpdateBookController(makeUpdateBook())
}
