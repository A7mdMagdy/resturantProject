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
  sizes:string;
  sizelist:string[];
  pizzaItems:any[];
  updateProductForm:FormGroup

  constructor(private service:ProductCRUDService ,private nav:Router,private URL:ActivatedRoute){
    this.ID = this.URL.snapshot.params["id"];
    this.sizes = '';
    this.sizelist =[]
    this.pizzaItems=[];
    this.updateProductForm = new FormGroup({
      Name: new FormControl("", [Validators.pattern('^[a-zA-Z ]{3,}$'), Validators.required]),
      Description: new FormControl("", [Validators.pattern('^[a-zA-Z,& ]{3,}$'), Validators.required]),
      ss:new FormControl(),
      sm:new FormControl(),
      sl:new FormControl(),
      smallPrice: new FormControl(null, [Validators.pattern('^[0-9]+')]),
      mediumPrice: new FormControl(null, [Validators.pattern('^[0-9]+')]),
      largePrice: new FormControl(null, [Validators.pattern('^[0-9]+')]),
      // image: new FormControl(null,Validators.required)
    })
    }
    
  ngOnInit(): void {
    this.service.getallpizza().subscribe({
      next:(data:any)=>{
        // this.pizza=data;
        // this.sizes = this.pizza.Sizes;
        // this.sizelist = this.pizza.Sizes.replace(/\s/g, '').split('|');
        // this.updateProductForm.patchValue(data);  //fetching data and pre-fill the form
        this.pizzaItems = data;
        for(let i=0;i<data.length;i++){
          if(data[i].id==this.ID)
          {
            this.updateProductForm.patchValue(data[i]);  //fetching data and pre-fill the form
            this.pizza=data[i]
            this.sizes = this.pizza.Sizes;
            this.sizelist = this.pizza.Sizes.replace(/\s/g, '').split('|');
          }
        }
        console.log(this.pizza);
      },
      complete:()=>{
        if(this.sizes.includes('Small')){
          this.updateProductForm.patchValue({
            ss:true,
            smallPrice:this.pizza['smallPrice']
          });
        }
        if(this.sizelist.includes('Medium')){
          this.updateProductForm.patchValue({
            sm:true,
            mediumPrice:this.pizza['mediumPrice']
          });
        }
        if(this.sizelist.includes('Large')){
          this.updateProductForm.patchValue({
            sl:true,
            largePrice:this.pizza['largePrice']
          });
        }
      }
    })
  }
  
  get validName() {
    return this.updateProductForm.controls['Name'].valid;
  }
  get validDescription() {
    return this.updateProductForm.controls['Description'].valid;
  }
  get validsmallPrice() {
    return this.updateProductForm.controls['smallPrice'].valid;
  }
  get validmediumPrice() {
    return this.updateProductForm.controls['mediumPrice'].valid;
  }
  get validlargePrice() {
    return this.updateProductForm.controls['largePrice'].valid;
  }
  // get validImage(){
  //   return this.updateProductForm.controls['image'].valid;
  // }


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

  update(Image:string){
    this.pizza["Name"]        = this.updateProductForm.value['Name'];
    this.pizza["Description"] = this.updateProductForm.value['Description'];
    this.pizza["Sizes"] = this.sizelist.join(' | ');
    if (this.sizelist.includes('Small')) {
      this.pizza["smallPrice"] = this.updateProductForm.value['smallPrice'];
    }else{ this.pizza["smallPrice"] = ''; }
    if (this.sizelist.includes('Medium')) {
      this.pizza["mediumPrice"] = this.updateProductForm.value['mediumPrice'];
    }else{  this.pizza["mediumPrice"] = ''; }
    if (this.sizelist.includes('Large')) {
      this.pizza["largePrice"] = this.updateProductForm.value['largePrice'];
    }else{  this.pizza["largePrice"] = '' }

    if(Image != ""){
      this.pizza["Image"]       = 'assets/Images/Pizza/'+Image.substring(12,);
    }
    if(this.sizelist.includes('Small'))
        this.pizza["price"] = Number(this.updateProductForm.value['smallPrice']);
      else if(this.sizelist.includes('Medium'))
        this.pizza["price"] = Number(this.updateProductForm.value['mediumPrice']);
      else if(this.sizelist.includes('Large'))
        this.pizza["price"] = Number(this.updateProductForm.value['largePrice']);
    
    // this.service.updatePizza(this.pizza['id'],this.pizza).subscribe({
    //   complete:()=> {this.nav.navigate(['/admin'])}
    // })
   for(let i=0;i<this.pizzaItems.length;i++){
    if(this.pizzaItems[i].id==this.ID)
    {
      this.service.updateItem(i.toString(),this.pizza).subscribe(
        {
          complete:()=> {this.nav.navigate(['/admin'])}
        }
         )
      break;
    }
   }
    
  }

}
