import { Component, OnInit } from '@angular/core';
import { OrderInfo } from 'src/app/models/order-info';
import { ProductInfo } from 'src/app/models/product-info';
import { UserInfo } from 'src/app/models/user-info';
import { OrderService } from 'src/services/order.service';
import { ProductService } from 'src/services/product.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent implements OnInit {

  constructor(private productService: ProductService, private userService:UserService, private orderService: OrderService) { }

  showUsers = false;
  showProducts = false;
  showOrders = false;
  users?: UserInfo[];
  products?: ProductInfo[];
  orders?: OrderInfo[];

  ngOnInit(): void {
  }

  toggleAllUsers() {
    this.showUsers = !this.showUsers;
    if (!this.users) {
        this.userService.getAllUsers().subscribe((response: UserInfo[]) =>{
          this.users = response;
        })
    }
  }

  toggleAllProducts(){
    this.showProducts = !this.showProducts;
    if (!this.products) {
        this.productService.getAllProducts().subscribe((response: ProductInfo[]) =>{
          this.products = response;
        })
    }
  }

  toggleAllOrders(){
    this.showOrders = !this.showOrders;
    if (!this.orders) {
      this.orderService.getAllOrders().subscribe((response: OrderInfo[]) =>{
        this.orders = response;
      })
    }
  }

  deleteUser(id:number){
    if (!confirm("Är du säker på att du vill ta bort användaren?")) return
    this.userService.deleteUser(id).subscribe((response: any) =>{
      this.userService.getAllUsers().subscribe((response: UserInfo[]) =>{
        this.users = response;
      })
    });
  }

  deleteOrder(id:number){
    if (!confirm("Är du säker på att du vill ta bort ordern?")) return
    this.orderService.deleteOrder(id).subscribe((response: any) =>{
      this.orderService.getAllOrders().subscribe((response: OrderInfo[]) =>{
        this.orders = response;
      })
    });
  }
  

  deleteProduct(id:number){
    if (!confirm("Är du säker på att du vill ta bort produkten?")) return
    this.productService.deleteProduct(id).subscribe((response: any) =>{
      this.productService.getAllProducts().subscribe((response: ProductInfo[]) =>{
        this.products = response;
      })
    });
  }

}
