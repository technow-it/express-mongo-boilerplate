import role from './routes/role.route'
import user from './routes/user.route'
import auth from './routes/auth.route'
import { Router } from 'express'

export default () => {
  const app = Router()
  user(app)
  role(app)
  auth(app)

  return app
}
