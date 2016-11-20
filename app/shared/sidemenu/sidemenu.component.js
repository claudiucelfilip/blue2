"use strict";
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var angular_1 = require('nativescript-telerik-ui/sidedrawer/angular');
var sidedrawer_1 = require('nativescript-telerik-ui/sidedrawer');
var page_1 = require("ui/page");
var SidemenuComponent = (function () {
    function SidemenuComponent(_page, _changeDetectionRef, _router) {
        this._page = _page;
        this._changeDetectionRef = _changeDetectionRef;
        this._router = _router;
        _page.on("loaded", this.onLoaded, this);
    }
    Object.defineProperty(SidemenuComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    SidemenuComponent.prototype.toggle = function () {
        this._drawer.toggleDrawerState();
    };
    SidemenuComponent.prototype.onLoaded = function (args) {
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
    };
    SidemenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._router.events.subscribe(function (e) {
            if (e instanceof router_1.NavigationEnd) {
                _this._drawer.closeDrawer();
            }
        });
    };
    SidemenuComponent.prototype.ngAfterViewInit = function () {
        this._drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    };
    __decorate([
        core_1.ViewChild(angular_1.RadSideDrawerComponent), 
        __metadata('design:type', angular_1.RadSideDrawerComponent)
    ], SidemenuComponent.prototype, "drawerComponent", void 0);
    SidemenuComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sidemenu',
            templateUrl: 'sidemenu.component.html',
            styleUrls: ["sidemenu.component.css"],
        }),
        __param(0, core_1.Inject(page_1.Page)), 
        __metadata('design:paramtypes', [page_1.Page, core_1.ChangeDetectorRef, router_1.Router])
    ], SidemenuComponent);
    return SidemenuComponent;
}());
exports.SidemenuComponent = SidemenuComponent;
//# sourceMappingURL=sidemenu.component.js.map