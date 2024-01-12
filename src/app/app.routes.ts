import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { PizzaPgaeComponent } from './Components/pizza-pgae/pizza-pgae.component';
import { AddProductComponent } from './Products-CRUD-FILTER/add-product/add-product.component';
import { UpdateProductComponent } from './Products-CRUD-FILTER/update-product/update-product.component';
import { MyCartComponent } from './Components/my_cart/my-cart.component';
import { ProductDetailsComponent } from './Products-CRUD-FILTER/product-details/product-details.component';
import { ProductCrudComponent } from './Products-CRUD-FILTER/product-crud/product-crud.component';
import { StartersComponent } from './Components/starters/starters.component';
import { DealsPageComponent } from './Components/deals-page/deals-page.component';

export const routes: Routes = 
[
    {path:'', component:HomeComponent},
    {path:'home', component:HomeComponent},
    {path:'about-us', component:AboutUsComponent},
    {path:'viewAll', component:AboutUsComponent},
    {path:'profile',component:ProfileComponent},
    {path:'pizza',component:PizzaPgaeComponent},
    {path:'pizza/addpizza',component:AddProductComponent},
    {path:'pizza/updatepizza/:id',component:UpdateProductComponent},
    {path:'mycart',component:MyCartComponent},
    {path:'admin',component:ProductCrudComponent},    // Admin product details
    {path:'admin/ProductDetails/:id',component:ProductDetailsComponent}, // Admin Product Details
    {path:'starters',component:StartersComponent},
    {path:'deals',component:DealsPageComponent} // Starters
];
