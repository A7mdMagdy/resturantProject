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
  imports: [ReactiveFormsModule, CommonModule, RouterModule, HttpClientModule],
  providers: [ProductCRUDService],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  addProductForm: FormGroup;
  pizza?: any;
  sizelist: string[];
  allPizzProducts:any[];
  // Constructor
  constructor(private service: ProductCRUDService, private nav: Router) {
    this.pizza = { id: 0, Name: "", Description: "", Sizes: "", price: 0, Image: "" };
    this.sizelist = [];
    this.addProductForm = new FormGroup({
      Name: new FormControl("", [Validators.pattern('^[a-zA-Z ]{3,}$'), Validators.required]),
      Description: new FormControl("", [Validators.pattern('^[a-zA-Z,& ]{3,}$'), Validators.required]),
      smallPrice: new FormControl(null, [Validators.pattern('^[0-9]+')]),
      mediumPrice: new FormControl(null, [Validators.pattern('^[0-9]+')]),
      largePrice: new FormControl(null, [Validators.pattern('^[0-9]+')]),
      Image: new FormControl(null,Validators.required)
    })
    this.allPizzProducts=[]
  }

  get validName() {
    return this.addProductForm.controls['Name'].valid;
  }
  get validDescription() {
    return this.addProductForm.controls['Description'].valid;
  }
  get validss() {
    return this.addProductForm.controls['ss'].valid;
  }
  get validsm() {
    return this.addProductForm.controls['sm'].valid;
  }
  get validsl() {
    return this.addProductForm.controls['sl'].valid;
  }
  get validsmallPrice() {
    return this.addProductForm.controls['smallPrice'].valid;
  }
  get validmediumPrice() {
    return this.addProductForm.controls['mediumPrice'].valid;
  }
  get validlargePrice() {
    return this.addProductForm.controls['largePrice'].valid;
  }
  get validImage(){
    return this.addProductForm.controls['Image'].valid;
  }
  // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

  FilteredBySize(e: any) {
    if (e.target.checked) {
      this.sizelist.push(e.target.value)
    }
    else {
      this.sizelist = this.sizelist.filter(v => v != e.target.value)
    }
  }
  // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&

  Add() {

       this.service.getallpizza().subscribe(
      {
        next:(data:any)=>
        {
          this.allPizzProducts= data as any[];
          const num = this.allPizzProducts.length;
            this.pizza["Name"]        = this.addProductForm.value['Name'];
            this.pizza["Description"] = this.addProductForm.value['Description'];
            this.pizza["Sizes"] = this.sizelist.join(' | ');
            this.pizza["price"]       = Number(this.addProductForm.value['smallPrice']);
            //small
            if (this.sizelist.includes('Small')) this.pizza["smallPrice"] = this.addProductForm.value['smallPrice'];
            else  this.pizza["smallPrice"] = '' 
            //medium
            if (this.sizelist.includes('Medium'))  this.pizza["mediumPrice"] = this.addProductForm.value['mediumPrice'];
            else this.pizza["mediumPrice"] = ''
            //large
            if (this.sizelist.includes('Large')) this.pizza["largePrice"] = this.addProductForm.value['largePrice'];
            else this.pizza["largePrice"] = '' 
            this.pizza["Image"]       = 'assets/Images/Pizza/'+this.addProductForm.value["Image"].substring(12,);
            this.pizza["dealsmallPrice"]       =""
            this.pizza["dealmediumPrice"]       =""
            this.pizza["deallargePrice"]       =""
            this.pizza["id"] = this.allPizzProducts.length+1;
            this.pizza["quantity"] = 0;
            if(this.sizelist.includes('Small'))  this.pizza["price"] = Number(this.addProductForm.value['smallPrice']);
       else if(this.sizelist.includes('Medium')) this.pizza["price"] = Number(this.addProductForm.value['mediumPrice']);
       else if(this.sizelist.includes('Large'))  this.pizza["price"] = Number(this.addProductForm.value['largePrice']);
       
            this.service.updatePizza2((this.allPizzProducts.length).toString(),this.pizza).subscribe(
              {
                complete:()=> {this.nav.navigate(['/admin'])}
              }
            )
        },
        // complete:()=> {this.nav.navigate(['/admin'])}
      }
    )

    // // console.log(this.addProductForm.value['price']);
    // if (this.validName) {
    //   this.pizza["Name"] = this.addProductForm.value['Name'];
    //   this.pizza["Description"] = this.addProductForm.value['Description'];
    //   this.pizza["Sizes"] = this.sizelist.join(' | ');
    //   if (this.sizelist.includes('Small')) {
    //     this.pizza["smallPrice"] = this.addProductForm.value['smallPrice'];
    //   }else { this.pizza["smallPrice"] = '' }
    //   if (this.sizelist.includes('Medium')) {
    //     this.pizza["mediumPrice"] = this.addProductForm.value['mediumPrice'];
    //   }else { this.pizza["mediumPrice"] = '' }
    //   if (this.sizelist.includes('Large')) {
    //     this.pizza["largePrice"] = this.addProductForm.value['largePrice'];
    //   }else { this.pizza["largePrice"] = '' }
    //   this.pizza["Image"] = 'assets/Images/Pizza/' + this.addProductForm.value["Image"].substring(12,);
    //   if(this.sizelist.includes('Small'))
    //     this.pizza["price"] = Number(this.addProductForm.value['smallPrice']);
    //   else if(this.sizelist.includes('Medium'))
    //     this.pizza["price"] = Number(this.addProductForm.value['mediumPrice']);
    //   else if(this.sizelist.includes('Large'))
    //     this.pizza["price"] = Number(this.addProductForm.value['largePrice']);
    //     console.log(this.pizza)
    //   this.service.addpizza(this.pizza).subscribe({
    //     complete: () => { this.nav.navigate(['/admin']) }
    //   })
    // }
  }


}