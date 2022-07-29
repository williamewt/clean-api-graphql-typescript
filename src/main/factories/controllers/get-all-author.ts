
import { GetAllAuthorController } from '@/application/controllers'
import { makeGetAllAuthor } from '@/main/factories/use-cases'

export const makeGetAllAuthorController = (): GetAllAuthorController => {
  return new GetAllAuthorController(makeGetAllAuthor())
}
