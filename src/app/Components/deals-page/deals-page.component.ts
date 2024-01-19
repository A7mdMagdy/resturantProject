import { Component,Input, OnInit } from '@angular/core';
import { DealsCartComponent } from '../deals-cart/deals-cart.component';
import { SmallCartComponent } from '../small-cart/small-cart.component';
import { HttpClientModule } from '@angular/common/http';
import { PizzaService } from '../../Service/pizza.service';

@Component({
  selector: 'app-deals-page',
  standalone: true,
  imports: [DealsCartComponent,SmallCartComponent,HttpClientModule],
  providers: [PizzaService],
  templateUrl: './deals-page.component.html',
  styleUrl: './deals-page.component.css'
})
export class DealsPageComponent implements OnInit{
  alldeals:any[];
  @Input()sendDataFromParent:any
  @Input() receiveDataFromChild(quan:any){
    this.sendDataFromParent=quan
  }
  constructor(private myApis:PizzaService){
    this.alldeals = [];
  }
  ngOnInit(){
    this.myApis.getAllPizza().subscribe(
      {
        next:(data)=> {
          this.alldeals= data as any[];
          this.alldeals = this.alldeals.filter((deal) => deal.deals && (deal.dealsmallPrice || deal.dealmediumPrice || deal.deallargePrice));
        },
        error:()=>console.log('Something went wrong')
      }
    )
  }
}
