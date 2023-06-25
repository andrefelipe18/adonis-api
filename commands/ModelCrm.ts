import { BaseCommand, args } from '@adonisjs/core/build/standalone'
import { join } from 'path'
import { ensureDirSync, existsSync, readFileSync, writeFileSync } from 'fs-extra'
import { pascalCase } from 'pascal-case'

export default class ModelCrm extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'model:crm'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Create model, controller resource and migration for CRM'

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: false,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  //Argumento que será passado para o comando para criar o model, controller resource e a migration
  @args.string({ description: 'Name of the model', required: true })
  public name: string

  //Comando que será executado com o argumento passado
  public async run(): Promise<void> {
    //Pegando o nome do model passado como argumento
    const modelName = this.name

    // Criação do model
    const modelTemplate = `
  'use strict'

  const Model = use('Model')

  class ${pascalCase(modelName)} extends Model {
  }

  module.exports = ${pascalCase(modelName)}
`
    const modelPath = join('app', 'Models', `${pascalCase(modelName)}.ts`)
    ensureDirSync(join('app', 'Models'))
    writeFileSync(modelPath, modelTemplate)

    // Criação da migration
    const migrationTemplate = `
  'use strict'

  const Schema = use('Schema')

  class ${pascalCase(modelName)}Schema extends Schema {
    up () {
      this.create('${modelName.toLowerCase()}s', (table) => {
        table.increments()
        // Defina as colunas da tabela aqui
        table.timestamps()
      })
    }

    down () {
      this.drop('${modelName.toLowerCase()}s')
    }
  }

  module.exports = ${pascalCase(modelName)}Schema
`
    const timestamp = new Date().getTime()
    const migrationPath = join(
      'database',
      'migrations',
      `${timestamp}_create_${modelName.toLowerCase()}s_table.ts`
    )
    ensureDirSync(join('database', 'migrations'))
    writeFileSync(migrationPath, migrationTemplate)

    // Criação do controller resource
    const controllerTemplate = readFileSync(
      join(__dirname, 'stubs', 'controller-resource.stub'),
      'utf-8'
    )
    const controllerPath = join(
      'app',
      'Controllers',
      'Http',
      `${pascalCase(modelName)}Controller.ts`
    )
    ensureDirSync(join('app', 'Controllers', 'Http'))
    writeFileSync(controllerPath, controllerTemplate)

    this.logger.info(
      `Model, migration e controller resource criados com sucesso para o modelo ${modelName}`
    )
  }
}
