import { LoadUserAccountByEmail, SaveUserAccount } from '@/domain/contracts/repos'
import { PrismaClient } from '@prisma/client'

type LoadInput = LoadUserAccountByEmail.Input
type LoadOutput = LoadUserAccountByEmail.Output
type SaveUserInput = SaveUserAccount.Input
type SaveUserOutput = SaveUserAccount.Output

export class PgUserAccountRepository implements LoadUserAccountByEmail, SaveUserAccount {
  constructor (private readonly client: PrismaClient) {}

  async loadByEmail ({ email }: LoadInput): Promise<LoadOutput> {
    const pgUser = await this.client.user.findUnique({
      where: {
        email: email
      },
      select: {
        id: true,
        name: true,
        password: true
      }
    })
    if (pgUser !== null) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined,
        password: pgUser.password ?? undefined
      }
    }
  }

  async save ({ name, email, password }: SaveUserInput): Promise<SaveUserOutput> {
    const pgUser = await this.client.user.create({
      data: { name, email, password }
    })
    return { id: pgUser.id.toString() }
  }
}
