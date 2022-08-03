import { Category } from '@prisma/client'
import { mock, MockProxy } from 'jest-mock-extended'
import { GetAllCategory, setupGetAllCategory } from '@/domain/use-cases'
import { GetAllCategoryRepository } from '@/domain/contracts/repos'

describe('GetAllCategory', () => {
  let sut: GetAllCategory
  let getAllCategoryRepo: MockProxy<GetAllCategoryRepository>
  let categoryData: Category[]

  beforeAll(() => {
    getAllCategoryRepo = mock()
    categoryData = [
      {
        id: 1,
        name: 'any_name',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    getAllCategoryRepo.getAll.mockResolvedValue(categoryData)
  })

  beforeEach(() => {
    sut = setupGetAllCategory(getAllCategoryRepo)
  })

  it('Should return all categories', async () => {
    const categories = await sut()

    expect(categories).toEqual(categoryData)
  })
})
