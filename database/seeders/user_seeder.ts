import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Role from '#models/role'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    const adminRole = await Role.findByOrFail('name', 'ADMINISTRADOR')
    const usuarioRole = await Role.findByOrFail('name', 'USUARIO')

    await User.createMany([
      {
        fullName: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        roleId: adminRole.id,
      },
      {
        fullName: 'Usuario User',
        email: 'usuario@example.com',
        password: 'usuario123',
        roleId: usuarioRole.id,
      },
    ])
  }
}
