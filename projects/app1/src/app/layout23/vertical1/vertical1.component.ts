import { Component } from '@angular/core';
import { FuseConfigService } from 'projects/app1/src/@fuse23/fuse-config.service';

@Component({
  selector: 'app-vertical1',
  templateUrl: './vertical1.component.html',
  styleUrls: ['./vertical1.component.scss']
})
export class Vertical1Component {
  
  constructor(private fuseConfigService: FuseConfigService) {}

  ngOnInit() {
    this.fuseConfigService.
  }

}
