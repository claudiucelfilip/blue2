"use strict";
var radar_component_1 = require('./radar/radar.component');
var login_component_1 = require('./login/login.component');
var home_component_1 = require('./home/home.component');
var sidemenu_component_1 = require('./shared/sidemenu/sidemenu.component');
var app_guard_service_1 = require("./app-guard.service");
exports.authProviders = [
    app_guard_service_1.AuthGuard
];
exports.APP_ROUTES = [
    {
        path: '',
        redirectTo: '/start',
        pathMatch: 'full'
    },
    {
        path: "start",
        component: sidemenu_component_1.SidemenuComponent, canActivate: [app_guard_service_1.AuthGuard],
        children: [
            { path: "", component: home_component_1.HomeComponent, canActivate: [app_guard_service_1.AuthGuard], },
            { path: "radar", component: radar_component_1.RadarComponent, canActivate: [app_guard_service_1.AuthGuard], },
        ]
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent,
        pathMatch: 'full'
    }
];
//# sourceMappingURL=app.routing.js.map