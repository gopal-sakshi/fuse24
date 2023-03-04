import { Component, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar12',
  templateUrl: './navbar12.component.html',
  styleUrls: ['./navbar12.component.scss']
})
export class Navbar12Component {

   _variant: string;

   constructor(private _elementRef: ElementRef, private _renderer: Renderer2) { this._variant = "vertical-style-1"; }
   
   get variant(): string { return this._variant; }
 
   @Input()
   set variant(value: string) {     
     this._renderer.removeClass(this._elementRef.nativeElement, this.variant); 
     this._variant = value;
     this._renderer.addClass(this._elementRef.nativeElement, value);
    }
}