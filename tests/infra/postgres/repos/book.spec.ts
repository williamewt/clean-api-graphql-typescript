import { PrismaClient } from '@prisma/client'
import createPrismaMock from 'prisma-mock'
import { PgBookRepository } from '@/infra/postgres/repos'

describe('PgBookRepository', () => {
  let sut: PgBookRepository
  let client: PrismaClient

  beforeEach(async () => {
    client = await createPrismaMock()
    sut = new PgBookRepository(client)
  })

  describe('create', () => {
    it('should a create a new book and returns the book created', async () => {
      const category = await client.category.create({
        data: { name: 'any_category_name' }
      })
      const author = await client.author.create({
        data: { name: 'any_author_name' }
      })
      const book = await sut.create({ name: 'any_name', categoryId: category.id, authorId: author.id })

      expect(book).toHaveProperty('id', 1)
      expect(book).toHaveProperty('name', 'any_name')
      expect(book).toHaveProperty('categoryId', category.id)
      expect(book).toHaveProperty('authorId', author.id)
      expect(book).toHaveProperty('category.name', 'any_category_name')
      expect(book).toHaveProperty('author.name', 'any_author_name')
    })
  })

  describe('update', () => {
    it('should a update a book and returns the book updated', async () => {
      const category = await client.category.create({
        data: { name: 'any_category_name' }
      })
      const author = await client.author.create({
        data: { name: 'any_author_name' }
      })

      await client.book.create({
        data: { name: 'any_name', categoryId: category.id, authorId: author.id }
      })

      const book = await sut.update({ id: 1, name: 'any_other_name', categoryId: category.id, authorId: author.id })

      expect(book).toHaveProperty('id', 1)
      expect(book).toHaveProperty('name', 'any_other_name')
      expect(book).toHaveProperty('categoryId', category.id)
      expect(book).toHaveProperty('authorId', author.id)
      expect(book).toHaveProperty('category.name', 'any_category_name')
      expect(book).toHaveProperty('author.name', 'any_author_name')
    })

    it('should return undefined if called with invalid ID', async () => {
      const category = await client.category.create({
        data: { name: 'any_category_name' }
      })
      const author = await client.author.create({
        data: { name: 'any_author_name' }
      })

      await client.book.create({
        data: { name: 'any_name', categoryId: category.id, authorId: author.id }
      })

      const book = await sut.update({ id: 2, name: 'any_other_name', categoryId: category.id, authorId: author.id })

      expect(book).toBeUndefined()
    })
  })

  describe('getAll', () => {
    it('should returns a array of books', async () => {
      const category = await client.category.create({
        data: { name: 'any_category_name' }
      })
      const author = await client.author.create({
        data: { name: 'any_author_name' }
      })

      await client.book.create({
        data: { name: 'any_name', categoryId: category.id, authorId: author.id }
      })
      await client.book.create({
        data: { name: 'any_other_name', categoryId: category.id, authorId: author.id }
      })

      const books = await sut.getAll()

      expect(books).toBeDefined()
      expect(books).toHaveLength(2)
    })
  })

  describe('getOneById', () => {
    it('should returns a book by id', async () => {
      const category = await client.category.create({
        data: { name: 'any_category_name' }
      })
      const author = await client.author.create({
        data: { name: 'any_author_name' }
      })

      await client.book.create({
        data: { name: 'any_name', categoryId: category.id, authorId: author.id }
      })
      await client.book.create({
        data: { name: 'any_other_name', categoryId: category.id, authorId: author.id }
      })

      const book = await sut.getOneById({ id: 1 })

      expect(book).toHaveProperty('id', 1)
      expect(book).toHaveProperty('name', 'any_name')
      expect(book).toHaveProperty('categoryId', category.id)
      expect(book).toHaveProperty('authorId', author.id)
      expect(book).toHaveProperty('category.name', 'any_category_name')
      expect(book).toHaveProperty('author.name', 'any_author_name')
    })

    it('should returns undefined if book not exists', async () => {
      const book = await sut.getOneById({ id: 10 })

      expect(book).toBeUndefined()
    })
  })

  describe('delete', () => {
    it('should returns true if delete book', async () => {
      const category = await client.category.create({
        data: { name: 'any_category_name' }
      })
      const author = await client.author.create({
        data: { name: 'any_author_name' }
      })

      await client.book.create({
        data: { name: 'any_name', categoryId: category.id, authorId: author.id }
      })

      const book = await sut.delete({ id: 1 })

      expect(book).toBeDefined()
      expect(book).toHaveLength(1)
    })

    it('should returns true if not delete book', async () => {
      const book = await sut.delete({ id: 1 })

      expect(book).toBeUndefined()
    })
  })
})
