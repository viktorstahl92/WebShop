import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from 'src/app/models/user-info';

const API_KEY = '?key=ThisIsAnAPIKey'
const API_Auth = 'https://inlamningsuppgift20220422132349.azurewebsites.net/api/Users/'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getCurrentUserInfo():Observable<UserInfo>{
    return this.http.get<UserInfo>(API_Auth + 'LoggedInUser' + API_KEY);
  }

  getAllUsers():Observable<UserInfo[]>{
    return this.http.get<UserInfo[]>(API_Auth + API_KEY)
  }

  getUser(id:number):Observable<UserInfo>{
    return this.http.get<UserInfo>(API_Auth + id + API_KEY)
  }

  deleteUser(id:number):Observable<any>{
    return this.http.delete(API_Auth + id + API_KEY)
  }

  updateUser(id:number, address: string, city: string, postalCode:string, email:string, firstName:string, lastName:string, role:string){
    return this.http.put(API_Auth + id + API_KEY,{
      firstName,
      lastName,
      email,
      address,
      city,
      postalCode,
      role
    })
  }
}
