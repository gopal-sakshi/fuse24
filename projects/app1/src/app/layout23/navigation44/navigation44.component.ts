import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FuseNavigationService } from 'projects/app1/src/@fuse23/fuse-navigation.service';
import { merge } from 'rxjs';

@Component({
  selector: 'app-navigation44',
  templateUrl: './navigation44.component.html',
  styleUrls: ['./navigation44.component.scss']
})
export class Navigation44Component {
  @Input() layout = "vertical";
  @Input() navigation: any;  

  constructor(private _changeDetectorRef: ChangeDetectorRef,
    private _fuseNavigationService: FuseNavigationService) {}

  ngOnInit(): void {

    this.navigation = this.navigation || this._fuseNavigationService.getCurrentNavigation();

    this._fuseNavigationService.onNavigationChanged.pipe(      
    ).subscribe(() => {        
      this.navigation = this._fuseNavigationService.getCurrentNavigation();
      this._changeDetectorRef.markForCheck();
    });


    merge(this._fuseNavigationService.onNavigationItemAdded,this._fuseNavigationService.onNavigationItemUpdated,this._fuseNavigationService.onNavigationItemRemoved).pipe(      
    ).subscribe(() => {
      this._changeDetectorRef.markForCheck();
    });
    
  }

}
