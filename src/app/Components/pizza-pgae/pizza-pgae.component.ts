import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PizzaService } from '../Services/pizza.service';
import { FilterPipe } from '../../Pipes/filter.pipe';

@Component({
  selector: 'app-pizza-pgae',
  standalone: true,
  imports: [ProductCardComponent,HttpClientModule,FormsModule,CommonModule,FilterPipe],
  providers:[PizzaService],
  templateUrl: './pizza-pgae.component.html',
  styleUrl: './pizza-pgae.component.css'
})
export class PizzaPgaeComponent implements OnInit{
allPizzProducts:any
searchText: string = '';
constructor(private myApis:PizzaService){}
  ngOnInit(){
    this.myApis.getAllPizza().subscribe(
      {
        next:(data)=> {
          console.log(data)
          this.allPizzProducts=data
        },
        error:()=>console.log('Something went wrong')
      }
    )
  }

  trackByFn(index: number, item: any): any {
    return item.ID; // Assuming 'id' is a unique identifier property in your items
  }

}