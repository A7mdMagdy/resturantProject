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
@Input() updateQuantity:any
@Output() qunatityArr=new EventEmitter();
qunatity?:any
qunatity_Arr: any
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
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.updateQuantity+"from on Change in product card")
    if(this.updateQuantity?.quantity==0){
      this.itemQuantity=0;
    }
    this.cartService.getItemById(this.user.id).subscribe(
      {
        next:(data:Cart)=>
        {
          this.item=data
          this.itemQuantity=this.item.quantity;
          // console.log(this.item+"from on Change in product card"+this.itemQuantity)
        }
  
      }
    )
  }
  ngOnInit(): void {

    this.cartService.getItemById(this.user.id).subscribe(
      {
        next:(data:Cart)=>
        {
          this.item=data
          this.itemQuantity=this.item.quantity;
        }
  
      }
    )
    // this.dataService.fetchData();
  }

Increament()
{
  this.itemQuantity++;
  if(this.itemQuantity==1){
    let size=""
    if(this.user.smallPrice) size="Small"
    else if(this.user.mediumPrice) size="Medium"
    else size="Large"
    this.cartService.saveCartItems({...this.user,size,quantity:this.itemQuantity}).subscribe()
    // this.dataSharingService.updateSharedData({...this.user,quantity:this.itemQuantity});
    
    this.cartService.getItems().subscribe({
      next:(data)=>{this.qunatity=data
        console.log(this.qunatity[0].quantity)
        this.qunatityArr.emit(this.qunatity[0])
      }
    })
  
  }
  else{
     this.cartService.updateCartItemQuantity(this.user.id,this.itemQuantity).subscribe()
    //  this.dataSharingService.updateSharedData({...this.user,quantity:this.itemQuantity});
    console.log(this.cartService.getItems().subscribe({
      next:(data)=>{this.qunatity=data
        // console.log(this.qunatity[0].quantity)
        this.qunatityArr.emit(this.qunatity[0])
      }
    }));
  }
}
Decreament()
{
  if(this.itemQuantity>1)
  {
    console.log(this.itemQuantity)
    this.itemQuantity--;
    this.cartService.updateCartItemQuantity(this.user.id,this.itemQuantity).subscribe()
    // this.dataSharingService.updateSharedData({...this.user,quantity:this.itemQuantity});
    this.cartService.getItems().subscribe({
      next:(data)=>{this.qunatity=data
        // console.log(this.qunatity[0].quantity)
        this.qunatityArr.emit(this.qunatity[0])
      }
    })
  }
  else if(this.itemQuantity==1) {
    this.cartService.getItems().subscribe({
      next:(data)=>{this.qunatity=data
        console.log(this.qunatity[0].quantity)
        this.qunatityArr.emit(this.qunatity[0])
      }
    })
  this.itemQuantity--;
  this.cartService.removeItemFromOrder(this.item.id).subscribe()
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
