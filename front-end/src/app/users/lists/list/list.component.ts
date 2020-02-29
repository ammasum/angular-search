import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() user;

  constructor() { }

  ngOnInit(): void {
  }

}
