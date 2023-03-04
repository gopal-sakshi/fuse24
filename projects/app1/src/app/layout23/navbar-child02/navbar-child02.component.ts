import { Component } from '@angular/core';
import { FuseConfigService } from 'projects/app1/src/@fuse23/fuse-config.service';
import { FuseNavigationService } from 'projects/app1/src/@fuse23/fuse-navigation.service';
import { FuseSidebarService } from 'projects/app1/src/@fuse23/fuse-sidebar.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar-child02',
  templateUrl: './navbar-child02.component.html',
  styleUrls: ['./navbar-child02.component.scss']
})
export class NavbarChild02Component {

  navigation: any;
  fuseConfig: any;

  constructor(private _fuseConfigService: FuseConfigService,
    private _fuseNavigationService: FuseNavigationService,
    private _fuseSidebarService: FuseSidebarService) { }

  ngOnInit(): void {

    this._fuseNavigationService.onNavigationChanged.pipe(
      filter((value:any) => value !== null)
    ).subscribe(() => { this.navigation = this._fuseNavigationService.getCurrentNavigation(); });
    
    this._fuseConfigService.config.pipe(
    ).subscribe((config:any) => { this.fuseConfig = config; });
    
  }

  ngOnDestroy(): void {}

}
