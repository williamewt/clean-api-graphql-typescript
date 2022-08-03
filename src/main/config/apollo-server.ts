import { ApolloServer } from 'apollo-server-express'
import { Express } from 'express'
import typeDefs from '@/main/config/type-defs'
import resolvers from '@/main/config/resolvers'

export const setupApolloServer = async (app: Express): Promise<void> => {
  const server = new ApolloServer({
    resolvers,
    typeDefs
  })

  await server.start()

  server.applyMiddleware({ app })
}
