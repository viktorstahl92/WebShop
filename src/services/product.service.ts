import { NumberFormatStyle } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewProduct } from 'src/app/models/new-product';
import { ProductInfo } from 'src/app/models/product-info';

const API_KEY = '?key=ThisIsAnAPIKey'
const API_Auth = 'https://localhost:7129/api/Products/'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts():Observable<ProductInfo[]>{
    return this.http.get<ProductInfo[]>(API_Auth + API_KEY)
  }

  getProduct(id:number):Observable<ProductInfo>{
    return this.http.get<ProductInfo>(API_Auth + id + API_KEY)
  }

  postProduct(productName:string, productNumber:number, productDescription: string, productPrice: number, category:string) : Observable<any>{
    return this.http.post(API_Auth + API_KEY ,{
      productName,
      productNumber,
      productDescription,
      productPrice,
      category
    }, {responseType: 'json'});
  }

 updateProduct(id:number,productName:string, productNumber:number, productDescription: string, productPrice: number, category:string) : Observable<any>{
    return this.http.put(API_Auth + id + API_KEY ,{
      productName,
      productNumber,
      productDescription,
      productPrice,
      category
    }, {responseType: 'json'});
  }

  deleteProduct(id:number):Observable<any>{
    return this.http.delete(API_Auth + id + API_KEY)
  }

}
