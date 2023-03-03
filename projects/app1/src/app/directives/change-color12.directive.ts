import { Directive, ElementRef } from "@angular/core";

@Directive({
    selector: '[changeColor12]'
})
export class ChangeColor12Directive {
    constructor(private htmlElement: ElementRef) { }
    colors:string[] = ['red', 'blue', 'green', 'black']
    ngAfterViewInit() {
        setInterval(() => {
            this.htmlElement.nativeElement.style.color = this.colors[Math.floor(Math.random()*4)];
        }, 1500);
    }
}