// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";
import { LoginModule } from './login/login.module';
import { authProviders, appRoutes } from './app.routing';
import { RadarModule } from './radar/radar.module';
import { setStatusBarColors, BackendService, LoginService } from "./shared";
import { NativeScriptHttpModule } from "nativescript-angular/http";

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: [,
    BackendService,
    LoginService,
    authProviders
  ],

    imports: [
        HttpModule,
        NativeScriptModule,
        NativeScriptHttpModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(appRoutes),
        LoginModule,
        RadarModule
    ],
    exports: [
        NativeScriptHttpModule
    ]
})
class AppComponentModule {}

platformNativeScriptDynamic().bootstrapModule(AppComponentModule);