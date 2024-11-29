import type { HttpContext } from '@adonisjs/core/http'
import type { Authenticators } from '@adonisjs/auth/types'


export default class PermissionMiddleware {

    public async handle({ auth, response }: HttpContext, next: () => Promise<void>, options: {
        permissions: string[],
        guards?: (keyof Authenticators)[]
    }) {
        const { permissions } = options

        const user = auth.user
        if (!user) {
            return response.unauthorized({ message: 'Usuário não autenticado' })
        }

        const roles = await user.related('role').query().preload('permissions')
        const userPermissions = roles.flatMap((role) => role.permissions.map((perm) => perm.name))

        const hasPermission = permissions.some((permission) => userPermissions.includes(permission))

        if (!hasPermission) {
            return response.unauthorized({ message: 'Você não tem permissão para acessar este recurso.' })
        }

        return next()
    }
}

