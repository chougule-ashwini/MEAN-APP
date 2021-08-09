import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {
    enteredTitle = '';
    enteredContent = '';
    @Output() postCreated = new EventEmitter<Post>();

    onCreatePost(form: NgForm) {
        if (form.invalid)
            return;
        const post: Post = {
            title: form.value.title,
            content: form.value.content
        };
        //to pass data to another component we need to emit the value with EventEmitter.
        //which can listen from outside. So we add @Output() decorator.
        this.postCreated.emit(post);
    }
}