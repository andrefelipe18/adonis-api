import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Acl {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>, allowedRoles: string[]) {
    const user = await auth.authenticate();

    if(!allowedRoles.includes(user.role)){ //Quando o usuário não tem permissão para acessar o recurso
      return response.unauthorized({error: 'Você não tem permissão para acessar este recurso'});
    }

    await next() //Quando o usuário tem permissão para acessar o recurso o fluxo continua
  }
}
