import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  // posts = [
  //   { title: '1', content: 'a' },
  //   { title: '2', content: 'b' },
  //   { title: '3', content: 'c' },
  // ];

  @Input() posts = [];

  constructor() {}

  ngOnInit(): void {}
}
