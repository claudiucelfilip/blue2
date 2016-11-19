"use strict";
var core_1 = require('@angular/core');
var bluetooth = require('nativescript-bluetooth');
var AppComponent = (function () {
    function AppComponent() {
        this.counter = 16;
    }
    Object.defineProperty(AppComponent.prototype, "message", {
        get: function () {
            if (this.counter > 0) {
                return this.counter + 'taps left';
            }
            else {
                return 'Hoorraaay! \nYou are ready to start building!';
            }
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.onTap = function () {
        this.counter--;
        console.log('tap');
    };
    AppComponent.prototype.ngOnInit = function () {
        console.log('test');
        // this.checkBluetooth()
        //     .then(this.checkLocation)
        //     .then(this.scan.bind(this))
    };
    AppComponent.prototype.checkBluetooth = function () {
        return bluetooth.isBluetoothEnabled().then(function (enabled) {
            console.log("Enabled? " + enabled);
        });
    };
    AppComponent.prototype.checkLocation = function () {
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
    AppComponent.prototype.scan = function () {
        var self = this;
        return bluetooth.startScanning({
            serviceUUIDs: [],
            seconds: 4,
            onDiscovered: function (peripheral) {
                self.connect(peripheral);
            }
        });
    };
    AppComponent.prototype.connect = function (result) {
        return bluetooth.connect({
            UUID: result.UUID,
            onConnected: function (peripheral) {
                // console.log("Periperhal connected with UUID: " + peripheral.UUID);
                console.log('device ', JSON.stringify(peripheral));
                // the peripheral object now has a list of available services:
                // peripheral.services
                // .filter(service => service.UUID === '1819')
                // .forEach(service => {
                //     console.log(JSON.stringify(service);
                // bluetooth.read({
                //     peripheralUUID: peripheral.UUID,
                //     serviceUUID: service.UUID,
                //     characteristicUUID: service.characteristics[0].UUID
                // }).then(function(result) {
                //     // fi. a heartrate monitor value (Uint8) can be retrieved like this:
                //     var data = new Uint8Array(result.value);
                //     console.log("Your heartrate is: " + data[1] + " bpm");
                // }).then(function(err) {
                //     console.log("read error: " + err);
                // });
                // })
            },
            onDisconnected: function (peripheral) {
                console.log("Periperhal disconnected with UUID: " + peripheral.UUID);
            }
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app.component.html',
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map