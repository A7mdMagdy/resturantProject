import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';
import { IPizza } from '../../Interface/ipizza';
import { PizzaService } from '../../Service/pizza.service';
@Component({
  selector: 'app-deals',
  standalone: true,
  imports: [RouterModule,ProductCardComponent],
  providers:[PizzaService],
  templateUrl: './deals.component.html',
  styleUrl: './deals.component.css'
})
export class DealsComponent {
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
