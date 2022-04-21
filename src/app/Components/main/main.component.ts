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

}
