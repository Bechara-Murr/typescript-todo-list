import { loginUser } from "../Utils/HelperFunctions/AuthenticationManager";
import * as RegexExpressions from "../Utils/Constants/RegularExpressions";
import * as ValidationErrorMessages from "../Utils/Constants/ValidationErrorMessages";
import {
  clearFieldErrorState,
  setFieldErrorState,
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

const checkEmailValidity = (emailInput: HTMLInputElement): boolean => {
  const emailValue = emailInput.value;
  const emailErrorElement: HTMLElement | null =
    document.getElementById("email__error");

  if (
    emailValue.trim() === "" ||
    emailValue === null ||
    emailValue === undefined
  ) {
    setFieldErrorState(
      ValidationErrorMessages.RequiredEmail,
      emailErrorElement,
      emailInput
    );
    return false;
  }

  if (!RegexExpressions.EmailRegex.test(emailInput.value)) {
    setFieldErrorState(
      ValidationErrorMessages.InvalidEmail,
      emailErrorElement,
      emailInput
    );
    return false;
  }

  clearFieldErrorState(emailErrorElement, emailInput);

  return true;
};

const checkPasswordValidity = (passwordInput: HTMLInputElement): boolean => {
  const passwordValue = passwordInput.value;
  const passwordErrorElement = document.getElementById("password__error");

  if (
    passwordValue.trim() === "" ||
    passwordValue === null ||
    passwordValue === undefined
  ) {
    setFieldErrorState(
      ValidationErrorMessages.RequiredPassword,
      passwordErrorElement,
      passwordInput
    );
    return false;
  }

  if (!RegexExpressions.PasswordRegex.test(passwordValue)) {
    setFieldErrorState(
      ValidationErrorMessages.InvalidPassword,
      passwordErrorElement,
      passwordInput
    );
    return false;
  }

  clearFieldErrorState(passwordErrorElement, passwordInput);
  return true;
};
