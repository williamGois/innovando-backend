import User from '#models/user'
import { userCreateValidator, userUpdateValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UserController {
  // Listar todos os usuários
  async index({}: HttpContext) {
    const users = await User.query().preload('role')
    return users
  }

  // Criar um novo usuário
  async store({ request }: HttpContext) {
    const data = await request.validateUsing(userCreateValidator)
    const user = await User.create(data)
    return user
  }

  // Atualizar um usuário existente
  async update({ request, params }: HttpContext) {
  
    const data = await request.validateUsing(userUpdateValidator, { meta: { params } });
    
    const user = await User.findOrFail(params.id);
    user.merge(data);
    await user.save();
    return user;
  }
  

  async view({ params }: HttpContext) {
    const user = await User.findOrFail(params.id)
    return user
  }

  // Deletar um usuário
  async destroy({ params }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    return { message: 'Usuário deletado com sucesso' }
  }
}
