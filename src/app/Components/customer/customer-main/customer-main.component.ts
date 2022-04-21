import { Component, OnInit } from '@angular/core';
import { OrderRow } from 'src/app/models/order-info';
import { ProductInfo } from 'src/app/models/product-info';
import { OrderService } from 'src/services/order.service';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-customer-main',
  templateUrl: './customer-main.component.html',
  styleUrls: ['./customer-main.component.scss']
})
export class CustomerMainComponent implements OnInit {

  constructor(private productService: ProductService, private orderService: OrderService) { }

  products?: ProductInfo[];
  cart?: OrderRow[];

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((response: ProductInfo[]) => {
      this.products = response;
    })
  }

  addToCart(newItem: OrderRow) {
    console.log('före return')



    if (!this.cart) {
      this.cart = [
        newItem
      ]
      return;
    }
    const item = this.cart.find(x => x.productNumber == newItem.productNumber)

    if (item) item.quantity++;
    if (!item) this.cart.push(newItem);

    console.log('efter return')

  }

  total(): number {
    if (!this.cart) return 0

    return this.cart.reduce((acc, item) => {
      return acc + item.quantity * item.productPrice;
    }, 0)
  }

  confirmOrder() {
    if (!this.cart || this.total() == 0) return    
    this.orderService.postOrder(this.cart).subscribe(data => {
      console.log(data)
    });
  }

  removeQuantity(productNumber: number) {
    if (!this.cart) return
    const item = this.cart.find(x => x.productNumber == productNumber)

    if (!item) return
    item.quantity--

    if (item.quantity == 0) {
      var index = this.cart.findIndex(x => x.productNumber == productNumber)
       this.cart.splice(index, 1)
    }

  }

  addQuantity(productNumber: number) {
    if (!this.cart) return
    const item = this.cart.find(x => x.productNumber == productNumber)

    if (!item) return
    item.quantity++

  }
}


