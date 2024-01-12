import { HttpClientModule } from '@angular/common/http';
import { Component,EventEmitter,Input, Output } from '@angular/core';
import { CartService } from '../../Service/cart.service';
import { Cart } from '../../Interface/cart';

@Component({
  selector: 'app-deals-cart',
  standalone: true,
  imports: [HttpClientModule],
  providers:[CartService],
  templateUrl: './deals-cart.component.html',
  styleUrl: './deals-cart.component.css'
})
export class DealsCartComponent {
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
  ngOnChanges(): void {

    if(this.receiveDataFromParent?.quantity==0){
      this.itemQuantity=0;
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
          if(this.deals.id==this.receiveDataFromParent.id){
            this.item=data
            this.deals.quantity = this.receiveDataFromParent.quantity;
          }
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
            this.itemQuantity=this.item.quantity;
            this.newquantity=data
            this.item=data
      
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
    if(this.deals.quantity==0){
      this.deals.quantity++;
      this.cartService.saveCartItems({...this.deals,quantity:this.deals.quantity}).subscribe()
      this.cartService.getItemById(this.deals?.id).subscribe({
        next:(data)=>{
          this.getItemFromData=data;
          this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
        }
      })
    
    }
    else{
      this.deals.quantity++;
      this.cartService.updateCartItemQuantity(this.deals.id,this.deals.quantity).subscribe()

      this.cartService.getItemById(this.deals.id).subscribe({
        next:(data)=>{
          this.getItemFromData=data;
          this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
        }
      })
    }
  }

Decreament()
{
  if(this.deals.quantity>1)
  {
    this.itemQuantity--;
    this.deals.quantity--;
    this.cartService.updateCartItemQuantity(this.deals.id,this.deals.quantity).subscribe()

    this.cartService.getItemById(this.deals.id).subscribe({
      next:(data)=>{
        this.getItemFromData=data;
        
        this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
      }
    })
  }
  else if(this.deals.quantity==1) {

    this.deals.quantity--;
    this.cartService.updateCartItemQuantity(this.deals.id,this.deals.quantity).subscribe()
    this.cartService.getItemById(this.deals.id).subscribe({
      next:(data)=>{
        this.getItemFromData=data;
        
        this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
      }
    })
    this.itemQuantity--;
    this.cartService.removeItemFromOrder(this.deals.id).subscribe()
  }
}
}
