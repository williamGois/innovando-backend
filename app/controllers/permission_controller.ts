import Permission from '#models/permission'
import { permissionCreateValidator, permissionUpdateValidator } from '#validators/role'
import type { HttpContext } from '@adonisjs/core/http'

export default class PermissionController {
  // Listar todas as permissões
  public async index({}: HttpContext) {
    const permissions = await Permission.all()
    return permissions
  }

  // Criar uma nova permissão
  public async store({ request }: HttpContext) {
    const data = await request.validateUsing(permissionCreateValidator)
    const permission = await Permission.create(data)
    return permission
  }

  // Atualizar uma permissão existente
  public async update({ request, params }: HttpContext) {
    const data = await request.validateUsing(permissionUpdateValidator)
    const permission = await Permission.findOrFail(params.id)
    permission.merge(data)
    await permission.save()
    return permission
  }

  // Excluir uma permissão
  public async destroy({ params }: HttpContext) {
    const permission = await Permission.findOrFail(params.id)
    await permission.delete()
    return { message: 'Permissão deletada com sucesso' }
  }
}
