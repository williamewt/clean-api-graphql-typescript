import { Category } from '@prisma/client'
import { CreateCategoryController } from '@/application/controllers'
import { HttpResponse, serverError } from '@/application/helpers'

describe('CreateCategoryController', () => {
  let createCategory: jest.Mock
  let sut: CreateCategoryController
  let name: string
  let categoryData: HttpResponse<Category>

  beforeAll(() => {
    createCategory = jest.fn()
    categoryData = {
      data: {
        id: 1,
        name: 'any_name',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      statusCode: 200
    }
    createCategory.mockResolvedValue(categoryData.data)
    name = 'any_name'
  })

  beforeEach(() => {
    sut = new CreateCategoryController(createCategory)
  })

  it('should call CreateCategory with correct params', async () => {
    await sut.handle({ name })

    expect(createCategory).toHaveBeenCalledWith({ name })
    expect(createCategory).toHaveBeenCalledTimes(1)
  })

  it('should return a new data if createCategory success', async () => {
    const response = await sut.handle({ name })

    expect(response).toEqual(categoryData)
  })

  it('should return a Server Error if createCategory throws', async () => {
    createCategory.mockRejectedValueOnce(new Error('any_error'))

    const response = await sut.handle({ name })

    expect(response).toEqual(serverError(new Error('any_error')))
  })
})
