export type User = {
  id: bigint
  name?: string | null
  email: string
  password?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
}
