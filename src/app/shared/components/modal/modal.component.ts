import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() show: boolean = false;
  @Input() title: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
