import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CartService } from '../../Service/cart.service';
import { Cart } from '../../Interface/cart';




@Component({
  selector: 'app-my-cart',
  standalone: true,
  imports: [CommonModule,HttpClientModule, FormsModule,RouterModule],
  providers:[CartService],
  templateUrl: './my-cart.component.html',
  styleUrl: './my-cart.component.css'
})
export class MyCartComponent implements OnInit {
  orderItems:Cart[];
  totalAmount: number = 0;
  selectedItem: any={};
  selectedradio:any
  orignalCartItems: Cart[]
  constructor(private router: Router,private route: ActivatedRoute,private orderService:CartService) {
    this.orderItems=[]
    this.route.queryParams.subscribe(params => {
      if (params['refresh']) {
        // Refresh logic here
        console.log('Page should be refreshed');
      }
    });
    this.orignalCartItems=[]

  }



  ngOnInit(): void {
    this.orderService.getItems().subscribe(
      {
      next:(order:any)=>
      {
      console.log('Received order items:', order);
      this.orderItems = order as any[];
      this.orignalCartItems=order as any[]
      this.orderItems=this.orderItems.filter(order => order.id!=0)
      this.calculateTotalAmount();
      }
      
      }
      );
  }
  // saveOrder(): void {
  //   this.orderService.saveOrder().subscribe((response) => {
  //     console.log('Order saved successfully:', response);
  //   });
  // }
  toggleQuantity(item: any): void {

      this.decrementItem(item);
  }
  
    // incrementItem(item: any): void {
    //   item.quantity++;
    //   this.calculateTotalAmount();
  
    //   this.orderService.updateCartItemQuantity(item.productId, item.quantity).subscribe(
    //     (response) => {
    //       console.log('CartItem quantity updated successfully:', response);
    //     },
    //     (error) => {
    //       console.error('Error updating cartItem quantity:', error);
    //     }
    //   );
    // }

    incrementItem(item: any): void {
      let newQ=++item.quantity;
      for(let i=0;i<this.orignalCartItems.length;i++){

        if(this.orignalCartItems[i].id==item.id){
         this.orderService.saveCartItems2((i).toString(),{...item,size:this.orignalCartItems[i].size,quantity:newQ}).subscribe()
          break;
        }
  
     }
      // this.orderService.updateCartItemQuantity(item.id,newQ).subscribe();
      // Add any logic to update the total price, etc.
      this.calculateTotalAmount();
    }

    decrementItem(item: any): void {
      if(item.quantity>1)
    {
      let newQ=--item.quantity;
      for(let i=0;i<this.orignalCartItems.length;i++){
    
        if(this.orignalCartItems[i].id==item.id){
          console.log("foundeddd")
         this.orderService.saveCartItems2((i).toString(),{...item,size:this.orignalCartItems[i].size,quantity:newQ}).subscribe()
          break;
        }
  
     }
      // this.orderService.updateCartItemQuantity(item.id,newQ).subscribe();
    }
    else if(item.quantity==1){
      let newQ=--item.quantity;
      for(let i=0;i<this.orignalCartItems.length;i++){

        if(this.orignalCartItems[i].id==item.id){
          this.orignalCartItems=this.orignalCartItems.filter(item=>item.id!= this.orignalCartItems[i].id)
          console.log("yoooooooooooooooooooo",this.orignalCartItems)
          this.orderService.afterDeleteItem(this.orignalCartItems).subscribe()
          this.orderItems = this.orderItems.filter(Item => Item.id != item.id);
            //  this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
          break;
        }
      }
      // this.orderService.removeItemFromOrder(item.id).subscribe()
      // this.orderItems = this.orderItems.filter(Item => Item.id !== item.id);
    }
    this.calculateTotalAmount();
    }
  
    calculateTotalAmount() {
      this.totalAmount = this.orderItems.reduce((total, item) => total + (item.quantity * item.price), 0);
    }
    customizeItem(itemId: number): void {
      // Load the selected item when entering customization
      // this.orderService.getItemById(itemId).subscribe((item: any) => {
      //   this.selectedItem = item;
      //   console.log(item);
      //  });
      for(let i = 0; i < this.orderItems.length; i++)
      {
        if(itemId==this.orderItems[i].id)
        {
          this.selectedItem = this.orderItems[i];
          
          break;
        }
      }
    }
    sizeChange(e:any)
    {
       console.log(e.target.defaultValue);
       this.selectedradio = e.target.defaultValue;
    }
    updateSizeAndPrice() {
      const selectedSize = (document.querySelector('input[name="size"]:checked') as HTMLInputElement)?.value;
    
      if (selectedSize) {
        const item = this.selectedItem;
        item.size = selectedSize;
        item.price = this.calculatePriceBySize(selectedSize);
        for(let i = 0; i < this.orderItems.length; i++)
        {
          if(item.id==this.orderItems[i].id)
          {
            this.orderService.saveCartItems2((i+1).toString(),item).subscribe()
            break;
          }
        }
  
        // this.orderService.updateCartItem(this.selectedItem.id, item).subscribe(
        //   response => {
        //     console.log('Update successful:', response);
        //     location.reload();
        //   },
        //   error => {
        //     console.error('Update failed:', error);
        //   }
        // );
        this.calculateTotalAmount();
      }
    }
    calculatePriceBySize(size: string): number {
      const item = this.selectedItem;
      console.log(size);
      console.log( +item.smallPrice)
      console.log( +item.mediumPrice)
      console.log( +item.largePrice)
      if (size === 'small' && item.deals && item.dealsmallPrice) {
        return +item.dealsmallPrice;
      }
      if (size === 'small' && item.deals && !item.dealsmallPrice) {
        return +item.smallPrice;
      }
      else if (size === 'small' && !item.deals) {
        return +item.smallPrice;
      }
       else if (size === 'medium' && item.deals && item.dealmediumPrice) {
        return +item.dealmediumPrice;
      } 
      else if (size === 'medium' && item.deals && !item.dealmediumPrice) {
        return +item.mediumPrice;
      }
      else if (size === 'medium' && !item.deals) {
        return +item.mediumPrice;
      }
      else if (size === 'large' && item.deals && item.deallargePrice) {
        return +item.deallargePrice;
      }
      else if (size === 'large' && item.deals && !item.deallargePrice) {
        return +item.largePrice;
      }
      else if (size === 'large' && !item.deals) {
        return +item.largePrice;
      }
       else {
        return 0; 
      }
    }
    closeAndNavigateHome(): void {
      // this.deleteSelectedItems();
      this.orignalCartItems= this.orignalCartItems.filter(item => item.id==0)
      this.orderService.afterDeleteItem(this.orignalCartItems).subscribe()
      // this.navigateToHome();
    }
  
    deleteItems(id: number[]): void {
      for(var item of id){
      this.orderService.removeItemFromOrder(item).subscribe(
        () => {
          console.log('Items deleted successfully');
        },
        (error) => {
          console.error('Error deleting items:', error);
        }
      );
      }
    }
  
    private navigateToHome(): void {
      this.router.navigate(['']);
    }
    deleteSelectedItems(): void {
      const itemIdsInJson = this.orderItems.map(item => item.id);
      this.deleteItems(itemIdsInJson);

    }

    
}



