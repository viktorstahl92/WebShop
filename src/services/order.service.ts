import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { OrderInfo } from 'src/app/models/order-info';

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
}
