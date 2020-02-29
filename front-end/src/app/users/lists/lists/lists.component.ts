import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'user-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  private userSubject = new Subject();

  users = this.userSubject.pipe(

  );

  constructor() { }

  ngOnInit(): void {
  }

  searchUsers(value) {
    
  }
}
