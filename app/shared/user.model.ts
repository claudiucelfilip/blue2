const validator = require("email-validator");

export class User {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  isValidEmail() {
    return validator.validate(this.email);
  }
}