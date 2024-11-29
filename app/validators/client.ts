import vine from '@vinejs/vine'

// Validador para criar um cliente
export const clientCreateValidator = vine.compile(
  vine.object({
    fullName: vine.string().maxLength(255),
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const match = await db.from('clients').select('id').where('email', value).first()
        return !match
      }),
    roleId: vine
      .number()
      .exists(async (db, value) => {
        const match = await db.from('roles').select('id').where('id', value).first()
        return !!match
      }),
  })
)

// Validador para atualizar um cliente
export const clientUpdateValidator = vine.compile(
  vine.object({
    fullName: vine.string().maxLength(255).optional(),
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const match = await db.from('client').select('id').where('email', value).first()
        return !match
      }),
    roleId: vine
      .number()
      .exists(async (db, value) => {
        const match = await db.from('roles').select('id').where('id', value).first()
        return !!match
      })
      .optional(),
  })
)
