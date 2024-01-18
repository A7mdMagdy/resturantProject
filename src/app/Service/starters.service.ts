import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StartersService {

  constructor(private starters:HttpClient) {}
  starters_URL="https://pizza-34619-default-rtdb.firebaseio.com/Starters.json";

  getAllStarters()
  {
    return this.starters.get(this.starters_URL)
  }
  getStartersByID(id:number)
  {
    return this.starters.get(this.starters_URL+'/'+id)
  }
  addNewStarters(newStd:any){
    return this.starters.post(this.starters_URL,newStd);
  }
  deleteStartersByID(id:number)
  {
    return this.starters.delete(this.starters_URL+'/'+id)
  }
  updateStarters(id:number,obj:any)
  {
    return this.starters.patch(this.starters_URL+'/'+id,obj);
  }
}
