import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  baseUrl="http://localhost:3000/productList/";
  postProduct(data:any){
    return this.http.post<any>(this.baseUrl,data);
  }

  getProduct(){
    return this.http.get<any>(this.baseUrl);
  }
}
