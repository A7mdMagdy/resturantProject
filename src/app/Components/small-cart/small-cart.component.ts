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
  orignalCartItems: Cart[]
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
    this.orignalCartItems=[]
  }
  ngOnChanges(changes: SimpleChanges): void {

    this.cartService.getItems().subscribe(
      {
        next:(data:any)=>
        {
          // this.cartItems = data as any[]
          // this.cartItems.filter(order => order.id != 0);
          // console.log(this.cartItems)
          // this.cartItems=data;
          this.cartItems = data as any[]
          this.orignalCartItems=data as any[];
          this.cartItems= this.cartItems.filter(order => order.id != 0 && order.quantity>0);
          this.calculateTotalAmount();
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
          // this.cartItems = data as any[]
          // this.cartItems= this.cartItems.filter(order => order.id != 0);
          // this.cartItems.forEach(order => console.log(order.id))
          // this.cartItems=data
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

    for(let i=0;i<this.orignalCartItems.length;i++){

      if(this.orignalCartItems[i].id==item.id){
       this.cartService.saveCartItems2((i).toString(),{...item,size:this.orignalCartItems[i].size,quantity:newQ}).subscribe({
         next:(data)=>{
           this.getItemFromData=data;
           // console.log(this.getItemFromData)
           // console.log(this.getItemFromData.quantity)
          //  console.log(this.user.quantity)
          //  console.log("2")
           this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
         }
       })
        break;
      }

   }
    // this.cartService.updateCartItemQuantity(item.id,newQ).subscribe({
    //   next:(data)=>{
    //     this.getItemFromData=data
    //     this.objectFromEventEmitter.emit(this.getItemFromData)
    //   }
    // });
    // this.cartService.getItemById(item.id).subscribe({
    //   next:(data)=>{
    //     this.getItemFromData=data
    //     this.objectFromEventEmitter.emit(this.getItemFromData)
    //   }
    // })
  }

  // Function to decrement the quantity of an item
  decrementItem(item: any): void {

    if(item.quantity>1)
    {
      let newQ=--item.quantity;

      for(let i=0;i<this.orignalCartItems.length;i++){

        if(this.orignalCartItems[i].id==item.id){
         this.cartService.saveCartItems2((i).toString(),{...item,size:this.orignalCartItems[i].size,quantity:newQ}).subscribe({
           next:(data)=>{
             this.getItemFromData=data;
             // console.log(this.getItemFromData)
             // console.log(this.getItemFromData.quantity)
            //  console.log(this.user.quantity)
            //  console.log("2")
             this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
           }
         })
          break;
        }
      }
      // this.cartService.updateCartItemQuantity(item.id,newQ).subscribe({
      //   next:(data)=>{
      //     this.getItemFromData=data
      //     this.objectFromEventEmitter.emit(this.getItemFromData)
      //   }
      // })
      // this.cartService.getItemById(item.id).subscribe({
      //   next:(data)=>{
      //     this.getItemFromData=data
      //     this.objectFromEventEmitter.emit(this.getItemFromData)
      //   }
      // })

    }
    else if(item.quantity==1){
      let newQ=--item.quantity;
      for(let i=0;i<this.orignalCartItems.length;i++){

        if(this.orignalCartItems[i].id==item.id){
         this.cartService.saveCartItems2((i).toString(),{...item,size:this.orignalCartItems[i].size,quantity:newQ}).subscribe({
           next:(data)=>{
             this.getItemFromData=data;
             // console.log(this.getItemFromData)
             // console.log(this.getItemFromData.quantity)
            //  console.log(this.user.quantity)
            //  console.log("2")
            const filterItems=this.orignalCartItems.filter(item=>item.id!= this.orignalCartItems[i].id)
          console.log(filterItems)
          this.cartService.afterDeleteItem(filterItems).subscribe(
            {
              complete: ()=>{this.objectFromEventEmitter.emit(this.getItemFromData);}
            }
          )
            //  this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
           }
         })
          break;
        }
      }
      // this.cartService.updateCartItemQuantity(item.id,newQ).subscribe({
      //   next:(data)=>{
      //     this.getItemFromData=data
      //     this.objectFromEventEmitter.emit(this.getItemFromData)
      //   }
      // })
      // this.cartService.getItemById(item.id).subscribe({
      //   next:(data)=>{
      //     this.getItemFromData=data
      //     this.objectFromEventEmitter.emit(this.getItemFromData)
      //   }
      // })
      // this.cartService.removeItemFromOrder(item.id).subscribe()
     
      // this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
      

    }
    this.calculateTotalAmount();
    
  }



  // Function to handle continue shopping
  // continueShopping(){
  //   for(let i = 0;i<this.cartItems.length;i++){
  //   this.cartService.saveCartItems(this.cartItems[i]).subscribe(
  //     {
  //     next:(response) => {
  //       console.log('Cart items saved successfully:', response);
  //       // this.router.navigate(['mycart']);
  //     },
  //     error:(error) => {
  //       console.error('Error saving cart items:', error);
  //     }
  //   }
  //   );
  // }
  // } 

  calculateTotalAmount(){
    this.totalAmount = this.cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  }
  calculateTotalQuantity(){
    return this.cartItems.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0);
  }
}