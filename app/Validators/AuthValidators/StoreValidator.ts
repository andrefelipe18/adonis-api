import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({trim: true}, [rules.email()]),
    password: schema.string({trim: true})
  })
  public messages: CustomMessages = {
    'email.required': 'O email é obrigatório',
    'email.email': 'O email deve ser válido',
  }
}
