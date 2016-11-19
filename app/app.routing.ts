import { AuthGuard } from "./app-guard.service";

export const authProviders = [
  AuthGuard
];

export const appRoutes = [
    { path: "", redirectTo: "/radar", pathMatch: "full" }
];
