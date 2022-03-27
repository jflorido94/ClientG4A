import { Product } from './../interfaces/product';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;

  constructor(private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  makeTrustedImage(item: any) {
    const imageString = JSON.stringify(item).replace(/\\n/g, '');
    const style = 'url(' + imageString + ')';
    return this.domSanitizer.bypassSecurityTrustStyle(style);
  }
}
