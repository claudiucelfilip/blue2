"use strict";
var app_guard_service_1 = require("./app-guard.service");
exports.authProviders = [
    app_guard_service_1.AuthGuard
];
exports.appRoutes = [
    { path: "", redirectTo: "/login", pathMatch: "full" }
];
//# sourceMappingURL=app.routing.js.map