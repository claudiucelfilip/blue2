import { Component, OnInit } from '@angular/core';
import * as bluetooth from 'nativescript-bluetooth';

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
    public counter: number = 16;

    public get message (): string {
        if (this.counter > 0) {
            return this.counter + 'taps left';
        } else {
            return 'Hoorraaay! \nYou are ready to start building!';
        }
    }

    public onTap () {
        this.counter--;
        console.log('tap');
    }

    ngOnInit () {
        console.log('test');


        // this.checkBluetooth()
        //     .then(this.checkLocation)
        //     .then(this.scan.bind(this))
        

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
                self.connect(peripheral);
            }
        });
    }

    connect (result) {
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
    }
}
