import dotenv from 'dotenv'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

dotenv.config()

export default {
  /**
   * Application server listening port
   */
  port: process.env.PORT,

  /**
   * Mongodb database name
   */
  databaseUris: process.env.DATABASE_URIS_JSON
    ? getObject(process.env.DATABASE_URIS_JSON)
    : errorAndExit('Please provide a valid JSON of mongo uris.'),

  /**
   * API configs
   */
  api: {
    prefix: process.env.API_PREFIX,
  },

  /**
   * ENVIRONMENT
   */

  env: process.env.NODE_ENV,
  enableDiscordLogging: process.env.ENABLE_DISCORD_LOGS,

  /*
    WEBHOOK
  */
  errorWebhookUrl: process.env.ERROR_WEBHOOK,
  loggerWebhookUrl: process.env.LOGGER_WEBHOOK,

  jwtExpirationTime: '1d',
  refreshTokenExpiration: '30d',
  jwtSecret: process.env.JWT_SECRET ? process.env.JWT_SECRET : errorAndExit('Please provide a auth JWT secret.'),
  refreshJwtSecret: process.env.REFRESH_JWT_SECRET ? process.env.REFRESH_JWT_SECRET : errorAndExit('Please provide a refresh JWT secret.'),
}

function getObject(json: string) {
  try {
    const object = JSON.parse(json)
    if (!Array.isArray(object)) errorAndExit('Please provide a valid JSON of mongo uris.')
    if (object.length < 0) errorAndExit('Please provide a valid JSON of mongo uris.')
    return object
  } catch (e: any) {
    errorAndExit(e.toString())
  }
}

function errorAndExit(message: string) {
  console.log(message)
  process.exit(1)
}
