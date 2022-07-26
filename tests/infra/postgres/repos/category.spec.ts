import { PrismaClient } from '@prisma/client'
import createPrismaMock from 'prisma-mock'
import {
  CreateCategoryRepository,
  UpdateCategoryRepository,
  GetAllCategoryRepository,
  GetOneByIdCategoryRepository,
  DeleteCategoryRepository
} from '@/domain/contracts/repos'

type CreateInput = CreateCategoryRepository.Input
type CreateOutput = CreateCategoryRepository.Output
type UpdateInput = UpdateCategoryRepository.Input
type UpdateOutput = UpdateCategoryRepository.Output
type GetAllOutput = GetAllCategoryRepository.Output
type GetOneInput = GetOneByIdCategoryRepository.Input
type GetOneOutput = GetOneByIdCategoryRepository.Output
type DeleteInput = DeleteCategoryRepository.Input
type DeleteOutput = DeleteCategoryRepository.Output

export class PgCategoryRepository implements CreateCategoryRepository, UpdateCategoryRepository, GetAllCategoryRepository, GetOneByIdCategoryRepository, DeleteCategoryRepository {
  constructor (private readonly client: PrismaClient) {}

  async create ({ name }: CreateInput): Promise<CreateOutput> {
    const pgCategory = await this.client.category.create({
      data: { name }
    })
    return pgCategory
  }

  async update ({ id, name }: UpdateInput): Promise<UpdateOutput> {
    await this.client.category.update({
      where: { id },
      data: { name }
    })

    const pgCategory = await this.client.category.findUnique({
      where: { id }
    })
    if (pgCategory !== null) { return pgCategory }
  }

  async getAll (): Promise<GetAllOutput> {
    const pgCategories = await this.client.category.findMany()
    if (pgCategories !== null) { return pgCategories }
  }

  async getOneById ({ id }: GetOneInput): Promise<GetOneOutput> {
    const pgCategory = await this.client.category.findUnique({
      where: { id }
    })
    if (pgCategory !== null) { return pgCategory }
  }

  async delete ({ id }: DeleteInput): Promise<DeleteOutput> {
    const pgCategory = await this.client.category.delete({
      where: { id }
    })
    if (pgCategory !== null) {
      return true
    }
    return false
  }
}

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
})
