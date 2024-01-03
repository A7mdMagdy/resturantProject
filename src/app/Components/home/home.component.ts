import { Component } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { DealsComponent } from '../deals/deals.component';
import { DownloadComponent } from '../download/download.component';
import { ProductsComponent } from '../products/products.component';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselComponent,
    DealsComponent,
    DownloadComponent,
    ProductsComponent,
    ButtonComponent,
    MenuComponent,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
