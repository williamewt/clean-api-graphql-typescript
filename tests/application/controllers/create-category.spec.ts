import { Category } from '@prisma/client'
import { CreateCategoryController } from '@/application/controllers'
import { ServerError } from '@/application/errors'

describe('CreateCategoryController', () => {
  let createCategory: jest.Mock
  let sut: CreateCategoryController
  let name: string
  let categoryData: Category

  beforeAll(() => {
    createCategory = jest.fn()
    categoryData = {
      id: 1,
      name: 'any_name',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    createCategory.mockResolvedValue(categoryData)
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

  it('should return error if createCategory returns undefined', async () => {
    createCategory.mockResolvedValueOnce(undefined)

    const response = await sut.handle({ name })

    expect(response).toEqual(new ServerError())
  })

  it('should return a new data if createCategory success', async () => {
    const response = await sut.handle({ name })

    expect(response).toEqual(categoryData)
  })
})
