import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ProductCRUDService } from '../../Service/product-crud.service';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IPizza } from '../../Interface/ipizza';
import { filter } from 'rxjs';

@Component({
  selector: 'app-product-crud',
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule, CommonModule, ProductDetailsComponent, RouterModule],
  providers: [ProductCRUDService],
  templateUrl: './product-crud.component.html',
  styleUrl: './product-crud.component.css'
})
export class ProductCrudComponent implements OnInit {

  pizza: IPizza[];
  filteredpizza: IPizza[];
  constructor(private service: ProductCRUDService, private nav: Router) {
    this.pizza = [];
    this.filteredpizza = [];
  }

  ngOnInit(): void {
    this.service.getallpizza().subscribe({
      next: (data) => {
        this.pizza = data as IPizza[];
        this.filteredpizza = data as IPizza[];
      },
      error(err) { },
      complete() { }
    });
    // &&&&&&&&&&&&&&&&&&&&&&&&&&

  }
  // <<<<<<< (Sorting) >>>>>>>>>
  sortId() {
    this.pizza.sort((a, b) => { return a.id - b.id })
  }

  sortHToL() {
    this.pizza.sort((a, b) => {
      let price1 = Number(a.Price.replace("EGP", "").trim());
      let price2 = Number(b.Price.replace("EGP", "").trim());
      return price2 - price1;
    })
  }
  sortLToH() {
    this.pizza.sort((a, b) => {
      let price1 = Number(a.Price.replace("EGP", "").trim());
      let price2 = Number(b.Price.replace("EGP", "").trim());
      return price1 - price2;
    })
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


