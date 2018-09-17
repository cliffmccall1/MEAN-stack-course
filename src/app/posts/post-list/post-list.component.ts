import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  // posts = [
  //   { title: 'First Post', content: 'this is the first post content' },
  //   { title: 'Second Post', content: 'this is the second post content' },
  //   { title: 'Third Post', content: 'this is the third post content' }
  // ];
  posts: Post[] = [];
  private postsSub: Subscription;


  constructor(public postsService: PostsService) { }

  ngOnInit() {
    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListenter().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
