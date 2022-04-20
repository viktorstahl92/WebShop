import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/models/user-info';
import { TokenStorageService } from 'src/services/token-storage.service';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';
import { ProductInfo } from 'src/app/models/product-info';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService, private userService: UserService, private route: Router
    ,private productService: ProductService) { }

  user?: UserInfo;
  isAdmin = false;
  showUsers = false;
  showProducts = false;
  users?: UserInfo[];
  products?: ProductInfo[];


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
    if (!this.users) {
        this.productService.getAllProducts().subscribe((response: ProductInfo[]) =>{
          this.products = response;
        })
    }
  }

  deleteUser(id:number){
    console.log(id);
    this.userService.deleteUser(id).subscribe((response: any) =>{
      console.log("Am i deleted?")
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
