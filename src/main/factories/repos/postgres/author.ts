
import { PgAuthorRepository } from '@/infra/postgres/repos'
import { makePrismaClient } from '@/main/factories/repos/postgres'

export const makePgAuthorRepository = (): PgAuthorRepository => {
  return new PgAuthorRepository(makePrismaClient())
}
