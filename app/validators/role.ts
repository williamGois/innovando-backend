import vine from '@vinejs/vine'

export const roleCreateValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(255),
    description: vine.string().maxLength(500).optional(),
  })
)

export const roleUpdateValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(255).optional(),
    description: vine.string().maxLength(500).optional(),
  })
)

export const assignPermissionsValidator = vine.compile(
    vine.object({
      permissionIds: vine
        .array(vine.number())
        .minLength(1)
    })
)

export const permissionCreateValidator = vine.compile(
    vine.object({
        name: vine.string().maxLength(255),
        description: vine.string().maxLength(500).optional(),
    })
)

export const permissionUpdateValidator = vine.compile(
    vine.object({
      name: vine.string().maxLength(255).optional(),
      description: vine.string().maxLength(500).optional(),
    })
)