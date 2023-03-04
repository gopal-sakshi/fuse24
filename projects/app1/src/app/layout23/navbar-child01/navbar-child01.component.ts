import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FuseConfigService } from 'projects/app1/src/@fuse23/fuse-config.service';
import { FuseNavigationService } from 'projects/app1/src/@fuse23/fuse-navigation.service';
import { FuseSidebarService } from 'projects/app1/src/@fuse23/fuse-sidebar.service';
import { filter, Observable, of } from 'rxjs';

@Component({
  selector: 'app-navbar-child01',
  templateUrl: './navbar-child01.component.html',
  styleUrls: ['./navbar-child01.component.scss']
})
export class NavbarChild01Component {

  fuseConfig: any;
  navigation: any;
  profile$!: Observable<any>;
  
  constructor(
    private fuseConfigService: FuseConfigService,
    private fuseNavigationService: FuseNavigationService,
    private fuseSidebarService: FuseSidebarService,
    private router: Router    
  ) { }

  onDestroyed() { }

  ngOnInit(): void {
    setTimeout(() => { this.profile$ = of({firstName: 'GopAL', email: 'gopal@gmail.com', mobileNo: '77XXXXXX03'}); }, 1000);
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.fuseSidebarService.getSidebar("navbar")) { this.fuseSidebarService.getSidebar("navbar").close(); }
    });
    
    this.fuseConfigService.config.pipe(
    ).subscribe((config:any) => {
      this.fuseConfig = config;
    });

    this.fuseNavigationService.onNavigationChanged.pipe(
      filter((value) => value !== null)
    ).subscribe(() => {
      this.navigation = this.fuseNavigationService.getCurrentNavigation();
    });

  }


  toggleSidebarOpened(): void { this.fuseSidebarService.getSidebar("navbar").toggleOpen(); }
  toggleSidebarFolded(): void { this.fuseSidebarService.getSidebar("navbar").toggleFold(); }

}
