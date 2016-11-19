"use strict";
// this import should be first in order to load some required settings (like globals and reflect-metadata)
var platform_1 = require("nativescript-angular/platform");
var router_1 = require('nativescript-angular/router');
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
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
            declarations: [app_component_1.AppComponent],
            bootstrap: [app_component_1.AppComponent],
            providers: [,
                shared_1.BackendService,
                shared_1.LoginService,
                app_routing_1.authProviders
            ],
            imports: [
                http_1.HttpModule,
                platform_1.NativeScriptModule,
                http_2.NativeScriptHttpModule,
                router_1.NativeScriptRouterModule,
                router_1.NativeScriptRouterModule.forRoot(app_routing_1.appRoutes),
                login_module_1.LoginModule,
                radar_module_1.RadarModule
            ],
            exports: [
                http_2.NativeScriptHttpModule
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponentModule);
    return AppComponentModule;
}());
platform_1.platformNativeScriptDynamic().bootstrapModule(AppComponentModule);
//# sourceMappingURL=main.js.map