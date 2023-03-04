import { Inject, Injectable, InjectionToken } from "@angular/core";
import { ResolveEnd, Router } from "@angular/router";
import * as _ from 'lodash';
import { BehaviorSubject, filter, Observable } from "rxjs";

export const FUSE_CONFIG = new InjectionToken("fuseCustomConfig");
@Injectable({
    providedIn: "root",
})
export class FuseConfigService {
    private _configSubject!: BehaviorSubject<any>;
    private readonly _defaultConfig: any;
    constructor(private _router: Router,
        @Inject(FUSE_CONFIG) private _config:any) {
            this._defaultConfig = _config;
            this._init();
    }

    set config(value) {
        let config = this._configSubject.getValue();
        config = _.merge({}, config, value);
        this._configSubject.next(config);
    }

    get config(): any | Observable<any> { return this._configSubject.asObservable(); }
    get defaultConfig(): any { return this._defaultConfig; }


    private _init(): void {
        this._configSubject = new BehaviorSubject(_.cloneDeep(this._defaultConfig));
        this._router.events.pipe(
            filter((event) => event instanceof ResolveEnd)
        ).subscribe(() => {
            if (!_.isEqual(this._configSubject.getValue().layout,this._defaultConfig.layout) ) {
                const config = _.cloneDeep(this._configSubject.getValue());
                config.layout = _.cloneDeep(this._defaultConfig.layout);
                this._configSubject.next(config);
            }
        });
    }

    setConfig(value:any, opts = { emitEvent: true }): void {
        let config = this._configSubject.getValue();
        config = _.merge({}, config, value);
        if (opts.emitEvent === true) {  this._configSubject.next(config); }
    }

    getConfig(): Observable<any> { return this._configSubject.asObservable(); }
    resetToDefaults(): void { this._configSubject.next(_.cloneDeep(this._defaultConfig)); }

}