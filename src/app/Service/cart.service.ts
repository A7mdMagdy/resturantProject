import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'https://pizza-34619-default-rtdb.firebaseio.com/Admin.json';
  private baseUrl = 'https://pizza-34619-default-rtdb.firebaseio.com/Admin';

  constructor(private http: HttpClient) { }
  
  private cartItems: any[] = [];

  saveCartItems(cartItems: any){

  //   const orderId = new Date().getTime().toString();
  // const orderData = {
  //   id: orderId,
  //   Products: cartItems,
  // };
    //return this.http.post(this.apiUrl, {cartItems});
    return this.http.post(this.apiUrl, cartItems);
}


getItems(){
  return this.http.get(this.apiUrl);
}
getItemById(itemId: number): Observable<any> {
  const url = `${this.apiUrl}/${itemId}`;
  return this.http.get(url);
}
// saveOrder() {
//   // Assume you have a backend API to save the order to
//   // You can use HttpClient to send a request to your backend
//   // Replace 'your-api-endpoint' with the actual endpoint
//   // const apiEndpoint = 'http://localhost:3000/cartItems';
//   // return this.http.post(apiEndpoint, this.cartItems);
// }

removeItemFromOrder(Id: number): Observable<any> {
  const url = `${this.apiUrl}/${Id}`;
  return this.http.delete(url);
}


calculateTotalAmount(): number {
  return this.cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
}

updateCartItemQuantity(id: number, newQuantity: number): Observable<any> {
  return this.http.patch(this.apiUrl+"/"+id, { quantity: newQuantity });
}
updateCartItem(itemId: number, updatedItem: any): Observable<any> {
  const url = `${this.apiUrl}/${itemId}`;
  return this.http.put(url, updatedItem);
}

  removeAllData(): Observable<void> {
    return this.http.delete<void>(this.apiUrl);
  }

  saveCartItems2(key:string,cartItems: any){

    //   const orderId = new Date().getTime().toString();
    // const orderData = {
    //   id: orderId,
    //   Products: cartItems,
    // };
      //return this.http.post(this.apiUrl, {cartItems});
      return this.http.patch(this.baseUrl+'/'+key+'.json', cartItems);
  }
  afterDeleteItem(cartItems: any[]){

    //   const orderId = new Date().getTime().toString();
    // const orderData = {
    //   id: orderId,
    //   Products: cartItems,
    // };
      //return this.http.post(this.apiUrl, {cartItems});
      return this.http.put(this.apiUrl, cartItems);
  }

  removeItemFromOrder2(key:string){
    
    return this.http.delete(this.baseUrl+'/'+key+'.json');
  }
  
}
