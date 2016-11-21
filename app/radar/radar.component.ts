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
    beacons = [];
    connected = [];
    connected$: BehaviorSubject<any>;

    constructor (private ref: ApplicationRef, private lostBeacons: LostBeaconsService) {
        this.connected$ = new BehaviorSubject([]);
    }

    ngOnInit () {
        var self = this;

        // this.lostBeacons.beacons().then((beacons) => {
        //     console.log(JSON.stringify(beacons));
        // });
        let beacons = this.lostBeacons.beacons();
        var first = false;
        Observable.combineLatest(
            this.connected$,
            beacons,
            (connected, beacons) => {
                beacons = beacons.filter(b => b.date !== "2016-11-20T12:00:00Z");
                return beacons.map((beacon) => {

                    let c = connected.filter(item => {
                        return item.UUID === beacon.beacon.unique_id;
                    });


                    if (c.length ) {
                        c = c.pop();
                        for (var key in c) {
                            if (c.hasOwnProperty(key)) {
                                beacon[key] = c[key];
                            }
                        }
                        first  = true;
                        let val = Math.abs((-100 / c.RSSI));
                        beacon.background = `rgba(255, 0, 0, ${val})`;
                    }


                    return beacon;
                })
            }
        )
            .subscribe((beacons) => {
                console.log(JSON.stringify(beacons));
                self.beacons = beacons; //.filter(beacon => beacon.distance);
            });


        var self = this;
        this.checkBluetooth()
            .then(this.checkLocation)
            .then(rescan());

        function rescan () {
            console.log('rescanning');
            return self.scan().then(function () {
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
        var self = this;
        return bluetooth.startScanning({
            seconds: 4,
            onDiscovered: (peripheral) => {

                if (!peripheral.name) {
                    return;
                }

                let beacon;

                for (let i = 0; i < self.connected.length; i++) {
                    if (self.connected[i].UUID === peripheral.UUID) {
                        beacon = self.connected[i];
                        beacon.update(peripheral);
                    }
                }

                if (!beacon) {
                    beacon = new Beacon(peripheral);
                    self.connected.push(beacon);
                }
                self.connected$.next(self.connected);
                self.ref.tick();
            }
        });
    }
}