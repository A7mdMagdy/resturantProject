import { HttpClientModule } from '@angular/common/http';
import { Component, Input} from '@angular/core';
import { PizzaService } from '../../Service/pizza.service';
import { Router, RouterModule } from '@angular/router';
import {MatDialog, MatDialogModule,MatDialogRef} from '@angular/material/dialog';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [HttpClientModule,RouterModule,MatDialogModule,ProductDetailsComponent],
  providers:[PizzaService],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent{
@Input() user?:any
data:{}={name:'',animal:''};
constructor(private dialog: MatDialog) { }

openDialog() { 
  let dialogRef = this.dialog.open(ProductDetailsComponent, { 
    width: '500px',
    height:'500px',
    data : this.user}); 
  
  // console.log(this.user)
  // dialogRef.afterClosed().subscribe(result => { 
  //   this.animal = result; 
  // }); 

}



// @Component({
//   selector:'dialog-component',
//   styles:[''],
//   template:`
//   <h2 mat-dialog-title>Enter Query Name</h2>
// <mat-dialog-content>
//   <div class="card-group">
//     <div class="card">
//       <img src="/src/assets/Images/form.jpg" class="card-img-top">
//       <div class="card-body">
//         <h5 class="card-title">Card title</h5>
//         <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//       </div>
//       <div class="card-footer">
//         <small class="text-body-secondary">Last updated 3 mins ago</small>
//       </div>
//     </div>
// </div>
// </mat-dialog-content>
// <mat-dialog-actions align="end">
//   <button mat-button [mat-dialog-close]="false">Cancel</button>
//   <button mat-button [mat-dialog-close]="true" color="primary">Closee</button>
// </mat-dialog-actions>
//   `,
// })
// export class DialogComponentContent{


// }

}
