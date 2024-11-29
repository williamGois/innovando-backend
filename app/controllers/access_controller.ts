import type { HttpContext } from '@adonisjs/core/http'

export default class AccessController {
  /**
   * Verificar se o usuário tem uma permissão específica
   * @param request - Dados da requisição
   * @param auth - Informações de autenticação
   */
  public async check({ request, auth }: HttpContext) {
    // Valida a entrada e obtém o nome da permissão a ser verificada
    const { permission } = request.only(['permission'])
    await auth.check()
    const user = auth.user!

    const roles = await user.related('role').query().preload('permissions')

    const userPermissions = roles.flatMap((role) => role.permissions.map((perm) => perm.name))

    const hasPermission = userPermissions.includes(permission)

    if (hasPermission) {
      return { authorized: true }
    }

    return { authorized: false, message: 'Você não tem permissão para acessar este recurso.' }
  }
}
