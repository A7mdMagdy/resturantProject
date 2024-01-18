import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  constructor(private pizzaClient:HttpClient) { }
  pizza_URL = "https://pizza-34619-default-rtdb.firebaseio.com/Piza.json";
  pizza_base_URL = "https://pizza-34619-default-rtdb.firebaseio.com/Piza";

  getAllPizza()
  {
    return this.pizzaClient.get(this.pizza_URL)
  }
  getPizzaByID(id:number)
  {
    return this.pizzaClient.get(this.pizza_URL+'/'+id)
  }
  addNewPizz(newStd:any){
    return this.pizzaClient.post(this.pizza_URL,newStd);
  }
  deletePizzaByID(id:number)
  {
    return this.pizzaClient.delete(this.pizza_URL+'/'+id)
  }
  updatePizza(id:number,obj:any)
  {
    return this.pizzaClient.patch(this.pizza_URL+'/'+id,obj);
  }
  getPizzaByID2(id:string)
  {
    return this.pizzaClient.get(this.pizza_base_URL+'/'+id+'.json')
  }
  afterDeleteItem(cartItems: any[]){

    //   const orderId = new Date().getTime().toString();
    // const orderData = {
    //   id: orderId,
    //   Products: cartItems,
    // };
      //return this.http.post(this.apiUrl, {cartItems});
      return this.pizzaClient.put(this.pizza_URL, cartItems);
  }
  updateItem(key:string,updatedItem: any){

    //   const orderId = new Date().getTime().toString();
    // const orderData = {
    //   id: orderId,
    //   Products: cartItems,
    // };
      //return this.http.post(this.apiUrl, {cartItems});
      return this.pizzaClient.patch(this.pizza_base_URL+'/'+key+'.json', updatedItem);
  }
}