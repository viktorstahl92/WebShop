import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  form: any = {
    productName: null,
    productNumber: null,
    productDescription: null,
    productPrice: null,
    category: null,
  };

  isAddFailed = false;
  isSuccessful = false;
  errorMessage = '';


  constructor(private productService: ProductService, private route: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const { productName, productNumber, productDescription, productPrice, category } = this.form;
    this.productService.postProduct(productName, productNumber, productDescription, productPrice, category).subscribe
      (data =>{
        console.log(data)
    this.route.navigate(['/', 'main']);

      },
      err =>{
        console.log(err.error);
        this.errorMessage = err.error;
      })
  }

}
