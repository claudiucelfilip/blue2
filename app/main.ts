// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { LoginModule } from './login/login.module';
import { authProviders, appRoutes } from './app.routing';
import { setStatusBarColors, BackendService, LoginService } from "./shared";
import { NativeScriptHttpModule } from "nativescript-angular/http";

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: [
    BackendService,
    LoginService,
    authProviders
  ],

    imports: [
        NativeScriptModule,
        NativeScriptHttpModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(appRoutes),
        LoginModule
    ],
})
class AppComponentModule {}

platformNativeScriptDynamic().bootstrapModule(AppComponentModule);