import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductInfo } from 'src/app/models/product-info';

const API_KEY = '?key=ThisIsAnAPIKey'
const API_Auth = 'https://inlamningsuppgift20220422132349.azurewebsites.net/api/Products/'

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
  console.log('update Product')  
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
