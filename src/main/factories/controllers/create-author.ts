
import { CreateAuthorController } from '@/application/controllers'
import { makeCreateAuthor } from '@/main/factories/use-cases'

export const makeCreateAuthorController = (): CreateAuthorController => {
  return new CreateAuthorController(makeCreateAuthor())
}
