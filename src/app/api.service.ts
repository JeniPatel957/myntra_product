import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

const localUrl = 'assets/data/db.json';
@Injectable({
  providedIn: 'root'

})
export class ApiService {
 

  constructor(private http: HttpClient) { }
  productSearch = new Subject<any>();

  getdata() {
    return this.http.get("https://my-json-server.typicode.com/jemin136/jsonplaceholderdemo/products");
  }

  setSearchData(data: any) {
    this.productSearch.next(data)
  }
 
  getSearchData(): Observable<any> {
    return this.productSearch.asObservable();
  }

}
