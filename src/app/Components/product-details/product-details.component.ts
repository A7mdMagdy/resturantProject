import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterModule,MatDialogModule,FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
user:any;

constructor( 
  public dialogRef: MatDialogRef<ProductDetailsComponent>, 
  @Inject(MAT_DIALOG_DATA) public data: any) { } 

onCancel(): void { 
  this.dialogRef.close(); 
} 

}
