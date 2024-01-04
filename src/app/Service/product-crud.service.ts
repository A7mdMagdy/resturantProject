import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPizza } from '../Interface/ipizza';

@Injectable({
  providedIn: 'root'
})
export class ProductCRUDService {
  constructor(private http:HttpClient) { }
  private DB_URL = "http://localhost:3000/piza";
  
  getallpizza(){
    return this.http.get(this.DB_URL);
  }

  getonepizza(id:number){
    return this.http.get(this.DB_URL+"/"+id)
  }

  addpizza(data:any){
    return this.http.post(this.DB_URL,data);
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
}
