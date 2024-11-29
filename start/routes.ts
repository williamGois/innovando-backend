const AuthController = () => import('#controllers/auth_controller')
const UserController = () => import('#controllers/user_controller')
const ClientController = () => import('#controllers/client_controller')
const RoleController = () => import('#controllers/role_controller')
const PermissionController = () => import('#controllers/permission_controller')
const AccessController = () => import('#controllers/access_controller')

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// Rota de teste inicial
router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// ======================
// Rotas de Autenticação
// ======================
router.post('/register', [AuthController, 'register']).as('auth.register')
router.post('/login', [AuthController, 'login']).as('auth.login')
router.delete('/logout', [AuthController, 'logout'])
  .as('auth.logout')
  .use(middleware.auth())
router.get('/me', [AuthController, 'me'])
  .as('auth.me')
  .use(middleware.auth())

// ========================
// Gerenciamento de Usuários
// ========================
router.get('/users', [UserController, 'index'])
  .as('users.index')
  .use(middleware.auth())
  .use(middleware.permission({ guards: ['api'], permissions: ['view_users'] }))

router.post('/users', [UserController, 'store'])
  .as('users.store')
  .use(middleware.auth())
  .use(middleware.permission({ guards: ['api'], permissions: ['create_users'] }))

router.put('/users/:id', [UserController, 'update'])
  .as('users.update')
  .use(middleware.auth())
  .use(middleware.permission({ guards: ['api'], permissions: ['edit_users'] }))

router.get('/users/:id', [UserController, 'view'])
  .as('users.view')
  .use(middleware.auth())
  .use(middleware.permission({ guards: ['api'], permissions: ['view_users'] }))

router.delete('/users/:id', [UserController, 'destroy'])
  .as('users.destroy')
  .use(middleware.auth())
  .use(middleware.permission({ guards: ['api'], permissions: ['delete_users'] }))

// ========================
// Gerenciamento de Clientes
// ========================
router.get('/clients', [ClientController, 'index'])
  .as('clients.index')
  .use(middleware.auth())
  .use(middleware.permission({ guards: ['api'], permissions: ['view_clients'] }))

router.post('/clients', [ClientController, 'store'])
  .as('clients.store')
  .use(middleware.auth())
  .use(middleware.permission({ guards: ['api'], permissions: ['create_clients'] }))

router.put('/clients/:id', [ClientController, 'update'])
  .as('clients.update')
  .use(middleware.auth())
  .use(middleware.permission({ guards: ['api'], permissions: ['edit_clients'] }))

// ========================
// Gerenciamento de Roles e Permissões
// ========================
router.get('/roles', [RoleController, 'index'])
  .as('roles.index')
  .use(middleware.auth())
  .use(middleware.permission({ guards: ['api'], permissions: ['view_roles'] }))

router.post('/roles', [RoleController, 'store'])
  .as('roles.store')
  .use(middleware.auth())
  .use(middleware.permission({ guards: ['api'], permissions: ['create_roles'] }))

router.put('/roles/:id', [RoleController, 'update'])
  .as('roles.update')
  .use(middleware.auth())
  .use(middleware.permission({ guards: ['api'], permissions: ['edit_roles'] }))

router.delete('/roles/:id', [RoleController, 'destroy'])
  .as('roles.destroy')
  .use(middleware.auth())
  .use(middleware.permission({ guards: ['api'], permissions: ['delete_roles'] }))

router.post('/roles/:id/permissions', [RoleController, 'assignPermissions'])
  .as('roles.assignPermissions')
  .use(middleware.auth())
  .use(middleware.permission({ guards: ['api'], permissions: ['assign_permissions'] }))

router.get('/permissions', [PermissionController, 'index'])
  .as('permissions.index')
  .use(middleware.auth())
  .use(middleware.permission({ guards: ['api'], permissions: ['view_permissions'] }))

// ========================
// Controle de Acesso
// ========================
router.post('/access/check', [AccessController, 'check'])
  .as('access.check')
  .use(middleware.auth())
