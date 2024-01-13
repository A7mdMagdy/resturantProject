import { Component,Input,OnInit  } from '@angular/core';
import { StartersService } from '../../Service/starters.service';
import { HttpClientModule } from '@angular/common/http';
// import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OnestarterComponent } from '../onestarter/onestarter.component';
import { SmallCartComponent } from '../small-cart/small-cart.component';

@Component({
  selector: 'app-starters',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    OnestarterComponent,
    SmallCartComponent
  ],
  providers:[StartersService],
  templateUrl: './starters.component.html',
  styleUrl: './starters.component.css'
})
export class StartersComponent implements OnInit{
  
allProducts:any;
@Input()sendDataFromStarters:any
@Input() receiveDataFromOnestarter(quan:any){
  this.sendDataFromStarters=quan
}
constructor(private myApis:StartersService){}
  ngOnInit(){
    this.myApis.getAllStarters().subscribe(
      {
        next:(data)=> {
          this.allProducts= data;
        },
        error:()=>console.log('Something went wrong')
      }
    )
  }
}
