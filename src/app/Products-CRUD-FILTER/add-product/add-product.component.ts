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
  pizza?:any;
  // Constructor
  constructor(private service:ProductCRUDService ,private nav:Router){
    this.pizza={ id:0, Name: "", Description: "", Sizes: "", price: 0, Image: "" };

    this.addProductForm = new FormGroup({
      Name:new FormControl("",Validators.pattern('^[a-zA-Z ]{3,}$')),
      Description:new FormControl(""),
      Sizes:new FormControl(""),
      price:new FormControl(""),
      smallPrice:new FormControl(""),
      mediumPrice:new FormControl(""),
      largePrice:new FormControl(""),
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
    return this.addProductForm.controls['price'].valid;
  }


  Add(){
    // console.log(this.addProductForm.value['price']);
    if(this.validName){
      this.pizza["Name"]        = this.addProductForm.value['Name'];
      this.pizza["Description"] = this.addProductForm.value['Description'];
      this.pizza["Sizes"]       = this.addProductForm.value['Sizes'];
      this.pizza["price"]       = Number(this.addProductForm.value['smallPrice']);
      this.pizza["smallPrice"]       ="EGP "+ this.addProductForm.value['smallPrice'];
      this.pizza["mediumPrice"]       ="EGP "+ this.addProductForm.value['mediumPrice'];
      this.pizza["largePrice"]       ="EGP "+ this.addProductForm.value['largePrice'];
      this.pizza["Image"]       = 'assets/Images/Pizza/'+this.addProductForm.value["Image"].substring(12,);
            
      this.service.addpizza(this.pizza).subscribe({
        complete:()=> {this.nav.navigate(['/admin'])}
      })
    }
  }
  
  
}
