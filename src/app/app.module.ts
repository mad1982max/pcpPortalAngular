import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainWithPlatformsComponent } from './main-with-platforms/main-with-platforms.component';
import { FooterComponent } from './footer/footer.component';
import { PlatformSchemeComponent } from './platform-scheme/platform-scheme.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FloorSchemeComponent } from './floor-scheme/floor-scheme.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainWithPlatformsComponent,
    FooterComponent,
    PlatformSchemeComponent,
    NotFoundComponent,
    FloorSchemeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
