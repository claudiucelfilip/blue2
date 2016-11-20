"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("ui/page");
var shared_1 = require("../shared");
var HomeComponent = (function () {
    function HomeComponent(router, userService, page) {
        this.router = router;
        this.userService = userService;
        this.page = page;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = false;
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: "home",
            templateUrl: "home/home.component.html",
            styleUrls: ["home/home.component.css"],
        }), 
        __metadata('design:paramtypes', [router_1.Router, shared_1.LoginService, page_1.Page])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map