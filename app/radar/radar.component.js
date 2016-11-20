"use strict";
var core_1 = require("@angular/core");
var bluetooth = require('nativescript-bluetooth');
var beacon_service_1 = require('../shared/beacon.service');
var Observable_1 = require('rxjs/Observable');
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var lostBeacons_service_1 = require('../shared/lostBeacons.service');
require('rxjs/add/observable/combineLatest');
var RadarComponent = (function () {
    function RadarComponent(ref, lostBeacons) {
        this.ref = ref;
        this.lostBeacons = lostBeacons;
        this.items = [];
        this.connected$ = new BehaviorSubject_1.BehaviorSubject([]);
    }
    RadarComponent.prototype.ngOnInit = function () {
        // this.lostBeacons.beacons().then((beacons) => {
        //     console.log(JSON.stringify(beacons));
        // });
        var beacons = this.lostBeacons.beacons();
        Observable_1.Observable.combineLatest(this.connected$, beacons, function (connected, beacons) {
            return beacons.map(function (beacon) {
                var c = connected.filter(function (item) {
                    return item.UUID === beacon.beacon.unique_id;
                })[0];
                if (c) {
                    for (var key in c) {
                        if (c.hasOwnProperty(c)) {
                            beacon[key] = c[key];
                        }
                    }
                }
                return beacon;
            });
        }).subscribe(function (beacons) {
            console.log(JSON.stringify(beacons));
        });
        console.log('Radar Started');
        // var self = this;
        // this.checkBluetooth()
        //     .then(this.checkLocation)
        //     .then(rescan());
        //
        // function rescan() {
        //     console.log('rescanning');
        //     return self.scan().then(function() {
        //         return rescan();
        //     });
        // }
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
                _this.connected = _this.connected.slice(0);
                _this.connected$.next(_this.connected);
                _this.ref.tick();
            }
        });
    };
    RadarComponent = __decorate([
        core_1.Component({
            selector: "radar",
            templateUrl: "radar/radar.component.html",
            styleUrls: ["radar/radar.component.css", "radar/radar.component.css"],
        }), 
        __metadata('design:paramtypes', [core_1.ApplicationRef, lostBeacons_service_1.LostBeaconsService])
    ], RadarComponent);
    return RadarComponent;
}());
exports.RadarComponent = RadarComponent;
//# sourceMappingURL=radar.component.js.map