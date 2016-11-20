import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { getFile, getImage, getJSON, getString, request, HttpRequestOptions } from "http";
import { BackendService } from "./backend.service";


@Injectable()
export class LostBeaconsService {
    constructor (private http: Http) {
    }

    beacons () {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append('X-CSRFToken', 'CwXE9adiNgJkucBgOZiMQ4CZTzaSs40oHbQtieGbcWUPpDW0fg3kzXan5OIqnFZp');
        headers.append('Authorization', 'Basic YWRtaW46YWRtaW5hZG1pbg==');

        return this.http.get(
            BackendService.apiUrl + "lost_beacons",
            {headers}
         ).map((res:Response) => res.json());
        // return request({
        //     url: BackendService.apiUrl + "lost_beacons",
        //     method: "GET",
        //     headers
        // }).then((data) => {
        //     let d = data.content.toJSON();
        //     return d;
        // }, (err) => {
        //     console.log(JSON.stringify(err));
        // })
    }
}