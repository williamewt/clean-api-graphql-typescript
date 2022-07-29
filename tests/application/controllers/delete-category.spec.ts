import { Category } from '@prisma/client'
import { DeleteCategoryController } from '@/application/controllers'
import { ServerError } from '@/application/errors'

describe('DeleteCategoryController', () => {
  let deleteCategory: jest.Mock
  let sut: DeleteCategoryController
  let id: number
  let categoryData: Category

  beforeAll(() => {
    deleteCategory = jest.fn()
    categoryData = {
      id: 1,
      name: 'any_name',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    deleteCategory.mockResolvedValue(categoryData)
    id = 1
  })

  beforeEach(() => {
    sut = new DeleteCategoryController(deleteCategory)
  })

  it('should call DeleteCategory with correct params', async () => {
    await sut.handle({ id })

    expect(deleteCategory).toHaveBeenCalledWith({ id })
    expect(deleteCategory).toHaveBeenCalledTimes(1)
  })

  it('should return error if deleteCategory returns undefined', async () => {
    deleteCategory.mockResolvedValueOnce(undefined)

    const response = await sut.handle({ id })

    expect(response).toEqual(new ServerError())
  })

  it('should return a new data if deleteCategory success', async () => {
    const response = await sut.handle({ id })

    expect(response).toEqual(categoryData)
  })
})
