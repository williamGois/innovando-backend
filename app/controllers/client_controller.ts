import Client from '#models/client'
import { clientCreateValidator, clientUpdateValidator } from '#validators/client'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClientController {
  // Listar todos os clientes
  async index({}: HttpContext) {
    const clients = await Client.query().preload('role')
    return clients
  }

  // Criar um novo cliente
  async store({ request }: HttpContext) {
    const data = await request.validateUsing(clientCreateValidator)
    const client = await Client.create(data)
    return client
  }

  // Atualizar um cliente existente
  async update({ request, params }: HttpContext) {
    const data = await request.validateUsing(clientUpdateValidator)
    const client = await Client.findOrFail(params.id)
    client.merge(data)
    await client.save()
    return client
  }

  // Deletar um cliente
  async destroy({ params }: HttpContext) {
    const client = await Client.findOrFail(params.id)
    await client.delete()
    return { message: 'Cliente deletado com sucesso' }
  }
}
