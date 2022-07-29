import { PrismaClient } from '@prisma/client'
import createPrismaMock from 'prisma-mock'
import { PgAuthorRepository } from '@/infra/postgres/repos'

describe('PgAuthorRepository', () => {
  let sut: PgAuthorRepository
  let client: PrismaClient

  beforeEach(async () => {
    client = await createPrismaMock()
    sut = new PgAuthorRepository(client)
  })

  describe('create', () => {
    it('should a create a new author and returns the author created', async () => {
      const author = await sut.create({ name: 'any_name' })

      expect(author).toHaveProperty('id', 1)
      expect(author).toHaveProperty('name', 'any_name')
    })
  })

  describe('update', () => {
    it('should a update a author and returns the author updated', async () => {
      await client.author.create({
        data: { name: 'any_name' }
      })

      const author = await sut.update({ id: 1, name: 'any_other_name' })

      expect(author).toHaveProperty('id', 1)
      expect(author).toHaveProperty('name', 'any_other_name')
    })

    it('should return undefined if called with invalid ID', async () => {
      await client.author.create({
        data: { name: 'any_name' }
      })

      const author = await sut.update({ id: 2, name: 'any_other_name' })

      expect(author).toBeUndefined()
    })
  })

  describe('getAll', () => {
    it('should returns a array of authors', async () => {
      await client.author.create({
        data: { name: 'any_name' }
      })
      await client.author.create({
        data: { name: 'any_other_name' }
      })

      const authors = await sut.getAll()

      expect(authors).toBeDefined()
      expect(authors).toHaveLength(2)
    })
  })

  describe('getOneById', () => {
    it('should returns a author by id', async () => {
      await client.author.create({
        data: { name: 'any_name' }
      })
      await client.author.create({
        data: { name: 'any_other_name' }
      })

      const author = await sut.getOneById({ id: 1 })

      expect(author).toHaveProperty('id', 1)
      expect(author).toHaveProperty('name', 'any_name')
    })

    it('should returns undefined if author not exists', async () => {
      await client.author.create({
        data: { name: 'any_name' }
      })
      await client.author.create({
        data: { name: 'any_other_name' }
      })

      const author = await sut.getOneById({ id: 10 })

      expect(author).toBeUndefined()
    })
  })

  describe('delete', () => {
    it('should returns true if delete author', async () => {
      await client.author.create({
        data: { name: 'any_name' }
      })

      const author = await sut.delete({ id: 1 })

      expect(author).toBeDefined()
      expect(author).toHaveLength(1)
    })

    it('should returns true if not delete author', async () => {
      const author = await sut.delete({ id: 2 })

      expect(author).toBeUndefined()
    })
  })
})
