import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StyleDirective12Component } from './components/style-directive12/style-directive12.component';
import { HomeComponent } from './components/home/home.component';
import { Enlarge12Directive } from './directives/enlarge12.directive';
import { ChangeColor12Directive } from './directives/change-color12.directive';
import { Vertical1Component } from './layout23/vertical1/vertical1.component';
import { fuseConfig } from './fuse-config';
import { FuseModule } from '../@fuse23/fuse23.module';
import { FuseSidebar12Component } from './layout23/fuse-sidebar12/fuse-sidebar12.component';
import { Footer12Component } from './layout23/footer12/footer12.component';
import { Toolbar12Component } from './layout23/toolbar12/toolbar12.component';
import { Navbar12Component } from './layout23/navbar12/navbar12.component';
import { NavbarChild01Component } from './layout23/navbar-child01/navbar-child01.component';
import { NavbarChild02Component } from './layout23/navbar-child02/navbar-child02.component';
import { NavbarChild03Component } from './layout23/navbar-child03/navbar-child03.component';
import { Navigation44Component } from './layout23/navigation44/navigation44.component';

@NgModule({
  declarations: [
    // Components
    AppComponent,
    HomeComponent,
    StyleDirective12Component,
    Vertical1Component,    

    // Directives
    Enlarge12Directive,
    ChangeColor12Directive,
    FuseSidebar12Component,
    Footer12Component,
    Toolbar12Component,
    Navbar12Component,
    NavbarChild01Component,
    NavbarChild02Component,
    NavbarChild03Component,
    Navigation44Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FuseModule.forRoot(fuseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
