import { Book } from '@prisma/client'

export interface CreateBookRepository {
  create: (params: CreateBookRepository.Input) => Promise<CreateBookRepository.Output>
}

export namespace CreateBookRepository {
  export type Input = {
    name: string
    categoryId: number
    authorId: number
  }

  export type Output = Book | undefined
}

export interface UpdateBookRepository {
  update: (params: UpdateBookRepository.Input) => Promise<UpdateBookRepository.Output>
}

export namespace UpdateBookRepository {
  export type Input = {
    id: number
    name: string
    categoryId: number
    authorId: number
  }

  export type Output = Book | undefined
}

export interface GetAllBookRepository {
  getAll: () => Promise<GetAllBookRepository.Output>
}

export namespace GetAllBookRepository {
  export type Output = Book[] | undefined
}

export interface GetOneByIdBookRepository {
  getOneById: (params: GetOneByIdBookRepository.Input) => Promise<GetOneByIdBookRepository.Output>
}

export namespace GetOneByIdBookRepository {
  export type Input = {
    id: number
  }

  export type Output = Book | undefined
}

export interface DeleteBookRepository {
  delete: (params: DeleteBookRepository.Input) => Promise<DeleteBookRepository.Output>
}

export namespace DeleteBookRepository {
  export type Input = {
    id: number
  }

  export type Output = boolean
}
