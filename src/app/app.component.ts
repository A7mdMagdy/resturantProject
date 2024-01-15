import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { HomeComponent } from './Components/home/home.component';
import { OperationService } from './Service/operation.service';

// import{TranslateLoader,TranslateModule} from '@ngx-translate/core';

// import * as httpLoader from '@ngx-translate/http-loader';

// import {HttpClient, HttpClientModule} from '@angular/common/http';
// import { TranslateService } from '@ngx-translate/core';

// export function TranslateHttpLoader(http:HttpClient){
//   return new httpLoader.TranslateHttpLoader(http);
// }

// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
// import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http);
// }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
      CommonModule, 
      RouterOutlet,
      HeaderComponent,
      FooterComponent,
      // BrowserModule,
      // HttpClientModule,
      // TranslateModule.forRoot({
      //   loader: {
      //     provide: TranslateLoader,
      //     useFactory: HttpLoaderFactory,
      //     deps: [ HttpClient ]
      //   }
      // })
      
  ],
  providers:[OperationService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'resturantProject';

  // constructor(private translateservice:TranslateService){}

  // translate(event:any)
  // {
  //   this.translateservice.use(event.target.value)
  // }
}
