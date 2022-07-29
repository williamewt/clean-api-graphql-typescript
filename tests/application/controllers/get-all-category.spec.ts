import { Category } from '@prisma/client'
import { GetAllCategoryController } from '@/application/controllers'
import { ServerError } from '@/application/errors'

describe('GetAllCategoryController', () => {
  let getAllCategory: jest.Mock
  let sut: GetAllCategoryController
  let categoryData: Category[]

  beforeAll(() => {
    getAllCategory = jest.fn()
    categoryData = [
      {
        id: 1,
        name: 'any_name',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    getAllCategory.mockResolvedValue(categoryData)
  })

  beforeEach(() => {
    sut = new GetAllCategoryController(getAllCategory)
  })

  it('should return error if getAllCategory returns undefined', async () => {
    getAllCategory.mockResolvedValueOnce(undefined)

    const response = await sut.handle()

    expect(response).toEqual(new ServerError())
  })

  it('should return a new data if getAllCategory success', async () => {
    const response = await sut.handle()

    expect(response).toEqual(categoryData)
  })
})
