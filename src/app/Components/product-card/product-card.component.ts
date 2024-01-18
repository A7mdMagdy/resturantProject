import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { OutletContext, Router, RouterModule } from '@angular/router';
import { CartService } from '../../Service/cart.service';
import { Cart } from '../../Interface/cart';
import { outputAst } from '@angular/compiler';
import { Observable, async } from 'rxjs';
import { OperationService } from '../../Service/operation.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { CommonModule } from '@angular/common';
declare var bootstrap: any;
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [HttpClientModule,RouterModule,CommonModule],
  providers:[CartService],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit,OnChanges {
private liveToast: any;
@Input() user?:any
@Input() receiveDataFromParent:any   // comming from small cart
@Output() objectFromEventEmitter=new EventEmitter();
getItemFromData?:any
id:any
newquantity:any

//variable for BehaviorSubject
dataquantity:any
itemQuantity:number=0;
item:Cart
cartItems:any[];
constructor(private cartService:CartService,private operationService:OperationService,private dialog:MatDialog)
{
this.item={ id:0,Name:"",price:0,Image:"",quantity:0,size:"",smallPrice:"",mediumPrice:"",largePrice:"", dealsmallPrice: "",dealmediumPrice: "",deallargePrice: "",deals:false}
this.cartItems=[];
}
closeToast() {
  this.liveToast.hide();
}

showToast() {
  this.liveToast.show();
}

ngAfterViewInit() {
  // Initialize the toast after the view has been initialized
  this.liveToast = new bootstrap.Toast(document.getElementById('liveToast'));
}

  ngOnChanges(): void {
    if(this.user.id==this.receiveDataFromParent?.id){
      this.user.quantity = this.receiveDataFromParent.quantity;
    }
    this.cartService.getItems().subscribe(
      {
        next:(data:any)=>
        {
          this.cartItems = data;
            for(var x=0;x<data.length;x++){
              if(this.user.id==data[x].id)
                 this.user.quantity=data[x].quantity
            }
        },
        error:()=>{console.log("000")}
      }
    )
  }
  ngOnInit(): void {
    console.log("init")
    // this.cartService.getItems().subscribe(
    //   {
    //     next:(data:any)=>
    //     {
    //       this.cartItems = data;
    //         for(var x=0;x<data.length;x++){
    //           if(this.user.id==data[x].id)
    //              this.user.quantity=data[x].quantity
    //         }
    //     },
    //     error:()=>{console.log("000")}
    //   }
    // )
  }

Increament()
{
  this.liveToast.show();
  if(this.user.quantity==0){
    this.user.quantity=this.user.quantity+1;
    let size=""
    if(this.user.smallPrice) size="Small"
    else if(this.user.mediumPrice) size="Medium"
    else size="Large"
console.log("yoooooooooooooooooo",this.cartItems.length)
    this.cartService.saveCartItems2(this.cartItems.length.toString(),{...this.user,size,quantity:this.user.quantity}).subscribe({
      next:(data)=>{
        this.getItemFromData=data;
        // console.log(this.getItemFromData)
        // console.log(this.getItemFromData.quantity)
        console.log(this.user.quantity)
        // console.log("2")
        this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
      }
    })
    // this.cartService.saveCartItems({...this.user,size,quantity:this.user.quantity}).subscribe()
    // this.cartService.getItemById(this.user?.id).subscribe({
    //   next:(data)=>{
    //     this.getItemFromData=data;
      
    //     this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
    //   }
    // })
  
  }
  else{
    this.user.quantity=this.user.quantity+1;
    for(let i=0;i<this.cartItems.length;i++){

       if(this.cartItems[i].id==this.user.id){
        this.cartService.saveCartItems2((i).toString(),{...this.user,size:this.cartItems[i].size,quantity:this.user.quantity}).subscribe({
          next:(data)=>{
            this.getItemFromData=data;
            // console.log(this.getItemFromData)
            // console.log(this.getItemFromData.quantity)
            console.log(this.user.quantity)
            console.log("2")
            this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
          }
        })
         break;
       }

    }
    // this.cartService.updateCartItemQuantity(this.user.id,this.user.quantity).subscribe({
    //   next:(data)=>{
    //     this.getItemFromData=data;
    //     console.log(data)
    //     console.log("updateCartItem")
    //     console.log(this.user.quantity)
    //     console.log("4")
    //     this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
    //   }
    //  })
    //  this.cartService.updateCartItemQuantity(this.user.id,this.user.quantity).subscribe()
    // this.cartService.getItemById(this.user.id).subscribe({
    //   next:(data)=>{
    //     this.getItemFromData=data;
    //     this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
    // })
  }
}
Decreament()
{
  if(this.user.quantity>1)
  {
    this.itemQuantity--;
    this.user.quantity--;
    for(let i=0;i<this.cartItems.length;i++){

      if(this.cartItems[i].id==this.user.id){
       this.cartService.saveCartItems2((i).toString(),{...this.user,size:this.cartItems[i].size,quantity:this.user.quantity}).subscribe({
         next:(data)=>{
           this.getItemFromData=data;
           // console.log(this.getItemFromData)
           // console.log(this.getItemFromData.quantity)
           console.log(this.user.quantity)
           console.log("2")
           this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
         }
       })
        break;
      }

   }
    // this.cartService.updateCartItemQuantity(this.user.id,this.user.quantity).subscribe({
    //   next:(data)=>{
    //     this.getItemFromData=data;
    //     console.log(data)
    //     console.log("updateCartItem")
    //     console.log(this.user.quantity)
    //     console.log("4")
    //     this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
    //   }
    //  })


    // this.cartService.updateCartItemQuantity(this.user.id,this.user.quantity).subscribe()

    // this.cartService.getItemById(this.user.id).subscribe({
    //   next:(data)=>{
    //     this.getItemFromData=data;
        
    //     this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
    //   }
    // })
  }
  else if(this.user.quantity==1) {
  
    this.user.quantity--;
    for(var i=0;i<this.cartItems.length;i++){

      if(this.cartItems[i].id==this.user.id){
       this.cartService.saveCartItems2((i).toString(),{...this.user,size:this.cartItems[i].size,quantity:this.user.quantity}).subscribe({
         next:(data)=>{
           this.getItemFromData=data;
           // console.log(this.getItemFromData)
           // console.log(this.getItemFromData.quantity)
           console.log(this.user.quantity)
           console.log("2")
           const filterItems=this.cartItems.filter(item=>item.id!= this.cartItems[i].id)
          console.log(filterItems)
          this.cartService.afterDeleteItem(filterItems).subscribe(
            {
              complete: ()=>{this.objectFromEventEmitter.emit(this.getItemFromData);}
            }
          )
          //  this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
         },
        //  complete: ()=>
        //  {
        //   const filterItems=this.cartItems.filter(item=>item.id!= this.cartItems[i].id)
        //   console.log(filterItems)
        //   this.cartService.afterDeleteItem(filterItems).subscribe()
        //  }
       })
        break;
      }

   }
    // this.cartService.updateCartItemQuantity(this.user.id,this.user.quantity).subscribe({
    //   next:(data)=>{
    //     this.getItemFromData=data;
    //     console.log(data)
    //     console.log("updateCartItem")
    //     console.log(this.user.quantity)
    //     console.log("4")
    //     this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
    //   }
    //  })

    // this.cartService.updateCartItemQuantity(this.user.id,this.user.quantity).subscribe()
    // this.cartService.getItemById(this.user.id).subscribe({
    //   next:(data)=>{
    //     this.getItemFromData=data;
    //     this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
    //   }
    // })
    // this.itemQuantity--;
    // this.cartService.removeItemFromOrder(this.user.id).subscribe()
    // this.cartService.removeItemFromOrder2(i.toString()).subscribe()
  }
}

ItemDetails(){
  this.dialog.open(ProductDetailsComponent,{
    width:'500px',
    data:this.user,
    disableClose: true,
  });
}
}


function output(): (target: ProductCardComponent, propertyKey: "itemQuantity") => void {
  throw new Error('Function not implemented.');
}
