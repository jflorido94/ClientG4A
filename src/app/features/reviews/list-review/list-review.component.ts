import { Review } from './../interfaces/review';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-review',
  templateUrl: './list-review.component.html',
  styleUrls: ['./list-review.component.scss']
})
export class ListReviewComponent implements OnInit {

  list! : Review[];

  constructor() { }

  ngOnInit(): void {
  }

}
