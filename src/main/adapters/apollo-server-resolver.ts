import { Controller } from '@/application/controllers'

export const adaptResolver = (controller: Controller) => async (_: any, args: any) => {
  if (typeof args.id !== 'undefined') {
    args.id = parseInt(args.id)
  }
  const httpResponse = await controller.handle(args)
  return httpResponse.data
}
