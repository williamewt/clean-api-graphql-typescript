import { Category } from '@prisma/client'
import { mock, MockProxy } from 'jest-mock-extended'
import { GetOneByIdCategory, setupGetOneByIdCategory } from '@/domain/use-cases'
import { GetOneByIdCategoryRepository } from '@/domain/contracts/repos'

describe('GetOneByIdCategory', () => {
  let sut: GetOneByIdCategory
  let getOneByCategoryRepo: MockProxy<GetOneByIdCategoryRepository>
  let categoryData: Category

  beforeAll(() => {
    getOneByCategoryRepo = mock()
    categoryData = {
      id: 1,
      name: 'any_name',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    getOneByCategoryRepo.getOneById.mockResolvedValue(categoryData)
  })

  beforeEach(() => {
    sut = setupGetOneByIdCategory(getOneByCategoryRepo)
  })

  it('Should call getOneByCategoryRepo.getOneById with corrects params', async () => {
    await sut({ id: 1 })

    expect(getOneByCategoryRepo.getOneById).toHaveBeenCalledWith({ id: 1 })
    expect(getOneByCategoryRepo.getOneById).toHaveBeenCalledTimes(1)
  })

  it('Should return one category by Id', async () => {
    const categories = await sut({ id: 1 })

    expect(categories).toEqual(categoryData)
  })

  it('Should return undefined if getOneByCategoryRepo.getOneById returns undefined', async () => {
    getOneByCategoryRepo.getOneById.mockResolvedValueOnce(undefined)

    const category = await sut({ id: 1 })

    expect(category).toBeUndefined()
  })
})
