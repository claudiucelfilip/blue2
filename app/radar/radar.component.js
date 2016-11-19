"use strict";
var core_1 = require("@angular/core");
var bluetooth = require('nativescript-bluetooth');
var RadarComponent = (function () {
    function RadarComponent() {
        this.items = [];
    }
    RadarComponent.prototype.ngOnInit = function () {
        var self = this;
        console.log('construct');
        this.checkBluetooth()
            .then(this.checkLocation)
            .then(rescan());
        function rescan() {
            console.log('rescanning');
            return self.scan().then(function () {
                return rescan();
            });
        }
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
        var self = this;
        return bluetooth.startScanning({
            serviceUUIDs: [],
            seconds: 4,
            onDiscovered: function (peripheral) {
                try {
                    _this.items.push(peripheral);
                    self.connect(peripheral);
                }
                catch (err) {
                    console.log('Error', err);
                }
            }
        });
    };
    RadarComponent.prototype.connect = function (result) {
        return bluetooth.connect({
            UUID: result.UUID,
            onConnected: function (peripheral) {
                console.log(JSON.stringify(peripheral));
                // bluetooth.read({
                //     peripheralUUID: peripheral.UUID,
                //     serviceUUID: '2aaceb00-c5a5-44fd-0000-3fd42d703a4f',
                //     characteristicUUID: '2aaceb00-c5a5-44fd-0200-3fd42d703a4f',
                // }).then(function (result) {
                //     // fi. a heartrate monitor value (Uint8) can be retrieved like this:
                //     console.log('RESULT', result);
                // }).then(function (err) {
                //     console.log("read error: " + err);
                // });
            },
            onDisconnected: function (peripheral) {
                console.log("Periperhal disconnected with UUID: " + peripheral.UUID);
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