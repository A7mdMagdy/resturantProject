import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';
import { PizzaService } from '../../Service/pizza.service';
import { IPizza } from '../../Interface/ipizza';

@Component({
  selector: 'app-deals',
  standalone: true,
  imports: [RouterModule,ProductCardComponent],
  providers:[PizzaService],
  templateUrl: './deals.component.html',
  styleUrl: './deals.component.css'
})
export class DealsComponent implements OnInit{
 oneproduct:IPizza;
 constructor(private service:PizzaService){
  this.oneproduct = { id:0, Name: "", Description: "", Sizes: "", Price: "", Image: "" };
 }
  ngOnInit(): void {
    this.service.getPizzaByID(5).subscribe({
      next:(data)=>{
        this.oneproduct = data as IPizza;
      }
    })
  }


}
