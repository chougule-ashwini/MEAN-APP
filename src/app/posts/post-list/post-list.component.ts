import { Component, Input } from '@angular/core';
import { Post } from '../post.model';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {
    /* posts=[
        {title:'first post',content:'This is first post'},
        {title:'second post',content:'This is second post'},
        {title:'third post',content:'This is third post'}
    ]; */
    @Input() posts: Post[] = [];
}