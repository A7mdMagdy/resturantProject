import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  private apiUrl = 'http://localhost:3000/cartItems';
  constructor() { }
   //Using BehaviorSubject
   private dataSubject = new BehaviorSubject<any>(null);
   data$: Observable<any> = this.dataSubject.asObservable();
   sendData(data: any) {
    //  console.log(data[0].quantity)
     this.dataSubject.next(data);
   }

   getData(): Observable<any> {
    console.log(this.dataSubject.asObservable()+"from return getData()")
    return this.dataSubject.asObservable();
  }
  getItems() {
    // return this.http.get(this.apiUrl);
  }
}
