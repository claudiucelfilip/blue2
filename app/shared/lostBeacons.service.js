"use strict";
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var backend_service_1 = require("./backend.service");
var LostBeaconsService = (function () {
    function LostBeaconsService(http) {
        this.http = http;
    }
    LostBeaconsService.prototype.beacons = function () {
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        headers.append('X-CSRFToken', 'CwXE9adiNgJkucBgOZiMQ4CZTzaSs40oHbQtieGbcWUPpDW0fg3kzXan5OIqnFZp');
        headers.append('Authorization', 'Basic YWRtaW46YWRtaW5hZG1pbg==');
        return this.http.get(backend_service_1.BackendService.apiUrl + "lost_beacons", { headers: headers }).map(function (res) { return res.json(); });
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
    };
    LostBeaconsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], LostBeaconsService);
    return LostBeaconsService;
}());
exports.LostBeaconsService = LostBeaconsService;
//# sourceMappingURL=lostBeacons.service.js.map