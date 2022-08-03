import { Category } from '@prisma/client'
import { GetOneByIdCategoryController } from '@/application/controllers'
import { HttpResponse, serverError } from '@/application/helpers'
import { NotFindError } from '@/application/errors'

describe('GetOneByIdCategoryController', () => {
  let getOneByIdCategory: jest.Mock
  let sut: GetOneByIdCategoryController
  let id: number
  let categoryData: HttpResponse<Category>

  beforeAll(() => {
    getOneByIdCategory = jest.fn()
    categoryData = {
      data: {
        id: 1,
        name: 'any_name',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      statusCode: 200
    }
    getOneByIdCategory.mockResolvedValue(categoryData.data)
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

    expect(response).toEqual({
      data: new NotFindError('Category'),
      statusCode: 400
    })
  })

  it('should return a new data if getOneByIdCategory success', async () => {
    const response = await sut.handle({ id })

    expect(response).toEqual(categoryData)
  })

  it('should return a Server Error if getOneByIdCategory throws', async () => {
    getOneByIdCategory.mockRejectedValueOnce(new Error('any_error'))

    const response = await sut.handle({ id })

    expect(response).toEqual(serverError(new Error('any_error')))
  })
})
