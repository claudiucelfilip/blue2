import { Component, ElementRef, OnInit, ApplicationRef } from "@angular/core";
import * as bluetooth from 'nativescript-bluetooth';
import { Beacon } from '../shared/beacon.service';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: "radar",
    templateUrl: "radar/radar.component.html",
    styleUrls: ["radar/radar.component.css", "radar/radar.component.css"],
})
export class RadarComponent implements OnInit {
    items = [];
    beacons$ = new Subject<any>();
    connected = [];

    constructor (private ref: ApplicationRef) {
        var self = this;
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

    ngOnInit () {

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
            seconds: 4,
            onDiscovered: (peripheral) => {
                console.log('SCAN');
                if (!peripheral.name) {
                    return;
                }

                let beacon;

                for (let i = 0 ; i < this.connected.length; i++) {
                    if (this.connected[i].UUID === peripheral.UUID) {
                        beacon = this.connected[i];
                        beacon.update(peripheral);
                    }
                }

                if (!beacon) {
                    beacon = new Beacon(peripheral);
                    this.connected.push(beacon);

                    // beacon.connect()
                    //     .then(beacon.getProps.bind(beacon))
                    //     .then(beacon.disconnect.bind(beacon));
                }
            }
        });
    }
}