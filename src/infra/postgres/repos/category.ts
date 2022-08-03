import { PrismaClient } from '@prisma/client'
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
    return pgCategories
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
    return pgCategory
  }
}
