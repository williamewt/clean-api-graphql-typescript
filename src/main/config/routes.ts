import { Express } from 'express'
import { graphqlHTTP } from 'express-graphql'
import resolvers from '@/main/config/resolvers'
import schema from '@/main/config/schema'

export const setupRoutes = (app: Express): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true
  }))
}
