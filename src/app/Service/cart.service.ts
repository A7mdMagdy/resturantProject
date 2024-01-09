import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { PizzaService } from './pizza.service';
import { ProductCRUDService } from './product-crud.service';
import { Cart } from '../Interface/cart';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:3000/cartItems';

  constructor(private http: HttpClient, private pizzaService:ProductCRUDService) { }
  
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
getItemById(itemId: number) {
  const url = `${this.apiUrl}/${itemId}`;

  return this.http.get<Cart>(url).pipe(switchMap(cartdata=>{
    return this.pizzaService.getonepizza(itemId).pipe(map(data=>{
      return {...data,...cartdata}
    }))
  }));
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
}
