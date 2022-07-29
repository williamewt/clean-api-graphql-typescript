
import { GetOneByIdBookController } from '@/application/controllers'
import { makeGetOneByIdBook } from '@/main/factories/use-cases'

export const makeGetOneByIdBookController = (): GetOneByIdBookController => {
  return new GetOneByIdBookController(makeGetOneByIdBook())
}
