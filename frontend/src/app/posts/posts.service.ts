import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// 'root' will help you to register at root level without registering in app.module
//@Injectable({ providedIn: 'root' })
@Injectable()
export class PostsService {
    private posts: Post[] = [];
    private postUpdated = new Subject<Post[]>();
    constructor(private http: HttpClient) { }
    getPosts() {
        // 1.here spread operator will help to not affect original value
        // 2. We require event emmiter to update the posts 'rxjs'
        this.http.get<{ message: string, posts: Post[] }>('http://localhost:3000/api/posts').subscribe((data) => {
            this.posts = data.posts;
            this.postUpdated.next([...this.posts]);
        });
    }

    addPost(title: string, content: string) {
        const post = {
            id: '',
            title: title,
            content: content
        }
        this.http.post<{ message: string }>('http://localhost:3000/api/post', post).subscribe((res) => {
            console.log(res.message);
            this.posts.push(post);
            this.postUpdated.next([...this.posts]);
        });
    }

    getPostUpdateListner() {
        return this.postUpdated.asObservable();
    }
}