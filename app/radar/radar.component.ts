import { Component, ElementRef, OnInit } from "@angular/core";
import * as bluetooth from 'nativescript-bluetooth';

@Component({
    selector: "radar",
    templateUrl: "radar/radar.component.html",
    styleUrls: ["radar/radar.component.css", "radar/radar.component.css"],
})
export class RadarComponent implements OnInit {
    items = [];
    constructor () {
    }

    ngOnInit () {
        var self = this;
        console.log('construct');


        this.checkBluetooth()
            .then(this.checkLocation)
            .then(rescan());

        function rescan() {
            console.log('rescanning');
            return self.scan().then(function() {
                return rescan();
            });
        }
    }

    checkBluetooth () {
        return bluetooth.isBluetoothEnabled().then(
            function (enabled) {
                console.log("Enabled? " + enabled);
            }
        );
    }

    checkLocation () {
        return bluetooth.hasCoarseLocationPermission().then(
            function (granted) {
                // if this is 'false' you probably want to call 'requestCoarseLocationPermission' now
                console.log("Has Location Permission? " + granted);
                if (!granted) {
                    return bluetooth.requestCoarseLocationPermission().then(
                        function (result) {
                            console.log("Location permission requested", result);
                        }
                    );
                }
            }
        );
    }

    scan () {
        let self = this;
        return bluetooth.startScanning({
            serviceUUIDs: [],
            seconds: 4,
            onDiscovered: (peripheral) => {
                try {
                    this.items.push(peripheral);
                    self.connect(peripheral);
                } catch (err) {
                    console.log('Error', err);
                }

            }
        });
    }

    connect (result) {
        return bluetooth.connect({
            UUID: result.UUID,
            onConnected: (peripheral) => {

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

    }
}