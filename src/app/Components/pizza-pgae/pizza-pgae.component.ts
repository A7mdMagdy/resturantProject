import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../Pipes/filter.pipe';
import { PizzaService } from '../../Service/pizza.service';
import { IPizza } from '../../Interface/ipizza';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pizza-pgae',
  standalone: true,
  imports: [ProductCardComponent,HttpClientModule,FormsModule,CommonModule,FilterPipe,RouterModule],
  providers:[PizzaService],
  templateUrl: './pizza-pgae.component.html',
  styleUrl: './pizza-pgae.component.css'
})
export class PizzaPgaeComponent implements OnInit{
// allPizzProducts:any
allPizzProducts:IPizza[];
filteredpizza: IPizza[];
searchText: string = '';
constructor(private myApis:PizzaService){
  this.allPizzProducts =[];
  this.filteredpizza=[];
}
  ngOnInit(){
    this.myApis.getAllPizza().subscribe(
      {
        next:(data)=> {
          console.log(data)
          this.allPizzProducts= data as IPizza[];
          this.filteredpizza=data as IPizza[];
        },
        error:()=>console.log('Something went wrong')
      }
    )
  }

  
  
  // &&&&&&&&&&&&&&&&&&&
  // <<<<<<< (Sorting) >>>>>>>>>
sortId() {
  this.allPizzProducts.sort((a, b) => { return a.id - b.id })
}

sortHToL() {
  this.allPizzProducts.sort((a, b) => {
    let price1 = Number(a.Price.replace("EGP", "").trim());
    let price2 = Number(b.Price.replace("EGP", "").trim());
    return price2 - price1;
  })
}
sortLToH() {
  this.allPizzProducts.sort((a, b) => {
    let price1 = Number(a.Price.replace("EGP", "").trim());
    let price2 = Number(b.Price.replace("EGP", "").trim());
    return price1 - price2;
  })
}
// <<<<<<< (Filter Based on Size) >>>>>>>>>
Default() {
  this.allPizzProducts = Array.from(this.filteredpizza);
}

Large() {
  this.allPizzProducts = Array.from(this.filteredpizza);
  let arr = this.allPizzProducts.filter((pizza) => pizza.Sizes.includes("Large"));
  this.allPizzProducts.length = 0;
  Array.prototype.push.apply(this.allPizzProducts, arr);
}

Medium() {
  this.allPizzProducts = Array.from(this.filteredpizza);
  let arr = this.allPizzProducts.filter((pizza) => pizza.Sizes.includes("Medium"));
  this.allPizzProducts.length = 0;
  Array.prototype.push.apply(this.allPizzProducts, arr);
}

Small() {
  this.allPizzProducts = Array.from(this.filteredpizza);
  let arr = this.allPizzProducts.filter((pizza) => pizza.Sizes.includes("Small"));
  this.allPizzProducts.length = 0;
  Array.prototype.push.apply(this.allPizzProducts, arr);
}

}
// trackByFn(index: number, item: any): any {
//   return item.ID; // Assuming 'id' is a unique identifier property in your items
// }