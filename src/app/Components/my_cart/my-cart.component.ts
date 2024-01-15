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
  constructor(private router: Router,private route: ActivatedRoute,private orderService:CartService) {
    this.orderItems=[]
    this.route.queryParams.subscribe(params => {
      if (params['refresh']) {
        // Refresh logic here
        console.log('Page should be refreshed');
      }
    });

  }



  ngOnInit(): void {
    this.orderService.getItems().subscribe(
      {
      next:(order:any)=>
      {
      console.log('Received order items:', order);
      this.orderItems = order
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
      this.orderService.updateCartItemQuantity(item.id,newQ).subscribe();
      // Add any logic to update the total price, etc.
      this.calculateTotalAmount();
    }

    decrementItem(item: any): void {
      if(item.quantity>1)
    {
      let newQ=--item.quantity;
      this.orderService.updateCartItemQuantity(item.id,newQ).subscribe();
    }
    else if(item.quantity=1){
      this.orderService.removeItemFromOrder(item.id).subscribe()
      this.orderItems = this.orderItems.filter(Item => Item.id !== item.id);
    }
    this.calculateTotalAmount();
    }
  
    calculateTotalAmount() {
      this.totalAmount = this.orderItems.reduce((total, item) => total + (item.quantity * item.price), 0);
    }
    customizeItem(itemId: number): void {
      // Load the selected item when entering customization
      this.orderService.getItemById(itemId).subscribe((item: any) => {
        this.selectedItem = item;
        console.log(item);
       });
    }
    updateSizeAndPrice() {
      const selectedSize = (document.querySelector('input[name="size"]:checked') as HTMLInputElement)?.value;
    
      if (selectedSize) {
        const item = this.selectedItem;
        item.size = selectedSize;
        item.price = this.calculatePriceBySize(selectedSize);
  
        this.orderService.updateCartItem(this.selectedItem.id, item).subscribe(
          response => {
            console.log('Update successful:', response);
            location.reload();
          },
          error => {
            console.error('Update failed:', error);
          }
        );
      }
    }
    calculatePriceBySize(size: string): number {
      const item = this.selectedItem;
      console.log(size);
      console.log( +item.smallPrice)
      console.log( +item.mediumPrice)
      console.log( +item.largePrice)
      if (size === 'small') {
        return +item.smallPrice;
      } else if (size === 'medium') {
        return +item.mediumPrice;
      } else if (size === 'large') {
        return +item.largePrice;
      } else {
        return 0; 
      }
    }
    closeAndNavigateHome(): void {
      // this.deleteSelectedItems();
      for(let i =0;i<this.orderItems.length;i++)
      {
        this.orderService.removeItemFromOrder(this.orderItems[i].id).subscribe();
      }
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



