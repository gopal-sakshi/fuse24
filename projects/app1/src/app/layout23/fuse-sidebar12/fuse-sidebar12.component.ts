import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { FuseConfigService } from 'projects/app1/src/@fuse23/fuse-config.service';
import { FuseSidebarService } from 'projects/app1/src/@fuse23/fuse-sidebar.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-fuse-sidebar12',
  templateUrl: './fuse-sidebar12.component.html',
  styleUrls: ['./fuse-sidebar12.component.scss']
})
export class FuseSidebar12Component {

  @Input() name!: string;
  @Input() key!: string;
  @Input() position!: "left" | "right";
  @HostBinding("class.open") opened!: boolean;
  @Input() lockedOpen!: string;
  @HostBinding("class.locked-open") isLockedOpen!: boolean;
  @Input() foldedWidth!: number;
  @Input() foldedAutoTriggerOnHover!: boolean;
  @HostBinding("class.unfolded") unfolded!: boolean;
  @Input() invisibleOverlay!: boolean;
  @Output() foldedChanged!: EventEmitter<boolean>;
  @Output() openedChanged!: EventEmitter<boolean>;


  // Private
  private _folded: boolean;
  private _fuseConfig: any;
  private _wasActive!: boolean;
  private _wasFolded!: boolean;
  private _player!: AnimationPlayer;
  private _backdrop: HTMLElement | null = null;  
  private _unsubscribeAll: Subject<any>;
  @HostBinding("class.animations-enabled") private _animationsEnabled: boolean;
  

  constructor(
    private _animationBuilder: AnimationBuilder,
    private _changeDetectorRef: ChangeDetectorRef,
    private _elementRef: ElementRef,
    private _fuseConfigService: FuseConfigService,    
    private _fuseSidebarService: FuseSidebarService,
    private _renderer: Renderer2
  ) {
    // Set the defaults
    this.foldedAutoTriggerOnHover = true;
    this.foldedWidth = 64;
    this.foldedChanged = new EventEmitter();
    this.openedChanged = new EventEmitter();
    this.opened = false;
    this.position = "left";
    this.invisibleOverlay = false;

    // Set the private defaults
    this._animationsEnabled = false;
    this._folded = false;
    this._unsubscribeAll = new Subject();
  }

  @Input()
  set folded(value: boolean) {    
    this._folded = value;
    if (!this.opened) { return; }
    let sibling, styleRule;
    const styleValue = this.foldedWidth + "px";    
    if (this.position === "left") { 
      sibling = this._elementRef.nativeElement.nextElementSibling;
      styleRule = "padding-left";
    } else {
      sibling = this._elementRef.nativeElement.previousElementSibling;
      styleRule = "padding-right";
    }
    
    if (!sibling) { return; }

    if (value) { 
      this.fold(); 
      this._renderer.setStyle( this._elementRef.nativeElement, "width", styleValue);
      this._renderer.setStyle( this._elementRef.nativeElement, "min-width", styleValue );
      this._renderer.setStyle( this._elementRef.nativeElement, "max-width", styleValue );
      this._renderer.setStyle(sibling, styleRule, styleValue);
      this._renderer.addClass(this._elementRef.nativeElement, "folded");
    }
    else {
      this.unfold();
      this._renderer.removeStyle(this._elementRef.nativeElement, "width");
      this._renderer.removeStyle(this._elementRef.nativeElement, "min-width");
      this._renderer.removeStyle(this._elementRef.nativeElement, "max-width");
      this._renderer.removeStyle(sibling, styleRule);
      this._renderer.removeClass(this._elementRef.nativeElement, "folded");
    }
    this.foldedChanged.emit(this.folded);
  }

  get folded(): boolean { return this._folded;  }

  ngOnInit(): void {
    // Subscribe to config changes
    this._fuseConfigService.config
      .pipe()
      .subscribe((config:any) => { this._fuseConfig = config; });
    this._fuseSidebarService.register(this.name, this);
    
    this._setupVisibility();    
    this._setupPosition();
    this._setupLockedOpen();
    this._setupFolded();
  }


  ngOnDestroy(): void {  
    if (this.folded) { this.unfold(); }    
    this._fuseSidebarService.unregister(this.name);    
    // this._unsubscribeAll.next();
    // this._unsubscribeAll.complete();
  }


  private _setupVisibility(): void {  
    this._renderer.setStyle(this._elementRef.nativeElement, "box-shadow", "none");    
    this._renderer.setStyle(this._elementRef.nativeElement, "visibility", "hidden");
  }

  private _setupPosition(): void {
    if (this.position === "right") { this._renderer.addClass(this._elementRef.nativeElement,"right-positioned"); } 
    else { this._renderer.addClass( this._elementRef.nativeElement, "left-positioned" ); }
  }

  private _setupLockedOpen(): void {
    if (!this.lockedOpen) { return; }
    this._wasActive = false;
    this._wasFolded = this.folded;
    this._showSidebar();
  }

  
  private _setupFolded(): void {  
    if (!this.folded) { return; }
    if (!this.opened) { return; }
    let sibling, styleRule;
    const styleValue = this.foldedWidth + "px";    
    if (this.position === "left") {
      sibling = this._elementRef.nativeElement.nextElementSibling;
      styleRule = "padding-left";
    } else {
      sibling = this._elementRef.nativeElement.previousElementSibling;
      styleRule = "padding-right";
    }
    if (!sibling) { return; }
    this.fold();
    this._renderer.setStyle( this._elementRef.nativeElement, "width", styleValue );
    this._renderer.setStyle( this._elementRef.nativeElement, "min-width", styleValue );
    this._renderer.setStyle( this._elementRef.nativeElement, "max-width", styleValue );
    this._renderer.setStyle(sibling, styleRule, styleValue);
    this._renderer.addClass(this._elementRef.nativeElement, "folded");
  }

  
  private _showBackdrop(): void {  
    this._backdrop = this._renderer.createElement("div");
    this._backdrop!.classList.add("fuse-sidebar-overlay");
    if (this.invisibleOverlay) { this._backdrop!.classList.add("fuse-sidebar-overlay-invisible"); }
    this._renderer.appendChild( this._elementRef.nativeElement.parentElement, this._backdrop );
    this._player = this._animationBuilder
      .build([animate("300ms ease", style({ opacity: 1 }))])
      .create(this._backdrop);

    this._player.play();
    this._backdrop!.addEventListener("click", () => { this.close(); });
    this._changeDetectorRef.markForCheck();
  }

  private _hideBackdrop(): void {
    if (!this._backdrop) { return; }
    this._player = this._animationBuilder
      .build([animate("300ms ease", style({ opacity: 0 }))])
      .create(this._backdrop);
    
    this._player.play();

    this._player.onDone(() => {      
      if (this._backdrop) {        
        this._backdrop!.parentNode!.removeChild(this._backdrop);
        this._backdrop = null;
      }
    });
    this._changeDetectorRef.markForCheck();
  }

  private _showSidebar(): void {
    this._renderer.removeStyle(this._elementRef.nativeElement, "box-shadow");
    this._renderer.removeStyle(this._elementRef.nativeElement, "visibility");
    this._changeDetectorRef.markForCheck();
  }

  private _hideSidebar(delay = true): void {
    const delayAmount = delay ? 300 : 0;    
    setTimeout(() => {      
      this._renderer.setStyle( this._elementRef.nativeElement, "box-shadow", "none" );
      this._renderer.setStyle( this._elementRef.nativeElement, "visibility", "hidden" );
    }, delayAmount);
    this._changeDetectorRef.markForCheck();
  }

  private _enableAnimations(): void {
    if (this._animationsEnabled) { return; }
    this._animationsEnabled = true;
    this._changeDetectorRef.markForCheck();
  }

  
  open(): void {
    if (this.opened || this.isLockedOpen) { return; }
    this._enableAnimations();
    this._showSidebar();
    this._showBackdrop();
    this.opened = true;
    this.openedChanged.emit(this.opened);
    this._changeDetectorRef.markForCheck();
  }

  close(): void {
    if (!this.opened || this.isLockedOpen) { return; }
    this._enableAnimations();
    this._hideBackdrop();
    this.opened = false;
    this.openedChanged.emit(this.opened);
    this._hideSidebar();
    this._changeDetectorRef.markForCheck();
  }

  
  toggleOpen(): void {
    if (this.opened) { this.close(); } 
    else { this.open(); }
  }

  
  @HostListener("mouseenter")
  onMouseEnter(): void {    
    if (!this.foldedAutoTriggerOnHover) { return; }
    this.unfoldTemporarily();
  }
  
  @HostListener("mouseleave")
  onMouseLeave(): void {   
    if (!this.foldedAutoTriggerOnHover) { return; }
    this.foldTemporarily();
  }
  
  fold(): void {   
    if (this.folded) { return; }
    this._enableAnimations();
    this.folded = true;
    this._changeDetectorRef.markForCheck();
  }
  
  unfold(): void {   
    if (!this.folded) { return; }
    this._enableAnimations();
    this.folded = false;
    this._changeDetectorRef.markForCheck();
  }
  
  toggleFold(): void {
    if (this.folded) { this.unfold(); } 
    else { this.fold(); }
  }
  
  foldTemporarily(): void {   
    if (!this.folded) { return; }
    this._enableAnimations();
    this.unfolded = false;
    const styleValue = this.foldedWidth + "px";
    this._renderer.setStyle( this._elementRef.nativeElement, "width", styleValue);
    this._renderer.setStyle( this._elementRef.nativeElement, "min-width", styleValue);
    this._renderer.setStyle( this._elementRef.nativeElement, "max-width", styleValue );
    this._changeDetectorRef.markForCheck();
  }

  unfoldTemporarily(): void {
    if (!this.folded) { return; }
    this._enableAnimations();
    this.unfolded = true;
    this._renderer.removeStyle(this._elementRef.nativeElement, "width");
    this._renderer.removeStyle(this._elementRef.nativeElement, "min-width");
    this._renderer.removeStyle(this._elementRef.nativeElement, "max-width");
    this._changeDetectorRef.markForCheck();
  }

}
