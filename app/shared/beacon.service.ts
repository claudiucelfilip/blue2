import { Injectable } from '@angular/core';
import * as bluetooth from 'nativescript-bluetooth';

@Injectable()
export class Beacon {
    name;
    minor;
    major;
    UUID;
    RSSI;
    distance;

    constructor (peripheral) {
        this.update(peripheral);
    }

    disconnect () {
        return bluetooth.disconnect({
            UUID: this.UUID
        });
    }

    update (peripheral) {
        this.name = peripheral.name;
        this.UUID = peripheral.UUID;
        this.RSSI = peripheral.RSSI;
        console.log('RSSI', this.name, this.UUID, peripheral.RSSI);
        this.getDistance();
    }
    connect () {
        return new Promise((resolve) => {
            bluetooth.connect({
                UUID: this.UUID,
                onConnected: (peripheral) => {
                    console.log('CONNECTED', this.name);
                    resolve(peripheral);
                },
                onDisconnected: () => {
                    console.log('DISCONNECTED', this.name, this.UUID);
                }
            });
        });
    }

    getProps () {
        return this.getMinor()
            .then(this.getMajor.bind(this))
            .catch((err) => {
                console.log(err);
            });
    }

    getDistance () {
        let txPower = -72;
        let result;

        if (this.RSSI == 0) {
            result = -1.0;
        }

        let ratio = this.RSSI * 1.0 / txPower;
        if (ratio < 1.0) {
            result = Math.pow(ratio, 10);
        }
        else {
            result = (0.89976) * Math.pow(ratio, 7.7095) + 0.111;
        }

        this.distance = result;
    }

    getMinor () {
        return bluetooth.read({
            peripheralUUID: this.UUID,
            serviceUUID: '2aaceb00-c5a5-44fd-0000-3fd42d703a4f',
            characteristicUUID: '2aaceb00-c5a5-44fd-0300-3fd42d703a4f',
        }).then((result) => {
            var data = new Uint16Array(result.value);
            this.minor = data[0];
        });
    }

    getMajor () {
        return bluetooth.read({
            peripheralUUID: this.UUID,
            serviceUUID: '2aaceb00-c5a5-44fd-0000-3fd42d703a4f',
            characteristicUUID: '2aaceb00-c5a5-44fd-0200-3fd42d703a4f',
        }).then((result) => {
            var data = new Uint8Array(result.value);
            this.major = data[0];
        });
    }

    toString() {
        return JSON.stringify({
            name: this.name,
            UUID: this.UUID,
            RSSI: this.RSSI,
            minor: this.minor,
            major: this.major,
            distance: this.distance
        });
    }
}