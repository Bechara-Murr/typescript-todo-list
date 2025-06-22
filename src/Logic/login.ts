import { loginUser } from "../Utils/HelperFunctions/AuthenticationManager";
import {
  checkEmailValidity,
  checkPasswordValidity,
} from "../Utils/HelperFunctions/InputHelperFunctions";

export function init() {
  const login__form: HTMLFormElement | null = document.getElementById(
    "login__form"
  ) as HTMLFormElement | null;

  login__form &&
    login__form.addEventListener("submit", (e: SubmitEvent) => {
      e.preventDefault();

      const emailInput: HTMLInputElement | null = document.getElementById(
        "email"
      ) as HTMLInputElement | null;
      const passwordInput: HTMLInputElement | null = document.getElementById(
        "password"
      ) as HTMLInputElement | null;

      if (emailInput && passwordInput) {
        const emailValid = checkEmailValidity(emailInput);
        const passwordValid = checkPasswordValidity(passwordInput);

        if (emailValid && passwordValid) {
          loginUser(
            { email: emailInput.value, password: passwordInput.value },
            window
          );
        }
      }
    });
}
