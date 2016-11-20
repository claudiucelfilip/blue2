"use strict";
var core_1 = require('@angular/core');
var bluetooth = require('nativescript-bluetooth');
var Beacon = (function () {
    function Beacon(peripheral) {
        this.update(peripheral);
    }
    Beacon.prototype.disconnect = function () {
        return bluetooth.disconnect({
            UUID: this.UUID
        });
    };
    Beacon.prototype.update = function (peripheral) {
        this.name = peripheral.name;
        this.UUID = peripheral.UUID;
        this.RSSI = peripheral.RSSI;
        console.log('RSSI', this.name, this.UUID, peripheral.RSSI);
        this.getDistance();
    };
    Beacon.prototype.connect = function () {
        var _this = this;
        return new Promise(function (resolve) {
            bluetooth.connect({
                UUID: _this.UUID,
                onConnected: function (peripheral) {
                    console.log('CONNECTED', _this.name);
                    resolve(peripheral);
                },
                onDisconnected: function () {
                    console.log('DISCONNECTED', _this.name, _this.UUID);
                }
            });
        });
    };
    Beacon.prototype.getProps = function () {
        return this.getMinor()
            .then(this.getMajor.bind(this))
            .catch(function (err) {
            console.log(err);
        });
    };
    Beacon.prototype.getDistance = function () {
        var txPower = -72;
        var result;
        if (this.RSSI == 0) {
            result = -1.0;
        }
        var ratio = this.RSSI * 1.0 / txPower;
        if (ratio < 1.0) {
            result = Math.pow(ratio, 10);
        }
        else {
            result = (0.89976) * Math.pow(ratio, 7.7095) + 0.111;
        }
        this.distance = result;
    };
    Beacon.prototype.getMinor = function () {
        var _this = this;
        return bluetooth.read({
            peripheralUUID: this.UUID,
            serviceUUID: '2aaceb00-c5a5-44fd-0000-3fd42d703a4f',
            characteristicUUID: '2aaceb00-c5a5-44fd-0300-3fd42d703a4f',
        }).then(function (result) {
            var data = new Uint16Array(result.value);
            _this.minor = data[0];
        });
    };
    Beacon.prototype.getMajor = function () {
        var _this = this;
        return bluetooth.read({
            peripheralUUID: this.UUID,
            serviceUUID: '2aaceb00-c5a5-44fd-0000-3fd42d703a4f',
            characteristicUUID: '2aaceb00-c5a5-44fd-0200-3fd42d703a4f',
        }).then(function (result) {
            var data = new Uint8Array(result.value);
            _this.major = data[0];
        });
    };
    Beacon.prototype.toString = function () {
        return JSON.stringify({
            name: this.name,
            UUID: this.UUID,
            RSSI: this.RSSI,
            minor: this.minor,
            major: this.major,
            distance: this.distance
        });
    };
    Beacon = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [Object])
    ], Beacon);
    return Beacon;
}());
exports.Beacon = Beacon;
//# sourceMappingURL=beacon.service.js.map