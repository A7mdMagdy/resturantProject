import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  constructor(private pizzaClient:HttpClient) { }
  pizza_URL = "http://localhost:3000/Piza";

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
}