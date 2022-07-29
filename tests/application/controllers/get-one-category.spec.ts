import { Category } from '@prisma/client'
import { GetOneByIdCategoryController } from '@/application/controllers'
import { ServerError } from '@/application/errors'

describe('GetOneByIdCategoryController', () => {
  let getOneByIdCategory: jest.Mock
  let sut: GetOneByIdCategoryController
  let id: number
  let categoryData: Category

  beforeAll(() => {
    getOneByIdCategory = jest.fn()
    categoryData = {
      id: 1,
      name: 'any_name',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    getOneByIdCategory.mockResolvedValue(categoryData)
    id = 1
  })

  beforeEach(() => {
    sut = new GetOneByIdCategoryController(getOneByIdCategory)
  })

  it('should call GetOneByIdCategory with correct params', async () => {
    await sut.handle({ id })

    expect(getOneByIdCategory).toHaveBeenCalledWith({ id })
    expect(getOneByIdCategory).toHaveBeenCalledTimes(1)
  })

  it('should return error if getOneByIdCategory returns undefined', async () => {
    getOneByIdCategory.mockResolvedValueOnce(undefined)

    const response = await sut.handle({ id })

    expect(response).toEqual(new ServerError())
  })

  it('should return a new data if getOneByIdCategory success', async () => {
    const response = await sut.handle({ id })

    expect(response).toEqual(categoryData)
  })
})
