"use strict";
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var http_2 = require("http");
var backend_service_1 = require("./backend.service");
var client_id = "hSkvf2jdkTtQQmwtyqeVs3Sn7Uco6eWNv7zFjXCe";
var LoginService = (function () {
    function LoginService(http) {
        this.http = http;
    }
    LoginService.prototype.register = function (user) {
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        return this.http.post(backend_service_1.BackendService.apiUrl + "user", JSON.stringify({
            Username: user.email,
            Email: user.email,
            Password: user.password
        }), { headers: headers })
            .catch(this.handleErrors);
    };
    LoginService.prototype.login = function (user) {
        var obj = {
            client_id: client_id,
            grant_type: "password",
            username: user.email,
            password: user.password
        };
        var transform = function (obj) {
            var str = [];
            for (var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        };
        var url = backend_service_1.BackendService.url + "o/token/";
        var data = transform(obj);
        return http_2.request({ url: url, method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, content: data }).then(function (data) {
            console.log(data);
            var d = data.content.toJSON();
            backend_service_1.BackendService.token = d.access_token;
        })
            .catch(this.handleErrors);
    };
    LoginService.prototype.logoff = function () {
        backend_service_1.BackendService.token = "";
    };
    LoginService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error.json()));
        return Rx_1.Observable.throw(error);
    };
    LoginService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map