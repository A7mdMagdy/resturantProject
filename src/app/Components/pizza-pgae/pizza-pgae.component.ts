import { Component, Input, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../Pipes/filter.pipe';
import { PizzaService } from '../../Service/pizza.service';
import { IPizza } from '../../Interface/ipizza';
import { RouterModule } from '@angular/router';
import { SmallCartComponent } from '../small-cart/small-cart.component';

@Component({
  selector: 'app-pizza-pgae',
  standalone: true,
  imports: [
    ProductCardComponent,
    HttpClientModule,
    FormsModule,
    CommonModule,
    FilterPipe,
    RouterModule,
    SmallCartComponent
  ],
  providers:[PizzaService],
  templateUrl: './pizza-pgae.component.html',
  styleUrl: './pizza-pgae.component.css'
})
export class PizzaPgaeComponent implements OnInit{
// allPizzProducts:any
@Input()sendDataFromParent:any
@Input() receiveDataFromChild(quan:any){
  // console.log(quan.quantity+"  from getQuantity new")
  this.sendDataFromParent=quan
}
allPizzProducts:any[];
filteredpizza: any[];
searchText: string = '';
listCheckBox:string[];
constructor(private myApis:PizzaService){
  this.allPizzProducts =[];
  this.filteredpizza=[];
  this.listCheckBox=[];
}
  ngOnInit(){
    this.myApis.getAllPizza().subscribe(
      {
        next:(data)=> {
          this.allPizzProducts= data as any[];
          this.filteredpizza=data as any[];
        },
        error:()=>console.log('Something went wrong')
      }
    )
  }

  
  
  // &&&&&&&&&&&&&&&&&&&
  // <<<<<<< (Filter Based on Sorting) >>>>>>>>>
sortId() {
  this.allPizzProducts.sort((a, b) => { return a.id - b.id })
}

sortHToL() {
  // sort based on price is string 
  // this.allPizzProducts.sort((a, b) => {
  //   let price1 = Number(a.Price.replace("EGP", "").trim());
  //   let price2 = Number(b.Price.replace("EGP", "").trim());
  //   return price2 - price1;
  // })
  // sort based on price is number
  this.allPizzProducts.sort((a,b)=>{return b.price - a.price})
  console.log(this.allPizzProducts)

}
sortLToH() {
  // sort based on price is string
  // this.allPizzProducts.sort((a, b) => {
  //   let price1 = Number(a.Price.replace("EGP", "").trim());
  //   let price2 = Number(b.Price.replace("EGP", "").trim());
  //   return price1 - price2;
  // })
  // sort based on price is number
  this.allPizzProducts.sort((a,b)=>{return a.price - b.price})
}

// <<<<<<< (Filter Based on Size) >>>>>>>>>
FilteredBySize(e:any){

  if(e.target.checked)
  {
    // 1) push the checked element in this listcheckbox array
    this.listCheckBox.push((e.target.value))  
    // 2) get original data without filtering in order to filtered it with new listcheckbox 
    this.allPizzProducts = Array.from(this.filteredpizza); 
    // 3) filter the all pizza products depending on the list of checked elements array then save it in arr variable
    let arr = this.allPizzProducts.filter((pizza)=>this.listCheckBox.find(e=>pizza.Sizes.includes(e))); // (pizza) => pizza.Sizes.split('|').some(i=>this.listCheckBox.includes(i))
    // 4) now we need to empty the all pizza products to push the filtered pizza items  
    this.allPizzProducts.length = 0;
    // 5) finally push the filtered pizza items in arr variable to the allpizzaproduct array  
    Array.prototype.push.apply(this.allPizzProducts, arr);
  }
  else
  {
    // 1) update the checkbox list when unchecked happend
    this.listCheckBox = this.listCheckBox.filter(v=>v!=e.target.value)
    // 2) make sure that checkbox list has checked elements or no if no we get the original data with all pizza items
    if(this.listCheckBox.length == 0)
    {
      this.allPizzProducts = Array.from(this.filteredpizza);
    }
    // 2.1) if the list checkbox has checked elements now we need to filter the original data with new checked elements 
    else
    {
      // 2) get original data without filtering in order to filtered it with new listcheckbox 
      this.allPizzProducts = Array.from(this.filteredpizza);
      // 3) filter the all pizza products depending on the list of checked elements array then save it in arr variable
      let arr = this.allPizzProducts.filter((pizza)=>this.listCheckBox.find(e=>pizza.Sizes.includes(e))); // (pizza) => pizza.Sizes.split('|').some(i=>this.listCheckBox.includes(i))    
      // 4) now we need to empty the all pizza products to push the filtered pizza items 
      this.allPizzProducts.length = 0;
      // 5) finally push the filtered pizza items in arr variable to the allpizzaproduct array  
      Array.prototype.push.apply(this.allPizzProducts, arr);
    }
  }

}




}