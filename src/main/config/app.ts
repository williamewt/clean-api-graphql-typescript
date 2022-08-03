import express from 'express'
import { setupApolloServer } from '@/main/config/apollo-server'

const app = express()

setupApolloServer(app)
export { app }
