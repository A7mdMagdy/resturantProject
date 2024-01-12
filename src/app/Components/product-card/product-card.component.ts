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

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [HttpClientModule,RouterModule,CommonModule],
  providers:[CartService],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit,OnChanges {
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
constructor(private cartService:CartService,private operationService:OperationService,private dialog:MatDialog)
{
this.item={ id:0,Name:"",price:0,Image:"",quantity:0,size:"",smallPrice:"",mediumPrice:"",largePrice:""}

}
  ngOnChanges(): void {
    console.log("this.receiveDataFromParent")

    if(this.receiveDataFromParent?.quantity==0){
      this.itemQuantity=0;
      console.log("inside if")
    }
    if(this.receiveDataFromParent){
      this.getItemFromdat();
    }
    
  }

  private getItemFromdat(){
    this.cartService.getItems().subscribe(
      {
        next:(data:any)=>
        {
          // console.log(data)
          //   console.log(this.receiveDataFromParent.id)
          //   console.log(this.receiveDataFromParent)
          if(this.user.id==this.receiveDataFromParent.id){
            // console.log("inside getitemfromdata")
            this.item=data
            this.user.quantity = this.receiveDataFromParent.quantity;
            // console.log(this.receiveDataFromParent.quantity)
          }
          
          // console.log(this.item+"from on Change in product card"+this.itemQuantity)
        },
        error:()=>{console.log("000")}
      }
    )
  }


  ngOnInit(): void {
    console.log("init")
    this.cartService.getItems().subscribe(
      {
        next:(data:any)=>
        {
          // if(data.id==this.receiveDataFromParent?.id){
            // console.log(data)
            // console.log(this.receiveDataFromParent.id)
            // console.log(this.receiveDataFromParent)
            // this.itemQuantity=this.item.quantity;
            // this.newquantity=data
            this.item=data
            // console.log(this.item)
            // console.log(data[0])
            // console.log(data[1])
            
            for(var x=0;x<data.length;x++){
              if(this.user.id==data[x].id)
                 this.user.quantity=data[x].quantity
            }
            // console.log(data.length)
            // console.log(this.newquantity[0])
            // if(this.item.quantity){
            //   console.log(data.quantity)
            //   console.log("data.quantity")
            // }
            
          // }
          // console.log(this.item+"from on Change in product card"+this.itemQuantity)
        },
        error:()=>{console.log("000")}
      }
    )
    // this.dataService.fetchData();
  }

Increament()
{
  // this.itemQuantity++;
  // console.log(this.user.Quantity)
  console.log("before if condition");
  console.log(this.user.quantity);
  if(this.user.quantity==0){
    this.user.quantity=this.user.quantity+1;
    let size=""
    if(this.user.smallPrice) size="Small"
    else if(this.user.mediumPrice) size="Medium"
    else size="Large"
    this.cartService.saveCartItems({...this.user,size,quantity:this.user.quantity}).subscribe()
    // this.dataSharingService.updateSharedData({...this.user,quantity:this.itemQuantity});
    this.cartService.getItemById(this.user?.id).subscribe({
      next:(data)=>{
        this.getItemFromData=data;
        // console.log(this.getItemFromData)
        // console.log(this.getItemFromData.quantity)
        console.log(this.user.quantity);
        console.log(this.item);
        console.log("ay hagaaa");
        this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
      }
    })
  
  }
  else{
    this.user.quantity=this.user.quantity+1;
     this.cartService.updateCartItemQuantity(this.user.id,this.user.quantity).subscribe()
    //  this.dataSharingService.updateSharedData({...this.user,quantity:this.itemQuantity});
    // this.cartService.getItems().subscribe({
    //   next:(data)=>{this.getItemFromData=data
    //     // console.log(this.getItemFromData[0].quantity)
    //     this.objectFromEventEmitter.emit(this.getItemFromData[0])
    //   }
    // })
    this.cartService.getItemById(this.user.id).subscribe({
      next:(data)=>{
        this.getItemFromData=data;
        // console.log(this.getItemFromData)
        // console.log(this.getItemFromData.quantity)
        console.log(this.user.quantity);
        console.log(this.item);
        console.log("else");
        this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
      }
    })
  }
}
Decreament()
{
  if(this.user.quantity>1)
  {
    // console.log(this.itemQuantity)
    this.itemQuantity--;
    this.user.quantity--;
    this.cartService.updateCartItemQuantity(this.user.id,this.user.quantity).subscribe()
    // this.dataSharingService.updateSharedData({...this.user,quantity:this.itemQuantity});
    // this.cartService.getItems().subscribe({
    //   next:(data)=>{this.getItemFromData=data
    //     console.log(this.getItemFromData)
    //     console.log(this.getItemFromData[0].quantity)
        
    //     this.objectFromEventEmitter.emit(this.getItemFromData[0])
    //   }
    // })
    this.cartService.getItemById(this.user.id).subscribe({
      next:(data)=>{
        this.getItemFromData=data;
        // console.log(this.getItemFromData)
        // console.log(this.getItemFromData.quantity)
        
        this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
      }
    })
  }
  else if(this.user.quantity==1) {
    // this.cartService.getItems().subscribe({
    //   next:(data)=>{
    //     this.getItemFromData=data
    //     console.log("this.quantity[0]= "+this.getItemFromData[0])
    //     this.objectFromEventEmitter.emit(this.getItemFromData[0])
    //   }
    // })
    this.user.quantity--;
    this.cartService.updateCartItemQuantity(this.user.id,this.user.quantity).subscribe()
    this.cartService.getItemById(this.user.id).subscribe({
      next:(data)=>{
        this.getItemFromData=data;
        // console.log(this.getItemFromData)
        // console.log(this.getItemFromData.quantity)
        
        this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
      }
    })
    this.itemQuantity--;
    this.cartService.removeItemFromOrder(this.user.id).subscribe()
  // this.dataSharingService.updateSharedData({...this.user,quantity:this.itemQuantity});

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
