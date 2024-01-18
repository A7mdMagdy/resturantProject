import { Component, Input, OnInit } from '@angular/core';
import { ProductCRUDService } from '../../Service/product-crud.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IPizza } from '../../Interface/ipizza';
import { PizzaService } from '../../Service/pizza.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [HttpClientModule,RouterModule,CommonModule],
  providers:[PizzaService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  onePizza?:any;
  Id:number;
  
  constructor(private service:PizzaService,private URL:ActivatedRoute,private nav:Router){
    this.Id = URL.snapshot.params['id'];
  }
  
  ngOnInit(): void {
    this.service.getPizzaByID2((this.Id-1).toString()).subscribe({
      next:(data)=>{this.onePizza = data;}
    })
  }

  DeletePizza(Id:number){
    if(confirm("Sure?") == true){
      this.service.deletePizzaByID(Id).subscribe({
        complete:()=>{this.nav.navigate(['/admin'])}
      })
    }
  }


}
