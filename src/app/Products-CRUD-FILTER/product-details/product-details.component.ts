import { Component, Input, OnInit } from '@angular/core';
import { ProductCRUDService } from '../../Service/product-crud.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IPizza } from '../../Interface/ipizza';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [HttpClientModule,RouterModule],
  providers:[ProductCRUDService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  onePizza:IPizza;
  Id:number;
  
  constructor(private service:ProductCRUDService,private URL:ActivatedRoute,private nav:Router){
    this.onePizza={ id:0, Name: "", Description: "", Sizes: "", Price: "", Image: "" };
    this.Id = URL.snapshot.params['id'];
  }
  
  ngOnInit(): void {
    this.service.getonepizza(this.Id).subscribe({
      next:(data)=>{this.onePizza = data as IPizza}
    })
  }

  DeletePizza(Id:number){
    if(confirm("Sure?") == true){
      this.service.delpizza(Id).subscribe({
        complete:()=>{this.nav.navigate(['/'])}
      })
    }
  }


}
