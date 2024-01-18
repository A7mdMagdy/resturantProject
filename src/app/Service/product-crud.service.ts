import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPizza } from '../Interface/ipizza';
import { Cart } from '../Interface/cart';

@Injectable({
  providedIn: 'root'
})
export class ProductCRUDService {
  constructor(private http:HttpClient) { }
  private DB_URL = "https://pizza-34619-default-rtdb.firebaseio.com/Piza.json";
  private base_URL = "https://pizza-34619-default-rtdb.firebaseio.com/Piza";
  
  getallpizza(){
    return this.http.get(this.DB_URL);
  }

  getonepizza(id:number){
    return this.http.get(this.DB_URL+"/"+id)
  }

  addpizza(key:string,data:any){
    return this.http.post(this.base_URL+'/'+key+'.json',data);
  }

  delpizza(id:number){
    return this.http.delete(this.DB_URL+"/"+id);
  }

  filtersizepizza(s:string){
    return this.http.get(this.DB_URL+"/"+s);
  }

  updatePizza(id:number,obj:any)
  {
    return this.http.patch(this.DB_URL+'/'+id,obj);
  }
  updatePizza2(key:string,data:Cart)
  {
    return this.http.patch(this.base_URL+'/'+key+'.json',data);
  }
  updateItem(key:string,updatedItem: any){

    //   const orderId = new Date().getTime().toString();
    // const orderData = {
    //   id: orderId,
    //   Products: cartItems,
    // };
      //return this.http.post(this.apiUrl, {cartItems});
      return this.http.patch(this.base_URL+'/'+key+'.json', updatedItem);
  }
  afterDeleteItem(cartItems: any[]){

    //   const orderId = new Date().getTime().toString();
    // const orderData = {
    //   id: orderId,
    //   Products: cartItems,
    // };
      //return this.http.post(this.apiUrl, {cartItems});
      return this.http.put(this.DB_URL, cartItems);
  }
}
