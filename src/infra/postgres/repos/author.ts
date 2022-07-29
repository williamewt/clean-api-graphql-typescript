import {
  CreateAuthorRepository,
  UpdateAuthorRepository,
  GetAllAuthorRepository,
  GetOneByIdAuthorRepository,
  DeleteAuthorRepository
} from '@/domain/contracts/repos'
import { PrismaClient } from '@prisma/client'

type CreateInput = CreateAuthorRepository.Input
type CreateOutput = CreateAuthorRepository.Output
type UpdateInput = UpdateAuthorRepository.Input
type UpdateOutput = UpdateAuthorRepository.Output
type GetAllOutput = GetAllAuthorRepository.Output
type GetOneInput = GetOneByIdAuthorRepository.Input
type GetOneOutput = GetOneByIdAuthorRepository.Output
type DeleteInput = DeleteAuthorRepository.Input
type DeleteOutput = DeleteAuthorRepository.Output

export class PgAuthorRepository implements CreateAuthorRepository, UpdateAuthorRepository, GetAllAuthorRepository, GetOneByIdAuthorRepository, DeleteAuthorRepository {
  constructor (private readonly client: PrismaClient) {}

  async create ({ name }: CreateInput): Promise<CreateOutput> {
    const pgAuthor = await this.client.author.create({
      data: { name }
    })
    return pgAuthor
  }

  async update ({ id, name }: UpdateInput): Promise<UpdateOutput> {
    await this.client.author.update({
      where: { id },
      data: { name }
    })

    const pgAuthor = await this.client.author.findUnique({
      where: { id }
    })
    if (pgAuthor !== null) { return pgAuthor }
  }

  async getAll (): Promise<GetAllOutput> {
    const pgCategories = await this.client.author.findMany()
    return pgCategories
  }

  async getOneById ({ id }: GetOneInput): Promise<GetOneOutput> {
    const pgAuthor = await this.client.author.findUnique({
      where: { id }
    })
    if (pgAuthor !== null) { return pgAuthor }
  }

  async delete ({ id }: DeleteInput): Promise<DeleteOutput> {
    const pgAuthor = await this.client.author.delete({
      where: { id }
    })
    if (Object.keys(pgAuthor).length > 0) {
      return pgAuthor
    }
  }
}
