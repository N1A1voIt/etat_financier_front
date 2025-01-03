import { Injectable } from "@angular/core";
import { AppService } from "../app.service";
import { async } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  constructor(private appService: AppService) {}
  isLoggedIn(): boolean {
    console.log("Helloo");
    return localStorage.getItem("userToken") != null;
  }
  // @ts-ignore
  async isAdmin() {
    let isAdmin = false;
    if (this.isLoggedIn()) {
      // @ts-ignore
      const response = await this.appService.retrieveMyProfile(localStorage.getItem("userToken")).toPromise();
      isAdmin = response.admin;
      console.log("isAdmin:" + isAdmin);
    }
    return isAdmin;
  }
}
