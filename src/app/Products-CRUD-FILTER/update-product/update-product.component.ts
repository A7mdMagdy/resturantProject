import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductCRUDService } from '../../Service/product-crud.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,HttpClientModule,FormsModule,CommonModule],
  providers:[ProductCRUDService],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {
  // updateProductForm:FormGroup;
  pizza:any;
  ID:number;
  productForm:FormGroup



  constructor(private service:ProductCRUDService ,private nav:Router,private URL:ActivatedRoute){
    this.ID = this.URL.snapshot.params["id"]
    this.productForm = new FormGroup({
        Name:new FormControl("",Validators.required),
        Description:new FormControl("",Validators.required),
        Sizes:new FormControl("",Validators.required),
        price:new FormControl(""),
        smallPrice:new FormControl("",Validators.required),
        mediumPrice:new FormControl(""),
        largePrice:new FormControl(""),
        Image:new FormControl("",Validators.required)
    })
    }
    
  ngOnInit(): void {
    this.service.getonepizza(this.ID).subscribe({
      next:(data)=>{
        this.productForm.patchValue(data);  //fetching data and pre-fill the form
        this.pizza=data
      }  
    })
  }
  
  get validName(){
    return this.productForm.controls['Name'].valid;
  }
  get validDesc(){
    return this.productForm.controls['Description'].valid;
  }get validSizes(){
    return this.productForm.controls['Sizes'].valid;
  }get validPrice(){
    return this.productForm.controls['Price'].valid;
  }get validImage(){
    return this.productForm.controls['Image'].valid;
  }


  update(Image:string){
    console.log(Image)
    this.pizza["Name"]        = this.productForm.value['Name'];
    this.pizza["Description"] = this.productForm.value['Description'];
    this.pizza["Sizes"]       = this.productForm.value['Sizes'];
    this.pizza["price"]       = Number(this.productForm.value['smallPrice']);
    this.pizza["smallPrice"]       =this.productForm.value['smallPrice'];
    this.pizza["mediumPrice"]       =this.productForm.value['mediumPrice'];
    this.pizza["largePrice"]       =this.productForm.value['largePrice'];
    if(Image != ""){
      this.pizza["Image"]       = 'assets/Images/Pizza/'+Image.substring(12,);
    }
    this.service.updatePizza(this.pizza['id'],this.pizza).subscribe({
      complete:()=> {this.nav.navigate(['/admin'])}
    })
  }

  // Update(n:string,d:string,s:string,p:number,i:string){
  //   console.log(this.pizza);      
  //     this.pizza["Name"]        = n;
  //     this.pizza["Description"] = d;
  //     this.pizza["Sizes"]       = s;
  //     this.pizza["price"]       = p;
  //     if(i!=''){
  //       this.pizza["Image"]       = 'assets/Images/Pizza/'+i.substring(12,);
  //     }
  //     console.log(this.pizza);      
  //     this.service.updatePizza(this.pizza['id'],this.pizza).subscribe({
  //       complete:()=> {this.nav.navigate(['/pizza'])}
  //     })
  //}
  

}

