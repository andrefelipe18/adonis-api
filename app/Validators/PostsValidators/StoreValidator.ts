import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
      title: schema.string({trim: true}, [rules.unique({table: 'posts', column: 'title'}), rules.required() ]), //Trim remove os espaços em branco antes e depois da string
      content: schema.string({trim: true})
  })
  public messages: CustomMessages = {
    'title.required': 'O título é obrigatório',
    'title.unique': 'Este título já existe',
    'content.required': 'O conteúdo é obrigatório'
  }
}
