import { Category } from '@prisma/client'
import { GetAllCategoryController } from '@/application/controllers'
import { HttpResponse, serverError } from '@/application/helpers'

describe('GetAllCategoryController', () => {
  let getAllCategory: jest.Mock
  let sut: GetAllCategoryController
  let categoryData: HttpResponse<Category[]>

  beforeAll(() => {
    getAllCategory = jest.fn()
    categoryData = {
      data: [
        {
          id: 1,
          name: 'any_name',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      statusCode: 200
    }
    getAllCategory.mockResolvedValue(categoryData.data)
  })

  beforeEach(() => {
    sut = new GetAllCategoryController(getAllCategory)
  })

  it('should return a new data if getAllCategory success', async () => {
    const response = await sut.handle()

    expect(response).toEqual(categoryData)
  })

  it('should return a Server Error if getAllCategory throws', async () => {
    getAllCategory.mockRejectedValueOnce(new Error('any_error'))

    const response = await sut.handle()

    expect(response).toEqual(serverError(new Error('any_error')))
  })
})
