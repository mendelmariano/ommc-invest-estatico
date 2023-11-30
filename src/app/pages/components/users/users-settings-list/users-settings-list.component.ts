import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/pages/shareds/models/user.model';
import { AuthServiceService } from '../../auth/auth-service.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-settings-list',
  templateUrl: './users-settings-list.component.html',
  styleUrls: ['./users-settings-list.component.scss']
})
export class UsersSettingsListComponent implements OnInit, OnDestroy {

  user: User = new User();
  loggedInUser: User;
  myUser: Subscription;

  constructor(
    private messageService: MessageService,
    private router: Router,
    private authService: AuthServiceService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.loadLoggedInUser();
  }

  ngOnDestroy(): void {
    if (this.myUser) {
      this.myUser.unsubscribe();
    }
  }

  loadLoggedInUser() {
    this.myUser = this.authService.getUser().pipe(
      switchMap((user: User) => this.userService.findUser(user.id))
    ).subscribe(
      (userDetail: User) => {
        this.loggedInUser = userDetail;
      }
    );
  }


}
