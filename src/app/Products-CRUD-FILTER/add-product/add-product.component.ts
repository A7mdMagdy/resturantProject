import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPizza } from '../../Interface/ipizza';
import { ProductCRUDService } from '../../Service/product-crud.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule,HttpClientModule],
  providers:[ProductCRUDService],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent{
  addProductForm:FormGroup;
  pizza:IPizza;
  // Constructor
  constructor(private service:ProductCRUDService ,private nav:Router){
    this.pizza={ id:0, Name: "", Description: "", Sizes: "", Price: "", Image: "" };

    this.addProductForm = new FormGroup({
      Name:new FormControl("",Validators.pattern('^[a-zA-Z ]{3,}$')),
      Description:new FormControl(""),
      Sizes:new FormControl(""),
      Price:new FormControl(""),
      Image:new FormControl()
    })
  }
  
  get validName(){
    return this.addProductForm.controls['Name'].valid;
  }
  get validDescription(){
    return this.addProductForm.controls['Description'].valid;
  }
  get validSizes(){
    return this.addProductForm.controls['Sizes'].valid;
  }
  get validPrice(){
    return this.addProductForm.controls['Price'].valid;
  }


  Add(){
    if(this.validName){
      this.pizza["Name"]        = this.addProductForm.value['Name'];
      this.pizza["Description"] = this.addProductForm.value['Description'];
      this.pizza["Sizes"]       = this.addProductForm.value['Sizes'];
      this.pizza["Price"]       = " EGP "+this.addProductForm.value['Price']+" ";
      this.pizza["Image"]       = 'assets/Images/Pizza/'+this.addProductForm.value["Image"].substring(12,);
            
      this.service.addpizza(this.pizza).subscribe({
        complete:()=> {this.nav.navigate(['/pizza'])}
      })
    }
  }
  
  
}
