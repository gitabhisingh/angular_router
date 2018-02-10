import { Component } from '@angular/core';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'user',
  template: `
    <h1>Hello {{name}}</h1>
    <p><strong>Email: </strong>{{email}}</p>
    <p><strong>Address: </strong>{{address.street}} {{address.city}}, {{address.state}}</p>
    <button (click)="toggleHobbies()">{{showHobbies ? 'Hide' : 'Show'}} Hobbies</button>
    <div *ngIf="showHobbies">
        <h3>Hobbies:</h3>
        <ul>
            <li *ngFor="let hobby of hobbies; let i = index">
                {{hobby}} <button (click)="deleteHobby(i)">x</button>
            </li>
        </ul>
        <form (submit)="addHobby(hobby.value)">
            <label>Add Hobby: </label>
            <input type="text" #hobby />
        </form>
    </div>
    <h3>Edit User Details</h3>
    <form>
        <label>Name: </label>
        <input type="text" name="name" [(ngModel)]="name" /><br />
        <label>E-Mail: </label>
        <input type="text" name="email" [(ngModel)]="email" /><br />
        <label>Street: </label>
        <input type="text" name="street" [(ngModel)]="address.street" /><br />
        <label>City: </label>
        <input type="text" name="city" [(ngModel)]="address.city" /><br />
        <label>State: </label>
        <input type="text" name="state" [(ngModel)]="address.state" /><br />
    </form>
    <hr />
    <h3>Posts</h3>
    <div *ngFor="let post of posts">
        <h3>{{post.title}}</h3>
        <p>{{post.body}}</p>
    </div>
    `,
    providers: [PostsService]
})
export class UserComponent{ 
  name: string;
  email: string;
  address: address;
  hobbies: string[];
  showHobbies: boolean;
  posts: Post[];

  constructor(private postsService: PostsService){
    this.name = 'John';
    this.email = 'john@gmail.com';
    this.address = {
      street: '12',
      city: 'Boston',
      state: 'MA'
    }
    this.hobbies = ['Music', 'Movies', 'Sports'];
    this.showHobbies = false;

    this.postsService.getPosts().subscribe(posts => {
        this.posts = posts;
    })
  }

  toggleHobbies(){
      if(this.showHobbies == true){
        this.showHobbies = false;
      } else{
        this.showHobbies = true;
      }
  }
  addHobby(hobby){
      this.hobbies.push(hobby);
  }
  deleteHobby(i){
      this.hobbies.splice(i, 1);
  }
}

interface address {
    street: string;
    city: string;
    state: string;
}

interface Post{
    id: number;
    title: string;
    body: string;
}