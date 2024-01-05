import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from '../../Service/cart.service';
import { Cart } from '../../Interface/cart';


@Component({
  selector: 'app-small-cart',
  standalone: true,
  imports: [CommonModule,RouterOutlet,  HttpClientModule,RouterModule], 
  providers:[CartService],
  templateUrl: './small-cart.component.html',
  styleUrl: './small-cart.component.css'
})
export class SmallCartComponent implements OnInit{
  cartItems: Cart[]
  totalAmount: number = 0;
  constructor(private cartService: CartService)
  {
    this.cartItems=[]
  }
  ngOnInit(): void {
    this.cartService.getItems().subscribe(
      {
        next:(data:any)=>
        {
          this.cartItems=data
          this.calculateTotalAmount();
        }
      }
    )
  }
  toggleButton(item: any) {
    this.decrementItem(item);
  }


  // Function to remove an item from the cart
  // removeItem(item: any){
  //   this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
  //   // Add any additional logic, such as updating total price, etc.
  //   this.calculateTotalAmount();
  // }
  // Function to check if the cart is empty
  isEmpty(): boolean {
    return this.cartItems.length === 0;
  }
  // Function to increment the quantity of an item
  incrementItem(item: any): void {
    let newQ=++item.quantity;
    this.cartService.updateCartItemQuantity(item.id,newQ).subscribe();
    // Add any logic to update the total price, etc.
    this.calculateTotalAmount();
    
  }

  // Function to decrement the quantity of an item
  decrementItem(item: any): void {
    // if (item.quantity > 1) {
    //   item.quantity--;
    //   // Add any logic to update the total price, etc.
    // } else {
    //   // Remove the item from the cart if its quantity is 1
    //   this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.productId);
    // }

    if(item.quantity>1)
    {
      let newQ=--item.quantity;
      this.cartService.updateCartItemQuantity(item.id,newQ).subscribe()

    }
    else if(item.quantity==1){
      this.cartService.removeItemFromOrder(item.id).subscribe()
      this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);

    }
    this.calculateTotalAmount();
  }



  // Function to handle continue shopping
  continueShopping(){
    for(let i = 0;i<this.cartItems.length;i++){
    this.cartService.saveCartItems(this.cartItems[i]).subscribe(
      {
      next:(response) => {
        console.log('Cart items saved successfully:', response);
        // this.router.navigate(['mycart']);
      },
      error:(error) => {
        console.error('Error saving cart items:', error);
      }
    }
    );
  }
  } 

  calculateTotalAmount(){
    this.totalAmount = this.cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  }
  calculateTotalQuantity(){
    return this.cartItems.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0);
  }
}