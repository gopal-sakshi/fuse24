import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FuseConfigService } from 'projects/app1/src/@fuse23/fuse-config.service';
import { FuseNavigationService } from 'projects/app1/src/@fuse23/fuse-navigation.service';
import { FuseSidebarService } from 'projects/app1/src/@fuse23/fuse-sidebar.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar-child03',
  templateUrl: './navbar-child03.component.html',
  styleUrls: ['./navbar-child03.component.scss']
})
export class NavbarChild03Component {
  
  fuseConfig: any;
  navigation: any;
  constructor(private _fuseConfigService: FuseConfigService,
    private _fuseNavigationService: FuseNavigationService,
    private _fuseSidebarService: FuseSidebarService,
    private _router: Router) {}

  ngOnInit(): void {

    this._router.events.pipe(
      filter((event:any) => event instanceof NavigationEnd)        
    ).subscribe(() => {
      if (this._fuseSidebarService.getSidebar("navbar")) {
      this._fuseSidebarService.getSidebar("navbar").close();
    }});

    
    this._fuseNavigationService.onNavigationChanged.pipe(
      filter((value) => value !== null),
    ).subscribe(() => {
      this.navigation = this._fuseNavigationService.getCurrentNavigation();
    });

    
    this._fuseConfigService.config.pipe(      
    ).subscribe((config:any) => {
      this.fuseConfig = config;
    });

  }

  ngOnDestroy(): void {}
  toggleSidebarOpened(): void { this._fuseSidebarService.getSidebar("navbar").toggleOpen(); }
  toggleSidebarFolded(): void { this._fuseSidebarService.getSidebar("navbar").toggleFold(); }
  
}
