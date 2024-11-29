import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Permission from '#models/permission'
import Role from '#models/role'

export default class PermissionSeeder extends BaseSeeder {
  public async run() {

    const permissions = await Permission.createMany([
      { name: 'create_users', description: 'Criar novos usuários' },
      { name: 'edit_users', description: 'Editar usuários existentes' },
      { name: 'view_users', description: 'Visualizar usuários existentes' },
      { name: 'delete_users', description: 'Deletar usuários existentes' },
      { name: 'create_clients', description: 'Criar novos clientes' },
      { name: 'edit_clients', description: 'Editar clientes existentes' },
      { name: 'delete_clients', description: 'Deletar clientes existentes' },
      { name: 'view_roles', description: 'Visualizar roles' },
      { name: 'create_roles', description: 'Criar novas roles' },
      { name: 'edit_roles', description: 'Editar roles existentes' },
      { name: 'delete_roles', description: 'Deletar roles existentes' },
      { name: 'view_permissions', description: 'Visualizar permissões' },
      { name: 'assign_permissions', description: 'Associar permissões às roles' },
      { name: 'view_reports', description: 'Visualizar relatórios' },
      { name: 'generate_reports', description: 'Gerar novos relatórios' },
      { name: 'view_settings', description: 'Visualizar configurações do sistema' },
      { name: 'edit_settings', description: 'Alterar configurações do sistema' }, 
    ])

    const adminRole = await Role.create({
      name: 'ADMINISTRADOR',
      description: 'Acesso total ao sistema',
    })

    const usuarioRole = await Role.create({
      name: 'USUARIO',
      description: 'Acesso limitado ao sistema',
    })

    await Role.create({
      name: 'CLIENTE',
      description: 'Sem acesso ao sistema',
    })

    await adminRole.related('permissions').attach(
      permissions.map((permission) => permission.id)
    )

    await usuarioRole.related('permissions').attach(
      permissions
        .filter((permission) =>
          ['create_clients', 'edit_clients'].includes(permission.name)
        )
        .map((permission) => permission.id)
    )

  }
}
