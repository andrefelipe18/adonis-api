import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator } from 'App/Validators/AuthValidators'


export default class AuthController {
  //Aqui será feito o login do usuário
  public async store({ request, auth }: HttpContextContract) {
    const { email, password } = await request.validate(StoreValidator);

    const token = await auth.attempt(email, password, {expiresIn: '5 days'});

    return token;
  }

  //Aqui será feito o logout do usuário
  public async destroy({ auth }: HttpContextContract) {
    await auth.logout();
  }
}
