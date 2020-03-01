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
  loadingUser = false;

  users$ = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userSubject.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      switchMap(userTag => this.userService.get(userTag, this.searchSegment))
    )
      .subscribe(result => {
        this.loadingUser = false;
        this.users$ = this.users$.concat(result);
      });
    this.onScroll();
  }

  onScroll() {
    window.onscroll = (ev) => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.loadingUser = true;
        this.searchSegment++;
        setTimeout(() => {
          this.userService.get(this.searchValue, this.searchSegment)
            .subscribe(result => {
              this.loadingUser = false;
              this.users$ = this.users$.concat(result);
            });
        }, 600);
      }
    };
  }

  onSearch(value) {
    this.loadingUser = true;
    this.searchValue = value;
    this.searchSegment = 1;
    this.users$ = [];
    this.getUsers(value);
  }

  getUsers(value) {
    this.userSubject.next(value);
  }
}
