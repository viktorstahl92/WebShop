import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/models/user-info';
import { TokenStorageService } from 'src/services/token-storage.service';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';
import { ProductInfo } from 'src/app/models/product-info';
import { OrderService } from 'src/services/order.service';
import { OrderInfo } from 'src/app/models/order-info';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService, private userService: UserService, private route: Router
    ,private productService: ProductService, private orderService: OrderService) { }

  user?: UserInfo;
  isAdmin = false;
  showUsers = false;
  showProducts = false;
  showOrders = false;
  users?: UserInfo[];
  products?: ProductInfo[];
  orders?: OrderInfo[];


  ngOnInit(): void {
    this.checkToken();
  }


  checkToken() {
    if (this.tokenStorage.getToken()) {
      this.userService.getCurrentUserInfo().subscribe((response: UserInfo) => {
        this.user = response;
        if (response.role == "Admin")
          this.isAdmin = true;
      })
    }
    else {
      this.route.navigate(['/', 'overview']);
    }
  }

  logOut(){
    this.tokenStorage.signOut();
    this.route.navigate(['/', 'overview']);
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
    console.log(id);
    this.userService.deleteUser(id).subscribe((response: any) =>{
      this.userService.getAllUsers().subscribe((response: UserInfo[]) =>{
        this.users = response;
      })
    });
  }

  deleteProduct(id:number){
    console.log(id);
    this.productService.deleteProduct(id).subscribe((response: any) =>{
      this.productService.getAllProducts().subscribe((response: ProductInfo[]) =>{
        this.products = response;
      })
    });
  }

}
