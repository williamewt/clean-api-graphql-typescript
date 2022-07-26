
import { Router } from 'express'

import { makeLoginController } from '@/main/factories/controllers'
import { adaptExpressRoute as adapt } from '@/main/adapters'

export default (router: Router): void => {
  router.post('/login', adapt(makeLoginController()))
}
