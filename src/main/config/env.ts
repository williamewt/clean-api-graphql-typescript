import 'dotenv/config'

export const env = {
  port: process.env.PORT ?? 8080,
  bcryptSalt: parseInt(process.env.BCRYPT_SALT ?? '12'),
  jwtSecret: process.env.JWT_SECRET ?? ''
}
