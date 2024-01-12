import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';
import { IPizza } from '../../Interface/ipizza';
import { PizzaService } from '../../Service/pizza.service';
@Component({
  selector: 'app-deals',
  standalone: true,
  imports: [
    RouterModule,
  ],
  providers:[],
  templateUrl: './deals.component.html',
  styleUrl: './deals.component.css'
})
export class DealsComponent {
}
