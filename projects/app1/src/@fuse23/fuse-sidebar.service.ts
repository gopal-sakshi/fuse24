import { Injectable } from '@angular/core';
import { FuseSidebar12Component } from '../app/layout23/fuse-sidebar12/fuse-sidebar12.component';

@Injectable({
  providedIn: "root",
})
export class FuseSidebarService {
  
  private _registry: { [key: string]: FuseSidebar12Component } = {};
  
  constructor() {}

  register(key:any, sidebar:any): void {    
    if (this._registry[key]) {
      console.error( `The sidebar with the key '${key}' already exists. Either unregister it first or use a unique key.` );
      return;
    }
    this._registry[key] = sidebar;
  }

  
  unregister(key:any): void {    
    if (!this._registry[key]) {
      console.warn( `The sidebar with the key '${key}' doesn't exist in the registry.` );
    }
    delete this._registry[key];
  }
  
  getSidebar(key:any): any {    
    if (!this._registry[key]) { console.warn( `The sidebar with the key '${key}' doesn't exist in the registry.` );
      return;
    }
    return this._registry[key];
  }
  
}
