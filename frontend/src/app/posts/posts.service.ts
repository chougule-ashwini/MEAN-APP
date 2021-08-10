import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { observable, Subject } from 'rxjs';

// 'root' will help you to register at root level without registering in app.module
//@Injectable({ providedIn: 'root' })
export class PostsService {
    private posts: Post[] = [];
    private postUpdated = new Subject<Post[]>();

    getPosts() {
        // 1.here spread operator will help to not affect original value
        // 2. We require event emmiter to update the posts 'rxjs'
        return [...this.posts];
    }

    addPost(title: string, content: string) {
        const post = {
            title: title,
            content: content
        }
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
    }

    getPostUpdateListner() {
        return this.postUpdated.asObservable();
    }
}