import { Component, ElementRef, OnInit, ApplicationRef } from "@angular/core";
import * as bluetooth from 'nativescript-bluetooth';
import { Beacon } from '../shared/beacon.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LostBeaconsService } from '../shared/lostBeacons.service';
import 'rxjs/add/observable/combineLatest';


@Component({
    selector: "radar",
    templateUrl: "radar/radar.component.html",
    styleUrls: ["radar/radar.component.css", "radar/radar.component.css"],
})
export class RadarComponent implements OnInit {
    items = [];
    beacons;
    connected;
    connected$: BehaviorSubject<any>;

    constructor (private ref: ApplicationRef, private lostBeacons: LostBeaconsService) {
        this.connected$ = new BehaviorSubject([]);
    }

    ngOnInit () {

        // this.lostBeacons.beacons().then((beacons) => {
        //     console.log(JSON.stringify(beacons));
        // });
        let beacons = this.lostBeacons.beacons();

        Observable.combineLatest(
            this.connected$,
            beacons,
            (connected, beacons) => {
                return beacons.map((beacon) => {
                    let c = connected.filter(item => {
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
                })
            }
        ).subscribe((beacons) => {
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

                if (!peripheral.name) {
                    return;
                }

                let beacon;

                for (let i = 0; i < this.connected.length; i++) {
                    if (this.connected[i].UUID === peripheral.UUID) {
                        beacon = this.connected[i];
                        beacon.update(peripheral);
                    }
                }

                if (!beacon) {
                    beacon = new Beacon(peripheral);
                    this.connected.push(beacon);
                }

                this.connected = this.connected.slice(0);
                this.connected$.next(this.connected);
                this.ref.tick();
            }
        });
    }
}