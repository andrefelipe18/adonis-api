import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany, computed } from '@ioc:Adonis/Lucid/Orm'
import { Post } from 'App/Models/'
import CamelCaseNamingStrategy from 'App/Strategys/CamelCaseNamingStrategy'

export class User extends BaseModel {
  public static namingStrategy = new CamelCaseNamingStrategy();

  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @computed()
  public get nomeEmail() {
    return `Usuario: ${this.name} - Email: ${this.email}`;
  }

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column({serializeAs: null})
  public role: 'normal' | 'admin';

  @column()
  public rememberMeToken: string | null

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //Faz a criptografia da senha antes de salvar no banco de dados
  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
