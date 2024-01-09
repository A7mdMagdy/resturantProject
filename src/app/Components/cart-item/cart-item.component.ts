import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../Service/cart.service';
import { Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent implements OnInit {
@Input() itemId:any
item:any
constructor (private cartService:CartService){}
  ngOnInit(): void {
    this.cartService.getItemById(this.itemId).subscribe(data=>{
      this.item=data
    })
  }

  incrementItem(item: any): void {
    let newQ=++item.quantity;
    this.cartService.updateCartItemQuantity(item.id,newQ).subscribe();
    // Add any logic to update the total price, etc.
    // this.calculateTotalAmount();
   
  }
  toggleButton(item: any) {
    this.decrementItem(item);
  }
  decrementItem(item: any): void {

    if(item.quantity>1)
    {
      let newQ=--item.quantity;
      this.cartService.updateCartItemQuantity(item.id,newQ).subscribe()
     

    }
    else if(item.quantity==1){
      let newQ=--item.quantity;
      this.cartService.updateCartItemQuantity(item.id,newQ).subscribe()
    
      this.cartService.removeItemFromOrder(item.id).subscribe()
    
    }
    
    
  }
}
