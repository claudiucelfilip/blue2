"use strict";
var core_1 = require("@angular/core");
var bluetooth = require('nativescript-bluetooth');
var beacon_service_1 = require('../shared/beacon.service');
var RadarComponent = (function () {
    function RadarComponent() {
        this.items = [];
        this.connected = [];
    }
    RadarComponent.prototype.ngOnInit = function () {
        this.checkBluetooth()
            .then(this.checkLocation)
            .then(this.scan.bind(this));
    };
    RadarComponent.prototype.checkBluetooth = function () {
        return bluetooth.isBluetoothEnabled().then(function (enabled) {
            console.log("Enabled? " + enabled);
        });
    };
    RadarComponent.prototype.checkLocation = function () {
        return bluetooth.hasCoarseLocationPermission().then(function (granted) {
            // if this is 'false' you probably want to call 'requestCoarseLocationPermission' now
            console.log("Has Location Permission? " + granted);
            if (!granted) {
                return bluetooth.requestCoarseLocationPermission().then(function (result) {
                    console.log("Location permission requested", result);
                });
            }
        });
    };
    RadarComponent.prototype.scan = function () {
        var _this = this;
        return bluetooth.startScanning({
            onDiscovered: function (peripheral) {
                if (_this.connected.filter(function (item) { return item.UUID === peripheral.UUID; }).length !== 0) {
                    return;
                }
                if (!peripheral.name) {
                    return;
                }
                var beacon = new beacon_service_1.Beacon(peripheral);
                beacon.connect()
                    .then(function () {
                    _this.connected.push(beacon);
                })
                    .then(beacon.getProps.bind(beacon))
                    .then(function () {
                    console.log('beacon', beacon.toString());
                })
                    .then(beacon.disconnect.bind(beacon))
                    .then(function () {
                    _this.connected = _this.connected.filter(function (item) { return item.UUID !== beacon.UUID; });
                });
            }
        });
    };
    RadarComponent = __decorate([
        core_1.Component({
            selector: "radar",
            templateUrl: "radar/radar.component.html",
            styleUrls: ["radar/radar.component.css", "radar/radar.component.css"],
        }), 
        __metadata('design:paramtypes', [])
    ], RadarComponent);
    return RadarComponent;
}());
exports.RadarComponent = RadarComponent;
//# sourceMappingURL=radar.component.js.map