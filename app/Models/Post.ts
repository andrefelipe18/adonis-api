import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { User } from 'App/Models/'
import CamelCaseNamingStrategy from 'App/Strategys/CamelCaseNamingStrategy'
import { CherryPick } from '@ioc:Adonis/Lucid/Orm'

export class Post extends BaseModel {
  public static namingStrategy = new CamelCaseNamingStrategy()
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'title' })
  public title: string

  @column({ columnName: 'content' })
  public content: string

  @column({ columnName: 'slug' })
  public slug: string

  @column({ columnName: 'author_id', serializeAs: null })
  public authorId: number

  @belongsTo(() => User, { foreignKey: 'authorId' })
  public author: BelongsTo<typeof User>

  @column.dateTime({
    autoCreate: true,
    serialize: (value: DateTime) => {
      return value.toFormat('dd/MM/yyyy HH:mm:ss')
    },
  })
  public createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize: (value: DateTime) => {
      return value.toFormat('dd/MM/yyyy HH:mm:ss')
    },
  })
  public updatedAt: DateTime

  public serialize(cherryPick?: CherryPick) {
    return {
      ...this.serializeAttributes(cherryPick?.fields, false),
      ...this.serializeComputed(cherryPick?.fields),
      ...this.serializeRelations(
        {
          author: {
            fields: ['id', 'name', 'email'], //Para retornar apenas os campos especificados
          //fields: { omit: ['password'] }, //Para omitir campos do relacionamento
          }
        }, false),
    }
  }
}
