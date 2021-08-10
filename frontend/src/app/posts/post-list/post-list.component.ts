import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
    /* posts=[
        {title:'first post',content:'This is first post'},
        {title:'second post',content:'This is second post'},
        {title:'third post',content:'This is third post'}
    ]; */
    posts: Post[] = [];
    //use subscription object to remove subscriber whenver component job is finished.
    private postsSub!: Subscription;

    //used in dependancy injection
    constructor(public postsService: PostsService) { }


    ngOnInit() {
        //automatically called when component created
        this.postsService.getPosts();
        //subscribe takes 3 params - data emmited, error emmited, emmit complted
        this.postsSub = this.postsService.getPostUpdateListner().subscribe((posts: Post[]) => {
            this.posts = posts;
        });
    }
    ngOnDestroy() {
        //prevent memory leake and removes subscription
        this.postsSub.unsubscribe();
    }
}