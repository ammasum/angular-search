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
  private searchSegment = 0;
  private searchValue: string;

  users$ = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userSubject.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      switchMap(userTag => this.userService.get(userTag, this.searchSegment))
    )
      .subscribe(result => {
        this.users$ = this.users$.concat(result);
      });
    window.onscroll = (ev) => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.searchSegment++;
        this.userService.get(this.searchValue, this.searchSegment)
          .subscribe(result => {
            this.users$ = this.users$.concat(result);
          });
      }
    };
  }

  onSearch(value) {
    this.searchValue = value;
    this.searchSegment = 1;
    this.users$ = [];
    this.getUsers(value);
  }

  getUsers(value) {
    this.userSubject.next(value);
  }
}
