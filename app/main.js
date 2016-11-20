"use strict";
var platform_1 = require("nativescript-angular/platform");
var angular_1 = require("nativescript-telerik-ui/sidedrawer/angular");
// this import should be first in order to load some required settings (like globals and reflect-metadata)
var router_1 = require('nativescript-angular/router');
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var sidemenu_component_1 = require('./shared/sidemenu/sidemenu.component');
var home_module_1 = require("./home/home.module");
var login_module_1 = require('./login/login.module');
var app_routing_1 = require('./app.routing');
var radar_module_1 = require('./radar/radar.module');
var shared_1 = require("./shared");
var http_2 = require("nativescript-angular/http");
var AppComponentModule = (function () {
    function AppComponentModule() {
    }
    AppComponentModule = __decorate([
        core_1.NgModule({
            declarations: [angular_1.SIDEDRAWER_DIRECTIVES, app_component_1.AppComponent, sidemenu_component_1.SidemenuComponent],
            bootstrap: [app_component_1.AppComponent],
            providers: [
                shared_1.BackendService,
                shared_1.LoginService,
                app_routing_1.authProviders
            ],
            imports: [
                platform_1.NativeScriptModule,
                http_1.HttpModule,
                http_2.NativeScriptHttpModule,
                router_1.NativeScriptRouterModule,
                router_1.NativeScriptRouterModule.forRoot(app_routing_1.APP_ROUTES),
                login_module_1.LoginModule,
                radar_module_1.RadarModule,
                home_module_1.HomeModule
            ],
            exports: [
                platform_1.NativeScriptModule,
                router_1.NativeScriptRouterModule
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponentModule);
    return AppComponentModule;
}());
platform_1.platformNativeScriptDynamic().bootstrapModule(AppComponentModule);
//# sourceMappingURL=main.js.map