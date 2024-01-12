import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from '../../Service/cart.service';
import { Cart } from '../../Interface/cart';
import { OperationService } from '../../Service/operation.service';


@Component({
  selector: 'app-small-cart',
  standalone: true,
  imports: [CommonModule,RouterOutlet,  HttpClientModule,RouterModule], 
  providers:[CartService],
  templateUrl: './small-cart.component.html',
  styleUrl: './small-cart.component.css'
})
export class SmallCartComponent implements OnInit,OnChanges{
  cartItems: Cart[]
  totalAmount: number = 0;
  @Input() receiveDataFromParent:any
  getItemFromData:any
  @Output() objectFromEventEmitter=new EventEmitter();
  receive:any
  qunatity_Arr: any
  id:any
  newquantity:any
  //receive data from behaviorSubject
  receivedData: any[] = [];

  // data from starters 
  @Input() receiveDataFromStarters:any

        //===================================================================================>>>>>>>
        //============================================================================================





  constructor(private cartService: CartService,private operationService:OperationService)
  {
    this.cartItems=[];
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.receiveDataFromParent)
    this.cartService.getItems().subscribe(
      {
        next:(data:any)=>
        {
          // console.log(data+"ngOnChangesssssss")
          this.cartItems=data;
          this.calculateTotalAmount();
          console.log(this.cartItems);
        }
      }
    )
  
  }
  
  // &&&&&&&&&&&&&&&&&&&&
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

  // &&&&&&&&&&&&&&&&&&&&

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
    // this.cartService.getItems().subscribe({
    //   next:(data)=>{this.getItemFromData=data
    //     this.objectFromEventEmitter.emit(this.getItemFromData[0])
    //   }
    // })
    this.cartService.getItemById(item.id).subscribe({
      next:(data)=>{
        this.getItemFromData=data
        console.log("increament")
        console.log(this.getItemFromData)
        this.objectFromEventEmitter.emit(this.getItemFromData)

        //===================================================================================>>>>>>>
        //============================================================================================
      }
    })
  }

  // Function to decrement the quantity of an item
  decrementItem(item: any): void {

    if(item.quantity>1)
    {
      let newQ=--item.quantity;
      this.cartService.updateCartItemQuantity(item.id,newQ).subscribe()
      this.cartService.getItemById(item.id).subscribe({
        next:(data)=>{
          this.getItemFromData=data
          this.objectFromEventEmitter.emit(this.getItemFromData)
        }
      })

    }
    else if(item.quantity==1){
      let newQ=--item.quantity;
      this.cartService.updateCartItemQuantity(item.id,newQ).subscribe()
      // this.cartService.getItems().subscribe({
      //   next:(data)=>{
      //     this.getItemFromData=data
      //     this.objectFromEventEmitter.emit(this.getItemFromData[0])
      //   }
      // })
      this.cartService.getItemById(item.id).subscribe({
        next:(data)=>{
          this.getItemFromData=data
          this.objectFromEventEmitter.emit(this.getItemFromData)
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