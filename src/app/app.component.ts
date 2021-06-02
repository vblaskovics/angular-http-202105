import { Component, OnInit } from '@angular/core';
import { User } from './user/user';
import { UserService } from './user/user.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-http';

  user: User;
  users: User[];
  username: string;
  id: string;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser('1').subscribe(
      (res) => {
        this.user = res[0];
      },
      (err) => {
        this.userService.handleError(err);
      }
    );

    this.userService.getUsers()
      .pipe(
        tap((res) => console.log('getUser response here!', res))
      )
      .subscribe(
      (res) => {
        this.users = res;
      },
      (err) => {
        this.userService.handleError(err);
      }
    );
  }
}
