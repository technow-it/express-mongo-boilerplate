import { IRole, ROLE_PERMISSIONS } from '@/interfaces'
import { Role } from '@/models'
import { AbstractService } from './abstract.service'

class RoleService extends AbstractService<IRole> {
  public getEntityManager = () => Role
  public getPermissions = () => ROLE_PERMISSIONS
}

export default new RoleService()
