import { Category } from '@prisma/client'
import { UpdateCategoryController } from '@/application/controllers'
import { HttpResponse, serverError } from '@/application/helpers'
import { NotUpdateError } from '@/application/errors'

describe('UpdateCategoryController', () => {
  let updateCategory: jest.Mock
  let sut: UpdateCategoryController
  let id: number
  let name: string
  let categoryData: HttpResponse<Category>

  beforeAll(() => {
    updateCategory = jest.fn()
    categoryData = {
      data: {
        id: 1,
        name: 'any_name',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      statusCode: 200
    }
    updateCategory.mockResolvedValue(categoryData.data)
    id = 1
    name = 'any_name'
  })

  beforeEach(() => {
    sut = new UpdateCategoryController(updateCategory)
  })

  it('should call UpdateCategory with correct params', async () => {
    await sut.handle({ id, name })

    expect(updateCategory).toHaveBeenCalledWith({ id, name })
    expect(updateCategory).toHaveBeenCalledTimes(1)
  })

  it('should return error if updateCategory returns undefined', async () => {
    updateCategory.mockResolvedValueOnce(undefined)

    const response = await sut.handle({ id, name })

    expect(response).toEqual({
      data: new NotUpdateError('Category'),
      statusCode: 400
    })
  })

  it('should return a new data if updateCategory success', async () => {
    const response = await sut.handle({ id, name })

    expect(response).toEqual(categoryData)
  })

  it('should return a Server Error if updateCategory throws', async () => {
    updateCategory.mockRejectedValueOnce(new Error('any_error'))

    const response = await sut.handle({ id, name })

    expect(response).toEqual(serverError(new Error('any_error')))
  })
})
