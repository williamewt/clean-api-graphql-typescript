import { PrismaClient } from '@prisma/client'
import createPrismaMock from 'prisma-mock'
import { PgCategoryRepository } from '@/infra/postgres/repos'

describe('PgCategoryRepository', () => {
  let sut: PgCategoryRepository
  let client: PrismaClient

  beforeEach(async () => {
    client = await createPrismaMock()
    sut = new PgCategoryRepository(client)
  })

  describe('create', () => {
    it('should a create a new category and returns the category created', async () => {
      const category = await sut.create({ name: 'any_name' })

      expect(category).toHaveProperty('id', 1)
      expect(category).toHaveProperty('name', 'any_name')
    })
  })

  describe('update', () => {
    it('should a update a category and returns the category updated', async () => {
      await client.category.create({
        data: { name: 'any_name' }
      })

      const category = await sut.update({ id: 1, name: 'any_other_name' })

      expect(category).toHaveProperty('id', 1)
      expect(category).toHaveProperty('name', 'any_other_name')
    })

    it('should return undefined if called with invalid ID', async () => {
      await client.category.create({
        data: { name: 'any_name' }
      })

      const category = await sut.update({ id: 2, name: 'any_other_name' })

      expect(category).toBeUndefined()
    })
  })

  describe('getAll', () => {
    it('should returns a array of categories', async () => {
      await client.category.create({
        data: { name: 'any_name' }
      })
      await client.category.create({
        data: { name: 'any_other_name' }
      })

      const categories = await sut.getAll()

      expect(categories).toBeDefined()
      expect(categories).toHaveLength(2)
    })
  })

  describe('getOneById', () => {
    it('should returns a category by id', async () => {
      await client.category.create({
        data: { name: 'any_name' }
      })
      await client.category.create({
        data: { name: 'any_other_name' }
      })

      const category = await sut.getOneById({ id: 1 })

      expect(category).toHaveProperty('id', 1)
      expect(category).toHaveProperty('name', 'any_name')
    })

    it('should returns undefined if category not exists', async () => {
      await client.category.create({
        data: { name: 'any_name' }
      })
      await client.category.create({
        data: { name: 'any_other_name' }
      })

      const category = await sut.getOneById({ id: 10 })

      expect(category).toBeUndefined()
    })
  })

  describe('delete', () => {
    it('should returns true if delete category', async () => {
      await client.category.create({
        data: { name: 'any_name' }
      })

      const category = await sut.delete({ id: 1 })

      expect(category).toBeDefined()
      expect(category).toHaveLength(1)
    })

    it('should returns true if not delete category', async () => {
      const category = await sut.delete({ id: 2 })

      expect(category).toBeUndefined()
    })
  })
})
