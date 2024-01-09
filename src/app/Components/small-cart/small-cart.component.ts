import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from '../../Service/cart.service';
import { Cart } from '../../Interface/cart';
import { OperationService } from '../../Service/operation.service';
import { CartItemComponent } from '../cart-item/cart-item.component';


@Component({
  selector: 'app-small-cart',
  standalone: true,
  imports: [CommonModule,RouterOutlet,  HttpClientModule,RouterModule,CartItemComponent], 
  providers:[CartService],
  templateUrl: './small-cart.component.html',
  styleUrl: './small-cart.component.css'
})
export class SmallCartComponent implements OnInit,OnChanges{
  cartItems: Cart[]
  totalAmount: number = 0;
  @Input() updateQuantity:any
  updateQuantityEmit:any
  @Output() qunatityArr=new EventEmitter();
  receive:any
  qunatity_Arr: any
  id:any
  newquantity:any
  //receive data from behaviorSubject
  receivedData: any[] = [];
  constructor(private cartService: CartService,private operationService:OperationService)
  {
    this.cartItems=[]
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.updateQuantity)
    this.cartService.getItems().subscribe(
      {
        next:(data:any)=>
        {
          // console.log(data+"ngOnChangesssssss")
          this.cartItems=data
          this.calculateTotalAmount();
        }
      }
    )
  
  }
  
  ngOnInit(): void {
    this.cartService.getItems().subscribe(
      {
        next:(data:any)=>
        {
          this.cartItems=data
          this.calculateTotalAmount();
        },
        error:()=>{console.log("0");}
      }
    )
  }
  toggleButton(item: any) {
    this.decrementItem(item);
  }

  // Function to check if the cart is empty
  isEmpty(): boolean {
    return this.cartItems?.length === 0;
  }
  // Function to increment the quantity of an item
  incrementItem(item: any): void {
    let newQ=++item.quantity;
    this.cartService.updateCartItemQuantity(item.id,newQ).subscribe();
    // Add any logic to update the total price, etc.
    // this.calculateTotalAmount();
    this.cartService.getItems().subscribe({
      next:(data)=>{this.updateQuantityEmit=data
        this.qunatityArr.emit(this.updateQuantityEmit[0])
      }
    })
  }

  // Function to decrement the quantity of an item
  decrementItem(item: any): void {

    if(item.quantity>1)
    {
      let newQ=--item.quantity;
      this.cartService.updateCartItemQuantity(item.id,newQ).subscribe()
      this.cartService.getItems().subscribe({
        next:(data)=>{this.updateQuantityEmit=data
          this.qunatityArr.emit(this.updateQuantityEmit[0])
        }
      })

    }
    else if(item.quantity==1){
      let newQ=--item.quantity;
      this.cartService.updateCartItemQuantity(item.id,newQ).subscribe()
      this.cartService.getItems().subscribe({
        next:(data)=>{this.updateQuantityEmit=data
          // console.log(this.updateQuantityEmit[0].quantity+"from item.quantity==1 and decrementItem")
          this.qunatityArr.emit(this.updateQuantityEmit[0])
          // console.log(this.updateQuantityEmit[0].quantity+"from item.quantity==1 and decrementItem")
        }
      })
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