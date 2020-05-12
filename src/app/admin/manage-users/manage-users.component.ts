import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AdminService } from '../admin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: User[] = [];
  userSubscription: Subscription;
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getUsers();
    this.adminService.getUpdatedUsersList().subscribe( (userData) => {
      this.users = userData;
      console.log(this.users);
    });
  }

  deleteUser(userId) {
    this.adminService.deleteUser(userId);
  }

}
