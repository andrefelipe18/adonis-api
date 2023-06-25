import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'


export default class extends BaseSeeder {
  public async run () {
   await User.createMany([
    {
      name: 'Admin',
      email: 'admin@adonis.com',
      password: 'secret',
      role: 'admin'
    },
    {
      name: 'Normal',
      email: 'normal@adonis.com',
      password: 'secret',
      role: 'normal'
    }
   ])
  }
}

