import { HttpGetClient, HttpPostClient } from '@/infra/http'
import axios from 'axios'

export class AxiosHttpClient implements HttpGetClient, HttpPostClient {
  async get (input: HttpGetClient.Input): Promise<any> {
    const result = await axios.get(input.url, input.config ?? {})
    return result.data
  }

  async post ({ url, params }: HttpPostClient.Input): Promise<any> {
    const result = await axios.post(url, params)
    return result.data
  }
}
