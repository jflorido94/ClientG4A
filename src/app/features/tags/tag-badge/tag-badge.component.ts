import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tag-badge',
  templateUrl: './tag-badge.component.html',
  styleUrls: ['./tag-badge.component.scss']
})
export class TagBadgeComponent implements OnInit {

  @Input() tag: any

  constructor() { }

  ngOnInit(): void {
  }

}
