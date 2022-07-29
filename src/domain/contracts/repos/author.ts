import { Author } from '@prisma/client'

export interface CreateAuthorRepository {
  create: (params: CreateAuthorRepository.Input) => Promise<CreateAuthorRepository.Output>
}

export namespace CreateAuthorRepository {
  export type Input = {
    name: string
  }

  export type Output = Author | undefined
}

export interface UpdateAuthorRepository {
  update: (params: UpdateAuthorRepository.Input) => Promise<UpdateAuthorRepository.Output>
}

export namespace UpdateAuthorRepository {
  export type Input = {
    id: number
    name: string
  }

  export type Output = Author | undefined
}

export interface GetAllAuthorRepository {
  getAll: () => Promise<GetAllAuthorRepository.Output>
}

export namespace GetAllAuthorRepository {
  export type Output = Author[] | undefined
}

export interface GetOneByIdAuthorRepository {
  getOneById: (params: GetOneByIdAuthorRepository.Input) => Promise<GetOneByIdAuthorRepository.Output>
}

export namespace GetOneByIdAuthorRepository {
  export type Input = {
    id: number
  }

  export type Output = Author | undefined
}

export interface DeleteAuthorRepository {
  delete: (params: DeleteAuthorRepository.Input) => Promise<DeleteAuthorRepository.Output>
}

export namespace DeleteAuthorRepository {
  export type Input = {
    id: number
  }

  export type Output = Author | undefined
}
