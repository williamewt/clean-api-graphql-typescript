import { Category } from '@prisma/client'
import { mock, MockProxy } from 'jest-mock-extended'
import { CreateCategory, setupCreateCategory } from '@/domain/use-cases'
import { CreateCategoryRepository } from '@/domain/contracts/repos'

describe('CreateCategory', () => {
  let sut: CreateCategory
  let createCategoryRepo: MockProxy<CreateCategoryRepository>
  let categoryData: Category
  let newCategoryData: { name: string }

  beforeAll(() => {
    createCategoryRepo = mock()
    categoryData = {
      id: 1,
      name: 'any_name',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    createCategoryRepo.create.mockResolvedValue(categoryData)
    newCategoryData = { name: 'any_name' }
  })

  beforeEach(() => {
    sut = setupCreateCategory(createCategoryRepo)
  })

  it('Should call createCategory.create with corrects params', async () => {
    await sut(newCategoryData)

    expect(createCategoryRepo.create).toHaveBeenCalledWith(newCategoryData)
    expect(createCategoryRepo.create).toHaveBeenCalledTimes(1)
  })

  it('Should return new category create', async () => {
    const newCategory = await sut(newCategoryData)

    expect(newCategory).toEqual(categoryData)
  })
})
