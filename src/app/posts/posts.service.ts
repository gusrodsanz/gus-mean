import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{
        message: 'message from node';
        posts: any; //Post[];
      }>('http://localhost:3000/api/posts')
      .pipe(
        map( (postData) => {
          return postData.posts.map( (post) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id
            };
          });
        })
      )
      .subscribe(( transformedPost) => {
        this.posts = transformedPost;
        this.postsUpdated.next([...this.posts]);
      });

    // return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };

    this.http
      .post<{
        message: 'message from node';
      }>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        console.log(responseData.message);

        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: string) {
    // const post: Post = { id: null, title: title, content: content };

    this.http
      .delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        console.log("deleted !");

        const updatedPosts = this.posts.filter( post => post.id !== postId);
        this.posts = updatedPosts;

        // this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }


}
