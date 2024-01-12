import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StartersService } from '../../Service/starters.service';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from '../../Service/cart.service';
import { Cart } from '../../Interface/cart';

@Component({
  selector: 'app-onestarter',
  standalone: true,
  imports: [HttpClientModule],
  providers:[StartersService,CartService],
  templateUrl: './onestarter.component.html',
  styleUrl: './onestarter.component.css'
})
export class OnestarterComponent {
  @Input() onestart:any;
  @Input() receiveDataFromStarters:any
  @Output() objectFromEventEmitter=new EventEmitter();
  getItemFromData?:any;
  id:any;
  newquantity:any;
  dataquantity:any;
  itemQuantity:number=0;
  item:Cart;
  constructor(private myApis:StartersService , private cartService:CartService){
    this.item={ id:0,Name:"",price:0,Image:"",quantity:0,size:"",smallPrice:"",mediumPrice:"",largePrice:""}
  }
  ngOnChanges(): void {

    
    console.log("Onchange")
    console.log(this.item)
    // if(this.user.id==this.receiveDataFromStarters?.id){
      // console.log("inside getitemfromdata")
      // this.item=data
      // this.user.quantity = this.receiveDataFromStarters.quantity;
      // console.log(this.receiveDataFromStarters.quantity)
      // console.log("this.user.id==this.receiveDataFromParent?.id")
    // }
    if(this.receiveDataFromStarters){
      this.getItemFromdat();
    }
  }

  private getItemFromdat(){
    this.cartService.getItems().subscribe(
      {
        next:(data:any)=>
        {
          if(this.onestart.id==this.receiveDataFromStarters.id){
            this.item=data
            this.onestart.quantity = this.receiveDataFromStarters.quantity;
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
              if(this.onestart.id==data[x].id)
                 this.onestart.quantity=data[x].quantity
            }
        },
        error:()=>{console.log("000")}
      }
    )
  }

  Increament()
  {
    if(this.onestart.quantity==0){
      this.onestart.quantity++;
      console.log(this.onestart);
      this.cartService.saveCartItems({...this.onestart,quantity:this.onestart.quantity}).subscribe()
      this.cartService.getItemById(this.onestart?.id).subscribe({
        next:(data)=>{
          this.getItemFromData=data;
          this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
        }
      })
    
    }
    else{
      this.onestart.quantity++;
      this.cartService.updateCartItemQuantity(this.onestart.id,this.onestart.quantity).subscribe()

      this.cartService.getItemById(this.onestart.id).subscribe({
        next:(data)=>{
          this.getItemFromData=data;
          this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
        }
      })
    }
  }

Decreament()
{
  if(this.onestart.quantity>1)
  {
    this.itemQuantity--;
    this.onestart.quantity--;
    this.cartService.updateCartItemQuantity(this.onestart.id,this.onestart.quantity).subscribe()

    this.cartService.getItemById(this.onestart.id).subscribe({
      next:(data)=>{
        this.getItemFromData=data;
        
        this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
      }
    })
  }
  else if(this.onestart.quantity==1) {

    this.onestart.quantity--;
    this.cartService.updateCartItemQuantity(this.onestart.id,this.onestart.quantity).subscribe()
    this.cartService.getItemById(this.onestart.id).subscribe({
      next:(data)=>{
        this.getItemFromData=data;
        
        this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
      }
    })
    this.itemQuantity--;
    this.cartService.removeItemFromOrder(this.onestart.id).subscribe()
  }
}
}
