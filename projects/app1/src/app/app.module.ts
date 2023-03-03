import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StyleDirective12Component } from './components/style-directive12/style-directive12.component';
import { HomeComponent } from './components/home/home.component';
import { Enlarge12Directive } from './directives/enlarge12.directive';
import { ChangeColor12Directive } from './directives/change-color12.directive';
import { Vertical1Component } from './layout23/vertical1/vertical1.component';
import { Vertical2Component } from './layout23/vertical2/vertical2.component';

@NgModule({
  declarations: [
    // Components
    AppComponent,
    HomeComponent,
    StyleDirective12Component,
    Vertical1Component,
    Vertical2Component,

    // Directives
    Enlarge12Directive,
    ChangeColor12Directive
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
