import { mock, MockProxy } from 'jest-mock-extended'
import { DeleteCategoryRepository } from '@/domain/contracts/repos'
import { DeleteCategory, setupDeleteCategory } from '@/domain/use-cases'

describe('DeleteCategory', () => {
  let sut: DeleteCategory
  let deleteCategoryRepo: MockProxy<DeleteCategoryRepository>

  beforeAll(() => {
    deleteCategoryRepo = mock()
    deleteCategoryRepo.delete.mockResolvedValue(true)
  })

  beforeEach(() => {
    sut = setupDeleteCategory(deleteCategoryRepo)
  })

  it('Should call deleteCategory.delete with corrects params', async () => {
    await sut({ id: 1 })

    expect(deleteCategoryRepo.delete).toHaveBeenCalledWith({ id: 1 })
    expect(deleteCategoryRepo.delete).toHaveBeenCalledTimes(1)
  })

  it('Should return true if category was deleted', async () => {
    const deleteCategory = await sut({ id: 1 })

    expect(deleteCategory).toBeTruthy()
  })

  it('Should return false if category was not deleted', async () => {
    deleteCategoryRepo.delete.mockResolvedValueOnce(false)

    const deleteCategory = await sut({ id: 1 })

    expect(deleteCategory).toBeFalsy()
  })
})
