import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Client from '#models/client'
import Role from '#models/role'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    const clienteRole = await Role.findByOrFail('name', 'CLIENTE')

    await Client.createMany([
      {
        fullName: 'Cliente User',
        roleId: clienteRole.id,
      },
    ])
  }
}
