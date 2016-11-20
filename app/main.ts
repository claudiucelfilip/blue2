import { NativeScriptModule, platformNativeScriptDynamic } from "nativescript-angular/platform";
import * as elementRegistryModule from 'nativescript-angular/element-registry';
import { SIDEDRAWER_DIRECTIVES } from "nativescript-telerik-ui/sidedrawer/angular";

// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";
import { SidemenuComponent } from './shared/sidemenu/sidemenu.component';
import { HomeModule } from "./home/home.module";
import { LoginModule } from './login/login.module';
import { authProviders, APP_ROUTES } from './app.routing';
import { RadarModule } from './radar/radar.module';
import { setStatusBarColors, BackendService, LoginService } from "./shared";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { LostBeaconsService } from './shared/lostBeacons.service';

@NgModule({
    declarations: [SIDEDRAWER_DIRECTIVES, AppComponent, SidemenuComponent],
    bootstrap: [AppComponent],
    providers: [
        BackendService,
        LoginService,
        authProviders,
        LostBeaconsService
    ],
    imports: [
        NativeScriptModule,
        HttpModule,
        NativeScriptHttpModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(APP_ROUTES),
        LoginModule,
        RadarModule,
        HomeModule
    ],
    exports: [
        NativeScriptModule,
        NativeScriptRouterModule
    ]
})
class AppComponentModule { }

platformNativeScriptDynamic().bootstrapModule(AppComponentModule);