import { Component } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { DealsComponent } from '../deals/deals.component';
import { DownloadComponent } from '../download/download.component';
import { ProductsComponent } from '../products/products.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselComponent,
    DealsComponent,
    DownloadComponent,
    ProductsComponent,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
