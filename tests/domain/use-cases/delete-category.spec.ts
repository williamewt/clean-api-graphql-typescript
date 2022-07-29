import { mock, MockProxy } from 'jest-mock-extended'
import { DeleteCategoryRepository } from '@/domain/contracts/repos'
import { DeleteCategory, setupDeleteCategory } from '@/domain/use-cases'
import { Category } from '@prisma/client'

describe('DeleteCategory', () => {
  let sut: DeleteCategory
  let deleteCategoryRepo: MockProxy<DeleteCategoryRepository>
  let deletedData: Category

  beforeAll(() => {
    deleteCategoryRepo = mock()
    deletedData = {
      id: 1,
      name: 'any_name',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    deleteCategoryRepo.delete.mockResolvedValue(deletedData)
  })

  beforeEach(() => {
    sut = setupDeleteCategory(deleteCategoryRepo)
  })

  it('Should call deleteCategory.delete with corrects params', async () => {
    await sut({ id: 1 })

    expect(deleteCategoryRepo.delete).toHaveBeenCalledWith({ id: 1 })
    expect(deleteCategoryRepo.delete).toHaveBeenCalledTimes(1)
  })

  it('Should return a category if was deleted', async () => {
    const deleteCategory = await sut({ id: 1 })

    expect(deleteCategory).toEqual(deletedData)
  })

  it('Should return undefined if category was not deleted', async () => {
    deleteCategoryRepo.delete.mockResolvedValueOnce(undefined)

    const deleteCategory = await sut({ id: 1 })

    expect(deleteCategory).toBeUndefined()
  })
})
