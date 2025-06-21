import { loginTemplate } from "../src/Presentation/Templates/loginTemplate";
import * as loginModule from "../src/Logic/login";
import * as AuthManager from "../src/Utils/HelperFunctions/AuthenticationManager";

describe("Login Page Validation", () => {
  beforeEach(() => {
    document.body.innerHTML = loginTemplate;
    loginModule.init();
  });

  describe("Email Input validation", () => {
    it("Email should show required error message when no value is submitted", () => {
      const loginForm = document.getElementById(
        "login__form"
      ) as HTMLFormElement;
      const emailInputError = document.getElementById(
        "email__error"
      ) as HTMLElement;

      loginForm.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );

      expect(emailInputError.innerText).toBe("Email field is required");
    });

    it("Email should require correct email format when wrong format is provided", () => {
      const loginForm = document.getElementById(
        "login__form"
      ) as HTMLFormElement;
      const emailInput = document.getElementById("email") as HTMLInputElement;
      const emailInputError = document.getElementById(
        "email__error"
      ) as HTMLElement;

      emailInput.value = "wrong_format@example";

      loginForm.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );

      expect(emailInputError.innerText).toBe(
        "Please enter a valid email address"
      );
    });

    it("Email error should have empty value when correct email format is provided", () => {
      const loginForm = document.getElementById(
        "login__form"
      ) as HTMLFormElement;
      const emailInput = document.getElementById("email") as HTMLInputElement;
      const emailInputError = document.getElementById(
        "email__error"
      ) as HTMLElement;

      emailInput.value = "correct_format@example.com";

      loginForm.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );

      expect(emailInputError.innerText).toBe("");
    });
  });

  describe("Password Input validation", () => {
    it("Password should show required error message when no value is submitted", () => {
      const loginForm = document.getElementById(
        "login__form"
      ) as HTMLFormElement;
      const passwordInputError = document.getElementById(
        "password__error"
      ) as HTMLElement;

      loginForm.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );

      expect(passwordInputError.innerText).toBe("Password field is required");
    });

    it("Password should require correct password format when wrong format is provided", () => {
      const loginForm = document.getElementById(
        "login__form"
      ) as HTMLFormElement;
      const passwordInput = document.getElementById(
        "password"
      ) as HTMLInputElement;
      const passwordInputError = document.getElementById(
        "password__error"
      ) as HTMLElement;

      passwordInput.value = "StrongPass";

      loginForm.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );

      expect(passwordInputError.innerText).toBe(
        "Password must have at least 8 characters, 1 Uppercase letter, 1 lowercase letter and 1 number"
      );
    });

    it("Password error should have empty value when correct password format is provided", () => {
      const loginForm = document.getElementById(
        "login__form"
      ) as HTMLFormElement;
      const passwordInput = document.getElementById(
        "password"
      ) as HTMLInputElement;
      const passwordInputError = document.getElementById(
        "password__error"
      ) as HTMLElement;

      passwordInput.value = "StrongPass1";

      loginForm.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );

      expect(passwordInputError.innerText).toBe("");
    });
  });

  describe("Login Form Submission", () => {
    // Spy on authentication manager's loginUser function
    const spy = jest
      .spyOn(AuthManager, "loginUser")
      .mockImplementation(() => {});

    it("Should not call login function when one or both fields are not provided", () => {
      const loginForm = document.getElementById(
        "login__form"
      ) as HTMLFormElement;
      const emailInput = document.getElementById("email") as HTMLInputElement;

      emailInput.value = "correct_format@example.com";

      loginForm.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );

      expect(spy).not.toHaveBeenCalled();
    });

    it("Should not call login function when one field has wrong format", () => {
      const loginForm = document.getElementById(
        "login__form"
      ) as HTMLFormElement;
      const emailInput = document.getElementById("email") as HTMLInputElement;
      const passwordInput = document.getElementById(
        "password"
      ) as HTMLInputElement;

      emailInput.value = "correct_format@example.com";
      passwordInput.value = "passwordmissing1uppercase";

      loginForm.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );

      expect(spy).not.toHaveBeenCalled();
    });

    it("Should call loginUser when login credentials have valid formats", () => {
      const loginForm = document.getElementById(
        "login__form"
      ) as HTMLFormElement;
      const emailInput = document.getElementById("email") as HTMLInputElement;
      const passwordInput = document.getElementById(
        "password"
      ) as HTMLInputElement;

      emailInput.value = "example@exampledomain.com";
      passwordInput.value = "MyStrongP@ssw0rd!";

      loginForm.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );

      expect(spy).toHaveBeenCalled();
    });
  });
});
