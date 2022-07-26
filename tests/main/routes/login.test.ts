import request from 'supertest'

import { app } from '@/main/config/app'
import { InvalidCredentialsError } from '@/application/errors'

describe('Login Routes', () => {
  const loadByEmailSpy = jest.fn()

  jest.mock('@/infra/postgres/repos/user-account', () => ({
    PgUserAccountRepository: jest.fn().mockReturnValue({
      loadByEmail: loadByEmailSpy
    })
  }))

  describe('Post /login', () => {
    const compareSpy = jest.fn()

    jest.mock('@/infra/crypto/bcrypt-handler', () => ({
      BcryptHandler: jest.fn().mockReturnValue({ compare: compareSpy })
    }))

    beforeAll(() => {
      loadByEmailSpy.mockResolvedValue({
        id: 'any_id',
        name: 'any_name',
        password: 'any_password'
      })
    })

    it('should return 200 with AccessToken', async () => {
      compareSpy.mockResolvedValueOnce(true)

      const { status, body } = await request(app)
        .post('/login')
        .send({ email: 'any_email@email.com', password: 'any_password' })

      expect(status).toBe(200)
      expect(body.accessToken).toBeDefined()
    })

    it('should return 400 with InvalidCredentialsError when pass invalid email', async () => {
      loadByEmailSpy.mockResolvedValueOnce(undefined)

      const { status, body } = await request(app)
        .post('/login')
        .send({ email: 'any_invalid_email@email.com', password: 'any_password' })

      expect(status).toBe(400)
      expect(body.error).toBe(new InvalidCredentialsError().message)
    })

    it('should return 400 with InvalidCredentialsError when pass invalid password', async () => {
      compareSpy.mockResolvedValueOnce(false)

      const { status, body } = await request(app)
        .post('/login')
        .send({ email: 'any_email@email.com', password: 'any_invalid_password' })

      expect(status).toBe(400)
      expect(body.error).toBe(new InvalidCredentialsError().message)
    })
  })
})
