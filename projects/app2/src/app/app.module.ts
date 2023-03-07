import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Upload23Component } from './uploadStuff/upload23/upload23.component';
import { Upload24Component } from './uploadStuff/upload24/upload24.component';

@NgModule({
  declarations: [
    AppComponent,
    Upload23Component,
    Upload24Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
