import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderInfo, OrderRow } from 'src/app/models/order-info';
import { ProductInfo } from 'src/app/models/product-info';
import { OrderService } from 'src/services/order.service';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.scss']
})
export class UpdateOrderComponent implements OnInit {

  id?: number
  errorMessage?: string;
  form: any = {
    address: null,
    customerName: null,
    orderStatus: null,
  };
  cart?: OrderRow[] = [];
  products?: ProductInfo[]
  orderInfo? : OrderInfo;


  constructor(private orderService: OrderService, private actRoute: ActivatedRoute, private route: Router,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.actRoute.params.subscribe(params => {
      console.log(+params['id'])
      this.getOrder(+params['id']);
      this.id = (+params['id']);
    })

    this.productService.getAllProducts().subscribe((response: ProductInfo[]) => {
      this.products = response;
    })
  }

  getOrder(id: number) {
    this.orderService.getOrder(id).subscribe((order) => {
      if (order) {
        console.log(order)
        this.form.address = order.address
        this.form.customerName = order.customerName
        this.form.orderStatus = order.orderStatus

        order.orderRows.forEach(x => this.cart?.push(x))
        this.orderInfo = order;
      };
    },
      err => {
        this.route.navigate(['/', 'main']);
      });
  }

  addToCart(newItem: OrderRow) {
    if (!this.cart) {
      this.cart = [
        newItem
      ]
      return;
    }
    const item = this.cart.find(x => x.productNumber == newItem.productNumber)

    if (item) item.quantity++;
    if (!item) this.cart.push(newItem);
  }

  total(): number {
    if (!this.cart) return 0

    return this.cart.reduce((acc, item) => {
      return acc + item.quantity * item.productPrice;
    }, 0)
  }

  confirmOrder() {
    if (!this.orderInfo || !this.cart) return
    const { customerName, address, orderStatus} = this.form;

      this.orderInfo.address = this.form.address
      this.orderInfo.customerName = this.form.customerName
      this.orderInfo.orderStatus = this.form.orderStatus
      this.orderInfo.orderRows = this.cart

      console.log(this.orderInfo)

      this.orderService.putOrder(this.orderInfo).subscribe
      (data => {
        console.log(data)
        this.route.navigate(['/', 'main']);

      },
        err => {
          console.log(err.error);
          this.errorMessage = err.error;
        })
  }

  removeQuantity(productNumber: number) {
    if (!this.cart) return
    const item = this.cart.find(x => x.productNumber == productNumber)

    if (!item) return
    item.quantity--

    if (item.quantity < 1) {
      item.quantity = 0;
    }

  }

  addQuantity(productNumber: number) {
    if (!this.cart) return
    const item = this.cart.find(x => x.productNumber == productNumber)

    if (!item) return
    item.quantity++

  }
}

