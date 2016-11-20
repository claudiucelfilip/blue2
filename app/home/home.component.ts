import { homeRouting } from './home.routing';
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Color } from "color";
import { connectionType, getConnectionType } from "connectivity";
import { Animation } from "ui/animation";
import { View } from "ui/core/view";
import { prompt } from "ui/dialogs";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";

import { alert, LoginService, User } from "../shared";

@Component({
  selector: "home",
  templateUrl: "home/home.component.html",
  styleUrls: ["home/home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router,
    private userService: LoginService,
    private page: Page) {
  }

  ngOnInit() {
    this.page.actionBarHidden = false;
  }
}