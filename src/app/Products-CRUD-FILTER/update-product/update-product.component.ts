import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPizza } from '../../Interface/ipizza';
import { ProductCRUDService } from '../../Service/product-crud.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,HttpClientModule,FormsModule],
  providers:[ProductCRUDService],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {
  // updateProductForm:FormGroup;
  pizza:IPizza;
  ID:number;

  constructor(private service:ProductCRUDService ,private nav:Router,private URL:ActivatedRoute){
    this.ID = this.URL.snapshot.params["id"]
    this.pizza={ id:0, Name: "", Description: "", Sizes: "", Price: "", Image: "" };
    // console.log(this.pizza)
    // this.updateProductForm = new FormGroup({
      //   Name:new FormControl(this.pizza["Name"],Validators.pattern('^[a-zA-Z ]{3,}$')),
      //   Description:new FormControl(this.pizza["Description"]),
      //   Sizes:new FormControl(this.pizza["Sizes"]),
      //   Price:new FormControl(this.pizza["Price"]),
      //   Image:new FormControl(this.pizza["Image"])
      // })
    }
    
  ngOnInit(): void {
    this.service.getonepizza(this.ID).subscribe({
      next:(data)=>{this.pizza = data as IPizza;console.log(this.pizza)}
    })
  }
  
  // get validName(){
  //   return this.updateProductForm.controls['Name'].valid;
  // }


  Update(n:string,d:string,s:string,p:string,i:string){
    console.log(this.pizza);      
      this.pizza["Name"]        = n;
      this.pizza["Description"] = d;
      this.pizza["Sizes"]       = s;
      this.pizza["Price"]       = p;
      if(i!=''){
        this.pizza["Image"]       = 'assets/Images/Pizza/'+i.substring(12,);
      }
      console.log(this.pizza);      
      this.service.updatePizza(this.pizza['id'],this.pizza).subscribe({
        complete:()=> {this.nav.navigate(['/pizza'])}
      })
  }

  
}
