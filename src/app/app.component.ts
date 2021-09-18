import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Post } from './posts/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private authServ: AuthService){

  }

  ngOnInit(): void {
    this.authServ.autoAuthUser();
  }

  // storedPosts: Post[] = [];

  // onPostAdded(post){
  //   this.storedPosts.push(post);
  // }



}
