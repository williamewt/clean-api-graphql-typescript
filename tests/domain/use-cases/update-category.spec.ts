import { Category } from '@prisma/client'
import { mock, MockProxy } from 'jest-mock-extended'
import { setupUpdateCategory, UpdateCategory } from '@/domain/use-cases'
import { UpdateCategoryRepository } from '@/domain/contracts/repos'

describe('UpdateCategory', () => {
  let sut: UpdateCategory
  let updateCategoryRepo: MockProxy<UpdateCategoryRepository>
  let categoryData: Category
  let newCategoryData: { id: number, name: string }

  beforeAll(() => {
    updateCategoryRepo = mock()
    categoryData = {
      id: 1,
      name: 'any_name',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    updateCategoryRepo.update.mockResolvedValue(categoryData)
    newCategoryData = { id: 1, name: 'any_name' }
  })

  beforeEach(() => {
    sut = setupUpdateCategory(updateCategoryRepo)
  })

  it('Should call updateCategory.update with corrects params', async () => {
    await sut(newCategoryData)

    expect(updateCategoryRepo.update).toHaveBeenCalledWith(newCategoryData)
    expect(updateCategoryRepo.update).toHaveBeenCalledTimes(1)
  })

  it('Should return new category create', async () => {
    const newCategory = await sut(newCategoryData)

    expect(newCategory).toEqual(categoryData)
  })

  it('Should return undefined if updateCategoryRepo.getOneById returns undefined', async () => {
    updateCategoryRepo.update.mockResolvedValueOnce(undefined)

    const book = await sut(newCategoryData)

    expect(book).toBeUndefined()
  })
})
