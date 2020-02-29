import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { UserService } from '../../../_service/user.service'

@Component({
  selector: 'user-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  private userSubject = new Subject();

  users = this.userSubject.pipe(
    debounceTime(250),
    distinctUntilChanged(),
    switchMap(userTag => this.userService.get(userTag))
  );

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  searchUsers(value) {
    this.userSubject.next(value);
  }
}
