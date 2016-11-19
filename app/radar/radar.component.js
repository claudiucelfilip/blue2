"use strict";
var core_1 = require("@angular/core");
var bluetooth = require('nativescript-bluetooth');
var RadarComponent = (function () {
    function RadarComponent() {
        this.items = [];
        this.connected = [];
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
            seconds: 10,
            onDiscovered: function (peripheral) {
                var item = {
                    peripheral: null
                };
                try {
                    if (peripheral.name === 'OnyxBeacon' && _this.connected.indexOf(peripheral.UUID) === -1) {
                        item.peripheral = peripheral;
                        _this.items.push(item);
                        console.log('PERIPHERAL', JSON.stringify(peripheral));
                        self.connect(peripheral, item);
                    }
                }
                catch (err) {
                    console.log('Error', err);
                }
            }
        });
    };
    RadarComponent.prototype.getMinor = function (uuid) {
        return bluetooth.read({
            peripheralUUID: uuid,
            serviceUUID: '2aaceb00-c5a5-44fd-0000-3fd42d703a4f',
            characteristicUUID: '2aaceb00-c5a5-44fd-0200-3fd42d703a4f',
        }).then(function (result) {
            var data = new Uint8Array(result.value);
            return data[0];
        }).then(function (err) {
            console.log("read error: " + err);
        });
    };
    RadarComponent.prototype.getMajor = function (uuid) {
        return bluetooth.read({
            peripheralUUID: uuid,
            serviceUUID: '2aaceb00-c5a5-44fd-0000-3fd42d703a4f',
            characteristicUUID: '2aaceb00-c5a5-44fd-0300-3fd42d703a4f',
        }).then(function (result) {
            var data = new Uint8Array(result.value);
            return data[0];
        }).then(function (err) {
            console.log("read error: " + err);
        });
    };
    RadarComponent.prototype.connect = function (result, item) {
        var _this = this;
        console.log('CONNECTING TO', result.UUID);
        return bluetooth.connect({
            UUID: result.UUID,
            onConnected: function (peripheral) {
                _this.connected.push(result.UUID);
                item.minor = _this.getMinor(result.UUID);
                item.major = _this.getMajor(result.UUID);
            },
            onDisconnected: function (peripheral) {
                var index = _this.connected.indexOf(peripheral.UUID);
                _this.connected.slice(index, 1);
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