import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ProfileComponent } from './Components/profile/profile.component';

export const routes: Routes = 
[
    {path: '', component:HomeComponent},
    {path: 'home', component:HomeComponent},
    {path: 'about-us', component:AboutUsComponent},
    {path: 'viewAll', component:AboutUsComponent},
    {path: 'profile',component:ProfileComponent}
];
