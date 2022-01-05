import { Document } from 'mongoose'

export interface IRole extends Document {
  title: string
  description: string
  system: boolean
  sudo: boolean
  key: string
  permissionKeys: string[]
}

export const ROLE_PERMISSIONS = {
  CREATE: 'role.create',
  UPDATE: 'role.update',
  DELETE: 'role.delete',
  READ: 'role.read',
}
