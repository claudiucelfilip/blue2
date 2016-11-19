import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { User } from "./user.model";
import { BackendService } from "./backend.service";

let client_id = "hSkvf2jdkTtQQmwtyqeVs3Sn7Uco6eWNv7zFjXCe";

@Injectable()
export class LoginService {
  constructor(private http: Http) { }

  register(user: User) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.post(
      BackendService.apiUrl + "user",
      JSON.stringify({
        Username: user.email,
        Email: user.email,
        Password: user.password
      }),
      { headers: headers }
    )
    .catch(this.handleErrors);
  }

  login(user: User) {
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

    let headers = new Headers({"Content-Type": "application/x-www-form-urlencoded"});
    let options = new RequestOptions({ headers: headers });

    var url = BackendService.apiUrl + "o/token/";
    var data = transform(obj);
    return this.http.post(
      url,
      data,
      options
    )
    .map(response => response.json())
      .do(data => {
        console.log(data);
      BackendService.token = data.Result.access_token;
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