"use strict";
var core_1 = require("@angular/core");
var bluetooth = require('nativescript-bluetooth');
var beacon_service_1 = require('../shared/beacon.service');
var Subject_1 = require('rxjs/Subject');
var RadarComponent = (function () {
    function RadarComponent(ref) {
        this.ref = ref;
        this.items = [];
        this.beacons$ = new Subject_1.Subject();
        this.connected = [];
        var self = this;
        this.checkBluetooth()
            .then(this.checkLocation)
            .then(rescan());
        function rescan() {
            console.log('rescanning');
            return self.scan().then(function () {
                return rescan();
            });
        }
    }
    RadarComponent.prototype.ngOnInit = function () {
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
            seconds: 4,
            onDiscovered: function (peripheral) {
                console.log('SCAN');
                if (!peripheral.name) {
                    return;
                }
                var beacon;
                for (var i = 0; i < _this.connected.length; i++) {
                    if (_this.connected[i].UUID === peripheral.UUID) {
                        beacon = _this.connected[i];
                        beacon.update(peripheral);
                    }
                }
                if (!beacon) {
                    beacon = new beacon_service_1.Beacon(peripheral);
                    _this.connected.push(beacon);
                }
            }
        });
    };
    RadarComponent = __decorate([
        core_1.Component({
            selector: "radar",
            templateUrl: "radar/radar.component.html",
            styleUrls: ["radar/radar.component.css", "radar/radar.component.css"],
        }), 
        __metadata('design:paramtypes', [core_1.ApplicationRef])
    ], RadarComponent);
    return RadarComponent;
}());
exports.RadarComponent = RadarComponent;
//# sourceMappingURL=radar.component.js.map