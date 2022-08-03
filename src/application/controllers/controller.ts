import { HttpResponse } from '@/application/helpers'

export interface Controller {
  handle: (args: any) => Promise<HttpResponse>
}
