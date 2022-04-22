import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderInfo } from 'src/app/models/order-info';
import { OrderService } from 'src/services/order.service';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss']
})
export class OrderInfoComponent implements OnInit {

  order?: OrderInfo
  id?: number
  errorMessage?: string

  constructor(private orderService: OrderService, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.actRoute.params.subscribe(params => {
      console.log(+params['id'])
      this.getOrder(+params['id']);
      this.id = (+params['id']);
    })
  }

  getOrder(id: number) {
    this.orderService.getOrder(id).subscribe((res) => {
      if (res) {
        this.order = res;
      };
    },
      err => {
        this.errorMessage = err.error;
      })
  }
}
