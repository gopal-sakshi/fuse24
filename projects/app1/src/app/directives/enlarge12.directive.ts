import { Directive, ElementRef } from "@angular/core";

@Directive({
    selector: '[enlarge12]'
})
export class Enlarge12Directive {
    constructor(private htmlElement: ElementRef) { }
    ngAfterViewInit() {
        setTimeout(() => {
            this.htmlElement.nativeElement.style.fontSize = '25px';
        }, 1000);
    }
}