// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { LoginModule } from './login/login.module';
import { RadarModule } from './radar/radar.module';
import { appRoutes } from './app.routing';
@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(appRoutes),
        LoginModule,
        RadarModule
    ],
})
class AppComponentModule {}

platformNativeScriptDynamic().bootstrapModule(AppComponentModule);