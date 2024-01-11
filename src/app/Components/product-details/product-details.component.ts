import { Component, Inject, Input } from '@angular/core';
import { IPizza } from '../../Interface/ipizza';
import { RouterLink } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  selectedItem?: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,private dialogref:MatDialogRef<ProductDetailsComponent>) {
    this.selectedItem = data;
    // console.log(this.selectedItem);
  }


  close(){
    this.dialogref.close();
  }
}
