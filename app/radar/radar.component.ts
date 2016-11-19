import { Component, ElementRef, OnInit } from "@angular/core";
import * as bluetooth from 'nativescript-bluetooth';
import { Beacon } from '../shared/beacon.service';

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
        this.checkBluetooth()
            .then(this.checkLocation)
            .then(this.scan.bind(this));
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

        return bluetooth.startScanning({

            onDiscovered: (peripheral) => {

                if (this.connected.filter((item) => item.UUID === peripheral.UUID).length !== 0) {
                    return;
                }

                if (!peripheral.name) {
                    return;
                }

                let beacon = new Beacon(peripheral);

                beacon.connect()
                    .then(() => {
                        this.connected.push(beacon);
                    })
                    .then(beacon.getProps.bind(beacon))
                    .then(() => {
                        console.log('beacon', beacon.toString());
                    })
                    .then(beacon.disconnect.bind(beacon))
                    .then(() => {
                        this.connected = this.connected.filter((item) => item.UUID !== beacon.UUID);
                    });
            }
        });
    }
}