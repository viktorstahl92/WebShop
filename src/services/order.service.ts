import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { OrderInfo, OrderRow } from 'src/app/models/order-info';

const API_KEY = '?key=ThisIsAnAPIKey'
const API_Auth = 'https://localhost:7129/api/Orders/'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAllOrders():Observable<OrderInfo[]>{
    return this.http.get<OrderInfo[]>(API_Auth + API_KEY)
  }

  getOrder(id:number):Observable<OrderInfo>{
    return this.http.get<OrderInfo>(API_Auth + id + API_KEY)
  }

  getLoggedInOrders():Observable<OrderInfo[]>{
    return this.http.get<OrderInfo[]>(API_Auth + 'LoggedInOrders' + API_KEY)
  }
  
  postOrder(cartItems : OrderRow[]):Observable<OrderInfo>{
    return this.http.post<OrderInfo>(API_Auth + API_KEY,
        cartItems);
  }

  putOrder(orderInfo : OrderInfo):Observable<OrderInfo>{
    console.log("putOrder")
    return this.http.put<OrderInfo>(API_Auth + orderInfo.orderId + API_KEY,
        orderInfo);
  }

  deleteOrder(id:number):Observable<any>{
    return this.http.delete(API_Auth + id + API_KEY)
  }

}
