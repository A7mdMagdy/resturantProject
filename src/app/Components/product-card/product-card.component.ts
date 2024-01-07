import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../Service/cart.service';
import { Cart } from '../../Interface/cart';
import { CommonModule } from '@angular/common';
import { IPizza } from '../../Interface/ipizza';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [HttpClientModule,RouterModule,CommonModule,ProductDetailsComponent],
  providers:[CartService],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {
@Input() user?:any
selectedItem?:IPizza
itemQuantity:number=0;
item:Cart

constructor(private cartService:CartService , private dialog:MatDialog)
{
this.item={ id:0,Name:"",price:0,Image:"",quantity:0,size:"",smallPrice:"",mediumPrice:"",largePrice:""};
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

// <<<<<<<  Card Details >>>>>>>> 
// <<<<<<<  Card Details >>>>>>>> 
ItemDetails(){
  this.dialog.open(ProductDetailsComponent,{
    width:'500px',
    data:this.user,
    disableClose: true,
  });
}


// <<<<<<<  Card Buttons >>>>>>>> 
// <<<<<<<  Card Buttons >>>>>>>> 
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
  }
  else{
     this.cartService.updateCartItemQuantity(this.user.id,this.itemQuantity).subscribe()
    //  this.dataSharingService.updateSharedData({...this.user,quantity:this.itemQuantity});
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
  }
  else if(this.itemQuantity==1) {
  this.itemQuantity--;
  this.cartService.removeItemFromOrder(this.item.id).subscribe()
  // this.dataSharingService.updateSharedData({...this.user,quantity:this.itemQuantity});
  }
}
}