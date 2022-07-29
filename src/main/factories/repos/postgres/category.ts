
import { PgCategoryRepository } from '@/infra/postgres/repos'
import { makePrismaClient } from '@/main/factories/repos/postgres'

export const makePgCategoryRepository = (): PgCategoryRepository => {
  return new PgCategoryRepository(makePrismaClient())
}
