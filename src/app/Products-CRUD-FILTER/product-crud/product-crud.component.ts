import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ProductCRUDService } from '../../Service/product-crud.service';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { Router, RouterModule } from '@angular/router';
import { PizzaService } from '../../Service/pizza.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-product-crud',
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule, CommonModule, ProductDetailsComponent, RouterModule],
  providers: [PizzaService],
  templateUrl: './product-crud.component.html',
  styleUrl: './product-crud.component.css'
})
export class ProductCrudComponent implements OnInit {

  pizza: any[];
  filteredpizza: any[];
  originalPizza: any[];
  DiscountedPizza?: any;
  DiscountedPrice: string;
  DiscountedSize: string;
  OldPrice: number;
  counter: number;
  checked: string;
  constructor(private service: PizzaService, private nav: Router) {
    this.pizza = [];
    this.filteredpizza = [];
    this.DiscountedPrice = '';
    this.DiscountedSize = '';
    this.OldPrice = 0;
    this.originalPizza = [];
    this.counter = 0;
    this.checked = '';
  }

  ngOnInit(): void {
    this.service.getAllPizza().subscribe({
      next: (data) => {
        this.pizza = data as any[];
        this.originalPizza = data as any[];
        this.filteredpizza = data as any[];
      },
      error(err) { },
      complete() { }
    });
  }

  // &&&&&&&&&&&&&&&&&&&&&&&&&&
  // &&&&&&&&&&&&&&&&&&&&&&&&&&
  DeletePizza(Id: number) {
    // if (confirm("Sure?") == true) {
    //   this.service.deletePizzaByID(Id).subscribe({
    //     complete: () => {
    //       let arr = this.pizza.filter((pizza: any) => pizza.id != Id);
    //       this.pizza.length = 0;
    //       Array.prototype.push.apply(this.pizza, arr);
    //     }
    //   })
    // }
    if (confirm("Sure?") == true) {
      this.pizza = this.pizza.filter(item => item.id != Id)
      this.service.afterDeleteItem(this.pizza).subscribe()
    }
  }
  // &&&&&&&&&&&&&&&&&&&&&&&&&&
  // &&&&&&&&&&&&&&&&&&&&&&&&&&
  check(e: any, id: string) {
    this.DiscountedPrice = '';
    document.getElementById('DiscountInput+' + id)?.setAttribute('style', 'display:none;')
    if (e.target.checked) {
      this.counter += 1;
      if (this.counter == 1) {
        this.checked = e.target.id;
        document.getElementById(id)?.setAttribute('style', 'display:block;')
      }
    }
    else {
      this.counter--;
      document.getElementById(id)?.setAttribute('style', 'display:none;')
    }
  }
  // ******************
  setDiscountedSize(e: any, id: string) {
    if (e.target.name) {
      document.getElementById("DiscountInput+" + id)?.setAttribute('style', 'display:block')
      this.DiscountedSize = e.target.name;
      let selectedPizza = this.pizza.find((pizza: any) => pizza.id == id);
      // console.log(selectedPizza);
      if (this.DiscountedSize.includes('smallPrice') && selectedPizza['dealsmallPrice']) {
        this.DiscountedPrice = selectedPizza['dealsmallPrice'];
      }
      else if (this.DiscountedSize.includes('mediumPrice') && selectedPizza['dealmediumPrice']) {
        this.DiscountedPrice = selectedPizza['dealmediumPrice'];
      }
      else if (this.DiscountedSize.includes('largePrice') && selectedPizza['deallargePrice']) {
        this.DiscountedPrice = selectedPizza['deallargePrice'];
      }
      else { this.DiscountedPrice = selectedPizza[this.DiscountedSize]; }

    }
    else {
      this.DiscountedPrice = '';
      document.getElementById("DiscountInput+" + id)?.setAttribute('style', 'display:none')
    }
  }
  // ******************
  setDiscountedPrice(id: number) {
    this.DiscountedPizza = this.pizza.find((pizza: any) => pizza.id == id);
    if(this.DiscountedPrice < this.DiscountedPizza[this.DiscountedSize]) {
      if (this.DiscountedSize.includes('smallPrice')) {
        this.DiscountedPizza['dealsmallPrice'] = this.DiscountedPrice;
        this.DiscountedPizza.deals = true;
      }
      else if (this.DiscountedSize.includes('mediumPrice')) {
        this.DiscountedPizza['dealmediumPrice'] = this.DiscountedPrice;
        this.DiscountedPizza.deals = true;
      }
      else if (this.DiscountedSize.includes('largePrice')) {
        this.DiscountedPizza['deallargePrice'] = this.DiscountedPrice;
        this.DiscountedPizza.deals = true;
      }
      else { this.DiscountedPizza.deals = false }
      
      for (let i = 0; i < this.originalPizza.length; i++) {
        if (this.originalPizza[i].id == id) {
          this.service.updateItem(i.toString(), this.DiscountedPizza).subscribe(
            {
              complete: () => { this.nav.navigate(['/admin']) }
            }
          )
          break;
        }
      }
    }

    // this.service.updatePizza(id, this.DiscountedPizza).subscribe({
    //   complete: () => { }
    // })
  }
  // &&&&&&&&&&&&&&&&&&&&&&&&&&
  // &&&&&&&&&&&&&&&&&&&&&&&&&&
  // <<<<<<< (Sorting) >>>>>>>>>
  sortId() {
    this.pizza.sort((a, b) => { return a.id - b.id })
  }

  sortHToL() {
    // Sort Based on price is string
    // this.pizza.sort((a, b) => {
    //   let price1 = Number(a.Price.replace("EGP", "").trim());
    //   let price2 = Number(b.Price.replace("EGP", "").trim());
    //   return price2 - price1;
    // })
    // Sort Based on price is number
    this.pizza.sort((a, b) => { return b.price - a.price });
  }
  sortLToH() {
    // Sort Based on price is string
    // this.pizza.sort((a, b) => {
    //   let price1 = Number(a.Price.replace("EGP", "").trim());
    //   let price2 = Number(b.Price.replace("EGP", "").trim());
    //   return price1 - price2;
    // })
    // Sort Based on price is number
    this.pizza.sort((a, b) => { return a.price - b.price });
  }
  // <<<<<<< (Filter Based on Size) >>>>>>>>>
  Default() {
    this.pizza = Array.from(this.filteredpizza);
  }

  Large() {
    this.pizza = Array.from(this.filteredpizza);
    let arr = this.pizza.filter((pizza) => pizza.Sizes.includes("Large"));
    this.pizza.length = 0;
    Array.prototype.push.apply(this.pizza, arr);
  }

  Medium() {
    this.pizza = Array.from(this.filteredpizza);
    let arr = this.pizza.filter((pizza) => pizza.Sizes.includes("Medium"));
    this.pizza.length = 0;
    Array.prototype.push.apply(this.pizza, arr);
  }

  Small() {
    this.pizza = Array.from(this.filteredpizza);
    let arr = this.pizza.filter((pizza) => pizza.Sizes.includes("Small"));
    this.pizza.length = 0;
    Array.prototype.push.apply(this.pizza, arr);
  }

}


