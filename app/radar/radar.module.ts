import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule } from "@angular/core";

import { radarRouting } from "./radar.routing";
import { RadarComponent } from "./radar.component";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        radarRouting
    ],
    declarations: [
        RadarComponent
    ]
})
export class RadarModule { }