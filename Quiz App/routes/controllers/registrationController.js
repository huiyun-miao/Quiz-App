import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";

const registerValidationRules = {
  email: [validasaur.required, validasaur.isEmail],
  password: [validasaur.required, validasaur.minLength(4)]
};

const registerUser = async ({ request, response, render }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const registerData = {
    email: params.get("email"),
    password: params.get("password")
  }

  const [passes, errors] = await validasaur.validate(registerData, registerValidationRules);

  if (!passes) {
      console.log(errors);
      registerData.validationErrors = errors;
      render("register.eta", registerData);
  } else {
      await userService.addUser(
        params.get("email"),
        await bcrypt.hash(params.get("password")),
      );
      response.redirect("/auth/login");
  }
};

const showRegistrationForm = ({ render }) => {
  render("register.eta");
};

export { registerUser, showRegistrationForm };