import PostNotFoundException from '../../exceptions/PostNotFoundException';
import * as express from 'express';
import Controller from '../../interfaces/controller.interface';
import Post from './post.interface';
import validationMiddleware from '../../middleware/validation.middleware';
import CreatePostDto from './post.dto';

class PostsController implements Controller {
  public path = '/posts';
  public router = express.Router();

  private posts: Post[] = [
    {
      author: 'Marcin',
      content: 'Dolor sit amet',
      title: 'Lorem Ipsum',
    }
  ];
 
  constructor() {
    this.intializeRoutes();
  }
 
  public intializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.post(this.path, validationMiddleware(CreatePostDto), this.createAPost);
  }

  getAllPosts = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    next(new PostNotFoundException("6"));
    response.send(this.posts);
  }
 
  createAPost = (request: express.Request, response: express.Response) => {
    const post: Post = request.body;
    this.posts.push(post);
    response.send(post);
  }
}
 
export default PostsController;