import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../Service/cart.service';
import { Cart } from '../../Interface/cart';
import { SharedcartService } from '../../Service/sharedcart.service';




@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [HttpClientModule,RouterModule],
  providers:[CartService,SharedcartService],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {
@Input() user?:any
itemQuantity:number=0;
item:Cart
constructor(private cartService:CartService,private sharedCart:SharedcartService)
{
this.item={ id:0,Name:"",price:0,Image:"",quantity:0,size:"",smallPrice:"",mediumPrice:"",largePrice:""}
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
    );
    // this.dataService.fetchData();
    this.sharedCart.cartItems$.subscribe(
      (cartItems: Cart[]) => {
        // Do something with updated cart items if needed
      }
    );

  }
/*
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
}*/
Increament() {
  this.itemQuantity++;
  if (this.itemQuantity === 1) {
    let size = "";
    if (this.user.smallPrice) size = "Small";
    else if (this.user.mediumPrice) size = "Medium";
    else size = "Large";
    this.cartService.saveCartItems({ ...this.user, size, quantity: this.itemQuantity }).subscribe(() => {
      this.sharedCart.updateCartItems({...this.user,quantity:this.itemQuantity});
    });
  } else {
    this.cartService.updateCartItemQuantity(this.user.id, this.itemQuantity).subscribe(() => {
      this.sharedCart.updateCartItems({...this.user,quantity:this.itemQuantity});
    });
  }
}

Decreament() {
  if (this.itemQuantity > 1) {
    this.itemQuantity--;
    this.cartService.updateCartItemQuantity(this.user.id, this.itemQuantity).subscribe(() => {
      this.sharedCart.updateCartItems({...this.user,quantity:this.itemQuantity});
    });
  } else if (this.itemQuantity === 1) {
    this.itemQuantity--;
    this.cartService.removeItemFromOrder(this.item.id).subscribe(() => {
      this.sharedCart.updateCartItems({...this.user,quantity:this.itemQuantity});
    });
  }
}

}