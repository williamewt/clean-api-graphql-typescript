import { PrismaClient } from '@prisma/client'
import {
  CreateBookRepository,
  UpdateBookRepository,
  GetAllBookRepository,
  GetOneByIdBookRepository,
  DeleteBookRepository
} from '@/domain/contracts/repos'

type CreateInput = CreateBookRepository.Input
type CreateOutput = CreateBookRepository.Output
type UpdateInput = UpdateBookRepository.Input
type UpdateOutput = UpdateBookRepository.Output
type GetAllOutput = GetAllBookRepository.Output
type GetOneInput = GetOneByIdBookRepository.Input
type GetOneOutput = GetOneByIdBookRepository.Output
type DeleteInput = DeleteBookRepository.Input
type DeleteOutput = DeleteBookRepository.Output

export class PgBookRepository implements CreateBookRepository, UpdateBookRepository, GetAllBookRepository, GetOneByIdBookRepository, DeleteBookRepository {
  constructor (private readonly client: PrismaClient) {}

  async create ({ name, categoryId, authorId }: CreateInput): Promise<CreateOutput> {
    const pgBook = await this.client.book.create({
      data: { name, categoryId, authorId },
      include: {
        category: true,
        author: true
      }
    })
    return pgBook
  }

  async update ({ id, name, categoryId, authorId }: UpdateInput): Promise<UpdateOutput> {
    await this.client.book.update({
      where: { id },
      data: { name, categoryId, authorId }
    })

    const pgBook = await this.client.book.findUnique({
      where: { id },
      include: {
        category: true,
        author: true
      }
    })
    if (pgBook !== null) { return pgBook }
  }

  async getAll (): Promise<GetAllOutput> {
    const pgBooks = await this.client.book.findMany({
      include: {
        category: true,
        author: true
      }
    })
    return pgBooks
  }

  async getOneById ({ id }: GetOneInput): Promise<GetOneOutput> {
    const pgBook = await this.client.book.findUnique({
      where: { id },
      include: {
        category: true,
        author: true
      }
    })
    if (pgBook !== null) { return pgBook }
  }

  async delete ({ id }: DeleteInput): Promise<DeleteOutput> {
    const pgBook = await this.client.book.delete({
      where: { id },
      include: {
        category: true,
        author: true
      }
    })
    if (Object.keys(pgBook).length > 0) {
      return pgBook
    }
  }
}
