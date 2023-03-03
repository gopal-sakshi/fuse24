import { Inject, Injectable, InjectionToken } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

export const FUSE_CONFIG = new InjectionToken("fuseCustomConfig");
@Injectable({
    providedIn: "root",
})
export class FuseConfigService {
    private configSubject: BehaviorSubject<any>;
    constructor(private _router: Router,
        @Inject(FUSE_CONFIG) private config23:any) {
            this.init();
        }

    init() { console.log(this.config23.colorTheme); }

    set config(value:any) {
        let config = this.configSubject.getValue();
        // config = _.merge({}, config, value);
    }
}