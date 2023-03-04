import { Component } from '@angular/core';
import { FuseConfigService } from 'projects/app1/src/@fuse23/fuse-config.service';
import { navigation } from '../navigation/navigation';

@Component({
  selector: 'app-vertical1',
  templateUrl: './vertical1.component.html',
  styleUrls: ['./vertical1.component.scss']
})
export class Vertical1Component {
  navigation: any[];
  fuseConfig: any;
  
  constructor(private fuseConfigService: FuseConfigService) {
    this.navigation = navigation;
  }

  ngOnInit() {
    this.fuseConfigService.config.pipe(
    ).subscribe((config:any) => this.fuseConfig = config)
  }

}
