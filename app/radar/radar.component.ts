import { Component, ElementRef, OnInit } from "@angular/core";
import * as bluetooth from 'nativescript-bluetooth';

@Component({
    selector: "radar",
    templateUrl: "radar/radar.component.html",
    styleUrls: ["radar/radar.component.css", "radar/radar.component.css"],
})
export class RadarComponent implements OnInit {
    items = [];
    connected = [];
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
            seconds: 10,
            onDiscovered: (peripheral) => {
                let item = {
                    peripheral: null
                };
                try {
                    if (peripheral.name === 'OnyxBeacon' && this.connected.indexOf(peripheral.UUID) === -1) {
                        item.peripheral = peripheral;
                        this.items.push(item);
                        console.log('PERIPHERAL', JSON.stringify(peripheral));
                        self.connect(peripheral, item);
                    }

                } catch (err) {
                    console.log('Error', err);
                }

            }
        });
    }

    getMinor(uuid) {
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
    }

    getMajor(uuid) {
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
    }

    connect (result, item) {
        console.log('CONNECTING TO', result.UUID);

        return bluetooth.connect({
            UUID: result.UUID,
            onConnected: (peripheral) => {
                this.connected.push(result.UUID);
                item.minor = this.getMinor(result.UUID);
                item.major = this.getMajor(result.UUID);
            },
            onDisconnected: (peripheral) => {
                var index = this.connected.indexOf(peripheral.UUID);
                this.connected.slice(index, 1);
                console.log("Periperhal disconnected with UUID: " + peripheral.UUID);
            }
        });

    }
}