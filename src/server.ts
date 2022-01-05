import express from 'express'
import config from '@/config'
import cors from 'cors'

async function startServer() {
  const app = express()
  app.use(cors())

  await require('./loaders').default({ expressApp: app })

  app.listen(config.port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${config.port}`)
  })
}

startServer()
