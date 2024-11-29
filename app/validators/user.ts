import vine from '@vinejs/vine'

// Reutilizar regras de validação para senha
const password = vine.string().minLength(8)

// Validador para criar um usuário
export const userCreateValidator = vine.compile(
    vine.object({
        fullName: vine.string().maxLength(255),
        email: vine
            .string()
            .email()
            .normalizeEmail()
            .unique(async (db, value) => {
                const match = await db.from('users').select('id').where('email', value).first()
                return !match
            }),
        password,
        roleId: vine
            .number()
            .exists(async (db, value) => {
                const match = await db.from('roles').select('id').where('id', value).first()
                return !!match
            }),
    })
)

export const userUpdateValidator = vine.compile(
    vine.object({
        fullName: vine.string().maxLength(255).optional(),
        email: vine
            .string()
            .email()
            .normalizeEmail()
            .unique(async (db, value, { meta }) => {
                const userId = meta.params?.id;
          
                if (!userId) {
                    throw new Error('O ID do usuário é necessário para validar o email.');
                }

                const match = await db
                    .from('users')
                    .select('id')
                    .where('email', value)
                    .whereNot('id', userId)
                    .first();

                return !match;
            }),
        password: password.optional(),
        roleId: vine
            .number()
            .exists(async (db, value) => {
                const match = await db.from('roles').select('id').where('id', value).first();
                return !!match;
            })
            .optional(),
    })
);


