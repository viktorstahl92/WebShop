import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-change-product',
  templateUrl: './change-product.component.html',
  styleUrls: ['./change-product.component.scss']
})
export class ChangeProductComponent implements OnInit {
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
  id?: number;

  constructor(private productService: ProductService, private route: Router, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.actRoute.params.subscribe(params => {
      console.log(+params['id'])
      this.getProduct(+params['id']);
      this.id = (+params['id']);
    })
  }

  onSubmit() {
    if (!this.id) return
    const { productName, productNumber, productDescription, productPrice, category } = this.form;
    this.productService.updateProduct(this.id, productName, productNumber, productDescription, productPrice, category).subscribe
      (data => {
        console.log(data)
        this.route.navigate(['/', 'main']);

      },
        err => {
          console.log(err.error);
          this.errorMessage = err.error;
        })
  }

  getProduct(id: number) {
    this.productService.getProduct(id).subscribe((product) => {
      if (product) {
        console.log(product)
        this.form.productName = product.productName;
        this.form.productNumber = product.productNumber
        this.form.productDescription = product.productDescription
        this.form.productPrice = product.productPrice
        this.form.category = product.category
      };
    },
    err =>{
      this.route.navigate(['/', 'main']);
    });
  }

}
