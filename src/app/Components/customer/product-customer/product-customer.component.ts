import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderRow } from 'src/app/models/order-info';
import { ProductInfo } from 'src/app/models/product-info';

@Component({
  selector: 'app-product-customer',
  templateUrl: './product-customer.component.html',
  styleUrls: ['./product-customer.component.scss']
})
export class ProductCustomerComponent implements OnInit {

  constructor() {
    
   }

  @Output() AddToCartEmitter : EventEmitter<OrderRow> = new EventEmitter();

  @Input()
  product? : ProductInfo;

  orderRow? : OrderRow;

  ngOnInit(): void {
  }

  addToCart(){
    if (!this.product) return;

    this.orderRow = {
      productName: this.product.productName,
      productNumber: this.product.productNumber,
      productPrice: this.product.productPrice,
      quantity: 1
  }
    this.AddToCartEmitter.emit(this.orderRow);
  }

}
