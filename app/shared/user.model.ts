const validator = require("email-validator");

export class User {
  username: string;
  password: string;
  email: string;
  // isValidEmail() {
    // return validator.validate(this.username);
  // }
}