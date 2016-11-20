import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { getFile, getImage, getJSON, getString, request, HttpRequestOptions } from "http";

import { User } from "./user.model";
import { BackendService } from "./backend.service";

let client_id = "hSkvf2jdkTtQQmwtyqeVs3Sn7Uco6eWNv7zFjXCe";

@Injectable()
export class LoginService {
  constructor(private http: Http) { }

  register(user: User) {
    var res = JSON.stringify({
      "username": user.username,
      "password": user.password,
      "first_name": user.first_name,
      "last_name": user.last_name,
      "email": user.email,
      "userprofile": {
        "phone": "0"
      }
    });
    return request({
      url: BackendService.apiUrl + "sign_up/", method: "POST",
      headers: { "Content-Type":"application/json" },
      content: res
    })
      .catch(this.handleErrors);
  }

  login(user: User) {
    var obj = {
      client_id: client_id,
      grant_type: "password",
      username: user.username,
      password: user.password
    };
    var transform = function (obj) {
      var str = [];
      for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      return str.join("&");
    };

    var url = BackendService.url + "o/token/";
    var data = transform(obj);

    return request({ url: url, method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, content: data }).then((data) => {
      let d = data.content.toJSON();
      BackendService.token = d.access_token;
    })
      .catch(this.handleErrors);
  }

  logoff() {
    BackendService.token = "";
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }
}