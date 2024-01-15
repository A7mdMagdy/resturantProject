import { HttpClientModule } from '@angular/common/http';
import { Component,EventEmitter,Input, Output } from '@angular/core';
import { CartService } from '../../Service/cart.service';
import { Cart } from '../../Interface/cart';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;
@Component({
  selector: 'app-deals-cart',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  providers:[CartService],
  templateUrl: './deals-cart.component.html',
  styleUrl: './deals-cart.component.css'
})
export class DealsCartComponent {
  private liveToast: any;
  @Input() deals:any;
  @Input() receiveDataFromParent:any
  @Output() objectFromEventEmitter=new EventEmitter();
  getItemFromData?:any;
  id:any;
  newquantity:any;
  dataquantity:any;
  itemQuantity:number=0;
  item:Cart;
  constructor(private cartService:CartService){
    this.item={ id:0,Name:"",price:0,Image:"",quantity:0,size:"",smallPrice:"",mediumPrice:"",largePrice:""}
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

    if(this.deals.id==this.receiveDataFromParent?.id){
      this.deals.quantity = this.receiveDataFromParent.quantity;
  }
}
  ngOnInit(): void {
    this.cartService.getItems().subscribe(
      {
        next:(data:any)=>
        {

          for(var x=0;x<data.length;x++){
            if(this.deals.id==data[x].id)
                this.deals.quantity=data[x].quantity
          }
        },
        error:()=>{console.log("000")}
      }
    )
  }

  Increament()
  {
    this.liveToast.show();
    if(this.deals.quantity==0){
      this.deals.quantity++;
      this.cartService.saveCartItems({...this.deals,quantity:this.deals.quantity}).subscribe({
        next:(data)=>{
          this.getItemFromData=data;
          // console.log(this.getItemFromData)
          // console.log(this.getItemFromData.quantity)
          console.log(this.deals.quantity)
          console.log("2")
          this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
        }
      })
      
      // this.cartService.saveCartItems({...this.deals,quantity:this.deals.quantity}).subscribe()
      // this.cartService.getItemById(this.deals?.id).subscribe({
        //   next:(data)=>{
          //     this.getItemFromData=data;
          //     this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
          //   }
          // })
          
        }
        else{
          this.deals.quantity++;
          // this.liveToast.show();
          
          this.cartService.updateCartItemQuantity(this.deals.id,this.deals.quantity).subscribe({
            next:(data)=>{
              this.getItemFromData=data;
              console.log(data)
              console.log("updateCartItem")
              console.log(this.deals.quantity)
              console.log("4")
              this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
            }
          })
          // this.cartService.updateCartItemQuantity(this.deals.id,this.deals.quantity).subscribe()
          
          // this.cartService.getItemById(this.deals.id).subscribe({
            //   next:(data)=>{
              //     this.getItemFromData=data;
              //     this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
              //   }
              // })
            }
  }

Decreament()
{
  if(this.deals.quantity>1)
  {
    this.itemQuantity--;
    this.deals.quantity--;
    this.cartService.updateCartItemQuantity(this.deals.id,this.deals.quantity).subscribe({
      next:(data)=>{
        this.getItemFromData=data;
        console.log(data)
        console.log("updateCartItem")
        console.log(this.deals.quantity)
        console.log("4")
        this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
      }
     })

    // this.cartService.updateCartItemQuantity(this.deals.id,this.deals.quantity).subscribe()

    // this.cartService.getItemById(this.deals.id).subscribe({
    //   next:(data)=>{
    //     this.getItemFromData=data;
    //     this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
    //   }
    // })
  }
  else if(this.deals.quantity==1) {

    this.deals.quantity--;
    this.cartService.updateCartItemQuantity(this.deals.id,this.deals.quantity).subscribe({
      next:(data)=>{
        this.getItemFromData=data;
        console.log(data)
        console.log("updateCartItem")
        console.log(this.deals.quantity)
        console.log("4")
        this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
      }
     })
  //   this.cartService.updateCartItemQuantity(this.deals.id,this.deals.quantity).subscribe()
  //   this.cartService.getItemById(this.deals.id).subscribe({
  //     next:(data)=>{
  //       this.getItemFromData=data;
        
  //       this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
  //     }
  //   })
    this.cartService.removeItemFromOrder(this.deals.id).subscribe()
  // }
}
}
}
