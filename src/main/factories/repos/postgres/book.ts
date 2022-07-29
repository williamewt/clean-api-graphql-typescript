
import { PgBookRepository } from '@/infra/postgres/repos'
import { makePrismaClient } from '@/main/factories/repos/postgres'

export const makePgBookRepository = (): PgBookRepository => {
  return new PgBookRepository(makePrismaClient())
}
