import { Category } from '@prisma/client'

export interface CreateCategoryRepository {
  create: (params: CreateCategoryRepository.Input) => Promise<CreateCategoryRepository.Output>
}

export namespace CreateCategoryRepository {
  export type Input = {
    name: string
  }

  export type Output = Category | undefined
}

export interface UpdateCategoryRepository {
  update: (params: UpdateCategoryRepository.Input) => Promise<UpdateCategoryRepository.Output>
}

export namespace UpdateCategoryRepository {
  export type Input = {
    id: number
    name: string
  }

  export type Output = Category | undefined
}

export interface GetAllCategoryRepository {
  getAll: () => Promise<GetAllCategoryRepository.Output>
}

export namespace GetAllCategoryRepository {
  export type Output = Category[] | undefined
}

export interface GetOneByIdCategoryRepository {
  getOneById: (params: GetOneByIdCategoryRepository.Input) => Promise<GetOneByIdCategoryRepository.Output>
}

export namespace GetOneByIdCategoryRepository {
  export type Input = {
    id: number
  }

  export type Output = Category | undefined
}

export interface DeleteCategoryRepository {
  delete: (params: DeleteCategoryRepository.Input) => Promise<DeleteCategoryRepository.Output>
}

export namespace DeleteCategoryRepository {
  export type Input = {
    id: number
  }

  export type Output = boolean
}
