import { Injectable } from "@angular/core";
import { getString, setString } from "application-settings";

const tokenKey = "tokenkey";

export class BackendService {
  static apiUrl = "http://46.101.106.245/api/";

  static isLoggedIn(): boolean {
    return !!getString("token");
  }

  static get token(): string {
    return getString("token");
  }

  static set token(theToken: string) {
    setString("token", theToken);
  }
}
