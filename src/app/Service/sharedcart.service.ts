import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Cart } from '../Interface/cart';

@Injectable({
  providedIn: 'root'
})
export class SharedcartService {
  private cartItemsSubject: BehaviorSubject<Cart[]> = new BehaviorSubject<Cart[]>([]);

  updateCartItems(cartItems: Cart[]): void {
    this.cartItemsSubject.next(cartItems);
  }
  get cartItems$() {
    return this.cartItemsSubject.asObservable();
  }

}
