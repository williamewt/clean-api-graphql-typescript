import { Category } from '@prisma/client'
import { DeleteCategoryController } from '@/application/controllers'
import { HttpResponse, serverError } from '@/application/helpers'

describe('DeleteCategoryController', () => {
  let deleteCategory: jest.Mock
  let sut: DeleteCategoryController
  let id: number
  let categoryData: HttpResponse<Category>

  beforeAll(() => {
    deleteCategory = jest.fn()
    categoryData = {
      data: {
        id: 1,
        name: 'any_name',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      statusCode: 200
    }
    deleteCategory.mockResolvedValue(categoryData.data)
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

  it('should return a new data if deleteCategory success', async () => {
    const response = await sut.handle({ id })

    expect(response).toEqual(categoryData)
  })

  it('should return a Server Error if deleteCategory throws', async () => {
    deleteCategory.mockRejectedValueOnce(new Error('any_error'))

    const response = await sut.handle({ id })

    expect(response).toEqual(serverError(new Error('any_error')))
  })
})
