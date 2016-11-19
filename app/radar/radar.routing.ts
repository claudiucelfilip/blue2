import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RadarComponent } from "./radar.component";

const radarRoutes: Routes = [
    { path: "radar", component: RadarComponent },
];
export const radarRouting: ModuleWithProviders = RouterModule.forChild(radarRoutes);