import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {StoreValidator, UpdateValidator} from 'App/Validators/PostsValidators';
import { Post } from 'App/Models/';



export default class PostsController {

  public async index({}: HttpContextContract) {
    const posts = await Post.query().orderBy('id', 'desc').preload('author');
    return posts;
  }


  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate(StoreValidator);

    const User = await auth.authenticate();


    const slug: string = data.title.toLowerCase().replace(/ /g, '-');
    const post = await Post.create({...data, slug, authorId: User.id});

    await post.preload('author');

    return post;
  }


  public async show({ params }: HttpContextContract) {
    const post: Post = await Post.findOrFail(params.id);

    return post;
  }

  public async update({ request, params }: HttpContextContract) {
    const data = await request.validate(UpdateValidator);
    const post = await Post.findOrFail(params.id);
    const slug: string = data.title.toLowerCase().replace(/ /g, '-');

    post.merge({...data, slug});

    await post.save();

    await post.preload('author');

    return post;
  }

  public async destroy({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id);

    await post.delete();

  }
}
