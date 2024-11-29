import Role from '#models/role'
import { roleCreateValidator, roleUpdateValidator } from '#validators/role'
import type { HttpContext } from '@adonisjs/core/http'

export default class RoleController {
  // Listar todas as roles
  public async index({}: HttpContext) {
    const roles = await Role.query().preload('permissions') // Precarrega as permissões
    return roles
  }

  // Criar uma nova role
  public async store({ request }: HttpContext) {
    const data = await request.validateUsing(roleCreateValidator)
    const role = await Role.create(data)
    return role
  }

  // Atualizar uma role existente
  public async update({ request, params }: HttpContext) {
    const data = await request.validateUsing(roleUpdateValidator)
    const role = await Role.findOrFail(params.id)
    role.merge(data)
    await role.save()
    return role
  }

  // Excluir uma role
  public async destroy({ params }: HttpContext) {
    const role = await Role.findOrFail(params.id)
    await role.delete()
    return { message: 'Role deletada com sucesso' }
  }

  // Associar permissões a uma role
  public async assignPermissions({ request, params }: HttpContext) {
    const { permissionIds } = request.only(['permissionIds'])
    const role = await Role.findOrFail(params.id)

    // Associa permissões
    await role.related('permissions').sync(permissionIds)
    await role.load('permissions')

    return role
  }
}
