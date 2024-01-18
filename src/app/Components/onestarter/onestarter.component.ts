import { Component, EventEmitter, Input, Output,importProvidersFrom } from '@angular/core';
import { StartersService } from '../../Service/starters.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CartService } from '../../Service/cart.service';
import { Cart } from '../../Interface/cart';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { HttpLoaderFactory } from '../../app.component';
// import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
// import { TranslateService } from '@ngx-translate/core';
// import { provideHttpClient } from '@angular/common/http';
// import { bootstrapApplication } from '@angular/platform-browser';
// import { BrowserModule } from '@angular/platform-browser';
// import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import 'zone.js';
// import { AppComponent } from '../../app.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ToastrModule } from 'ngx-toastr';
// import { ToastrService } from 'ngx-toastr';
// export function HttpLoaderFactory(httpClient: HttpClient) {
//   return new TranslateHttpLoader(httpClient);
// }
declare var bootstrap: any;
@Component({
  selector: 'app-onestarter',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule,
    // TranslateModule,
    // BrowserModule,
    // BrowserAnimationsModule, // required animations module
    // ToastrModule.forRoot(),
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: HttpLoaderFactory,
    //     deps: [ HttpClient ]
    //   }
    // }),
  ],
  providers:[
    StartersService,
    CartService
  ],
  templateUrl: './onestarter.component.html',
  styleUrl: './onestarter.component.css'
})
export class OnestarterComponent {
  private liveToast: any;
  @Input() onestart:any;
  @Input() receiveDataFromStarters:any
  @Output() objectFromEventEmitter=new EventEmitter();
  getItemFromData?:any;
  id:any;
  newquantity:any;
  dataquantity:any;
  itemQuantity:number=0;
  item:Cart;
  cartItems:any[];
  showToast() {
    this.liveToast.show();
  }
 
  closeToast() {
    this.liveToast.hide();
  }
 
  ngAfterViewInit() {
    // Initialize the toast after the view has been initialized
    this.liveToast = new bootstrap.Toast(document.getElementById('liveToast'));
  }
  // private modalService: NgbModal 
  constructor(private myApis:StartersService , private cartService:CartService, private snackBar: MatSnackBar)
  {
    // private translate: TranslateService
    this.item={ id:0,Name:"",price:0,Image:"",quantity:0,size:"",smallPrice:"",mediumPrice:"",largePrice:"", dealsmallPrice: "",dealmediumPrice: "",deallargePrice: "",deals:false};
    // this.translate.addLangs(['en', 'ar']);
    // this.translate.setDefaultLang('en');

    // const browserLang = this.translate.getBrowserLang();
    // const languageToUse = (browserLang && browserLang.match(/en|ar/)) ? browserLang : 'en';
    // this.translate.use(languageToUse);
    this.cartItems=[]
    
  }
  // showSuccess() {
  //   this.toastr.success('This is a success toast!', 'Success');
  // }
//   openSnackBar()
//   {
//     this.Increament();
//     this.snackBar.open('Pizza party', 'Close', {
//       duration: this.durationInSeconds * 1000, // Convert seconds to milliseconds
//     });
// }

// showToast() {     this.toastr.success('Hello, this is a toast message!', 'Success!');   }
  
  ngOnChanges(): void {
    if(this.onestart.id==this.receiveDataFromStarters?.id){
      this.onestart.quantity = this.receiveDataFromStarters.quantity;
    }
    this.cartService.getItems().subscribe(
      {
        next:(data:any)=>
        {
          this.cartItems = data;
          for(var x=0;x<data.length;x++){
            if(this.onestart.id==data[x].id)
              this.onestart.quantity=data[x].quantity
          }
        },
        error:()=>{console.log("000")}
      }
    )
   
  }

  ngOnInit(): void {
    // this.cartService.getItems().subscribe(
    //   {
    //     next:(data:any)=>
    //     {
    //       for(var x=0;x<data.length;x++){
    //         if(this.onestart.id==data[x].id)
    //           this.onestart.quantity=data[x].quantity
    //       }
    //     },
    //     error:()=>{console.log("000")}
    //   }
    // )
  }

  Increament()
  {
    this.liveToast.show();
    // this.snackBar.open('add to Cart ', '🍕', {
    //   duration:1000,
    //   verticalPosition:'bottom',
    //   horizontalPosition:'center',
    //   panelClass: ['inline-snackbar'], // Convert seconds to milliseconds
    // });

    if(this.onestart.quantity==0){
      this.onestart.quantity++;
      let size=this.onestart.size
      this.cartService.saveCartItems2(this.cartItems.length.toString(),{...this.onestart,size,quantity:this.onestart.quantity}).subscribe({
        next:(data)=>{
          this.getItemFromData=data;
          // console.log(this.getItemFromData)
          // console.log(this.getItemFromData.quantity)
          // console.log(this.user.quantity)
          // console.log("2")
          this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
        }
      })
      // this.cartService.saveCartItems({...this.onestart,quantity:this.onestart.quantity}).subscribe({
      //   next:(data)=>{
      //     this.getItemFromData=data;
      //     // console.log(this.getItemFromData)
      //     // console.log(this.getItemFromData.quantity)
      //     console.log(this.onestart.quantity)
      //     console.log("2")
      //     this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
      //   }
      // })

      // console.log(this.onestart);
      // this.cartService.saveCartItems({...this.onestart,quantity:this.onestart.quantity}).subscribe()
      // this.cartService.getItemById(this.onestart?.id).subscribe({
      //   next:(data)=>{
      //     this.getItemFromData=data;
      //     this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
      //   }
      // })
    
    }
    else{
      this.onestart.quantity++;

      for(let i=0;i<this.cartItems.length;i++){

        if(this.cartItems[i].id==this.onestart.id){
         this.cartService.saveCartItems2((i).toString(),{...this.onestart,size:this.cartItems[i].size,quantity:this.onestart.quantity}).subscribe({
           next:(data)=>{
             this.getItemFromData=data;
             // console.log(this.getItemFromData)
             // console.log(this.getItemFromData.quantity)
            //  console.log(this.user.quantity)
             console.log("2")
             this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
           }
         })
          break;
        }
 
     }
      // this.cartService.updateCartItemQuantity(this.onestart.id,this.onestart.quantity).subscribe({
      //   next:(data)=>{
      //     this.getItemFromData=data;
      //     console.log(data)
      //     console.log("updateCartItem")
      //     console.log(this.onestart.quantity)
      //     console.log("4")
      //     this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
      //   }
      //  })

      // this.cartService.updateCartItemQuantity(this.onestart.id,this.onestart.quantity).subscribe()
      // this.cartService.getItemById(this.onestart.id).subscribe({
      //   next:(data)=>{
      //     this.getItemFromData=data;
      //     this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
      //   }
      // })
    }
  }

Decreament()
{
  if(this.onestart.quantity>1)
  {
    this.itemQuantity--;
    this.onestart.quantity--;
    for(let i=0;i<this.cartItems.length;i++){

      if(this.cartItems[i].id==this.onestart.id){
       this.cartService.saveCartItems2((i).toString(),{...this.onestart,size:this.cartItems[i].size,quantity:this.onestart.quantity}).subscribe({
         next:(data)=>{
           this.getItemFromData=data;
           // console.log(this.getItemFromData)
           // console.log(this.getItemFromData.quantity)
          //  console.log(this.user.quantity)
           console.log("2")
           this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
         }
       })
        break;
      }

   }

    // this.cartService.updateCartItemQuantity(this.onestart.id,this.onestart.quantity).subscribe({
    //   next:(data)=>{
    //     this.getItemFromData=data;
    //     console.log(data)
    //     console.log("updateCartItem")
    //     console.log(this.onestart.quantity)
    //     console.log("4")
    //     this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
    //   }
    //  })

    // this.cartService.updateCartItemQuantity(this.onestart.id,this.onestart.quantity).subscribe()
    // this.cartService.getItemById(this.onestart.id).subscribe({
    //   next:(data)=>{
    //     this.getItemFromData=data;
    //     this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
    //   }
    // })
  }
  else if(this.onestart.quantity==1) {
    this.onestart.quantity--;

    for(var i=0;i<this.cartItems.length;i++){

      if(this.cartItems[i].id==this.onestart.id){
       this.cartService.saveCartItems2((i).toString(),{...this.onestart,size:this.cartItems[i].size,quantity:this.onestart.quantity}).subscribe({
         next:(data)=>{
           this.getItemFromData=data;
           // console.log(this.getItemFromData)
           // console.log(this.getItemFromData.quantity)
          //  console.log(this.user.quantity)
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
    // this.cartService.updateCartItemQuantity(this.onestart.id,this.onestart.quantity).subscribe({
    //   next:(data)=>{
    //     this.getItemFromData=data;
    //     console.log(data)
    //     console.log("updateCartItem")
    //     console.log(this.onestart.quantity)
    //     console.log("4")
    //     this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
    //   }
    //  })

    // this.cartService.updateCartItemQuantity(this.onestart.id,this.onestart.quantity).subscribe()
    // this.cartService.getItemById(this.onestart.id).subscribe({
    //   next:(data)=>{
    //     this.getItemFromData=data;
    //     this.objectFromEventEmitter.emit(this.getItemFromData);   // sort of emit fire
    //   }
    // })
    // this.itemQuantity--;
    // this.cartService.removeItemFromOrder(this.onestart.id).subscribe()
  }
}
}

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(),
//     importProvidersFrom(
//       TranslateModule.forRoot({
//         loader: {
//           provide: TranslateLoader,
//           useFactory: HttpLoaderFactory,
//           deps: [HttpClient],
//         },
//       })
//     ),
//   ],
// });