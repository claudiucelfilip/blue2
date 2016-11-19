"use strict";
var platform_1 = require("nativescript-angular/platform");
var forms_1 = require("nativescript-angular/forms");
var core_1 = require("@angular/core");
var radar_routing_1 = require("./radar.routing");
var radar_component_1 = require("./radar.component");
var RadarModule = (function () {
    function RadarModule() {
    }
    RadarModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_1.NativeScriptModule,
                forms_1.NativeScriptFormsModule,
                radar_routing_1.radarRouting
            ],
            declarations: [
                radar_component_1.RadarComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], RadarModule);
    return RadarModule;
}());
exports.RadarModule = RadarModule;
//# sourceMappingURL=radar.module.js.map