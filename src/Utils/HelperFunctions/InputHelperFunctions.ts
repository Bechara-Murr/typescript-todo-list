import * as ValidationErrorMessages from "../Constants/ValidationErrorMessages";
import * as RegexExpressions from "../Constants/RegularExpressions";

export const setFieldErrorState = (
  errorMessage: string,
  errorElement: HTMLElement | null,
  inputElement: HTMLInputElement | HTMLTextAreaElement
) => {
  if (errorElement) errorElement.innerText = errorMessage;
  inputElement.classList.add("input__error");
};

export const clearFieldErrorState = (
  errorElement: HTMLElement | null,
  inputElement: HTMLInputElement | HTMLTextAreaElement
) => {
  if (errorElement) errorElement.innerText = "";
  inputElement.classList.remove("input__error");
};

export const checkTaskFormInputValidity = (
  inputElement: HTMLInputElement | HTMLTextAreaElement,
  errorField: HTMLElement | null,
  fieldName: string,
  maxLength: number
): boolean => {
  const elementValue = inputElement.value;
  if (isNotNullEmptyorUndefined(elementValue)) {
    setFieldErrorState(
      ValidationErrorMessages.RequiredField.replace("{fieldName}", fieldName),
      errorField,
      inputElement
    );
    return false;
  }

  if (elementValue.trim().length > maxLength) {
    setFieldErrorState(
      ValidationErrorMessages.SurpassedLength.replace(
        "{maxLength}",
        maxLength.toString()
      ),
      errorField,
      inputElement
    );
    return false;
  }

  return true;
};

export const checkDateValidity = (
  dateInput: HTMLInputElement | null,
  dateErrorField: HTMLElement | null
): boolean => {
  if (dateInput) {
    if (dateInput.value < new Date().toISOString().split("T")[0]) {
      setFieldErrorState(
        ValidationErrorMessages.WrongDate,
        dateErrorField,
        dateInput
      );
      return false;
    }
    return true;
  }

  // Default case where date input is null
  return false;
};

export const checkEmailValidity = (emailInput: HTMLInputElement): boolean => {
  const emailValue = emailInput.value;
  const emailErrorElement: HTMLElement | null =
    document.getElementById("email__error");

  if (isNotNullEmptyorUndefined(emailValue)) {
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

export const checkPasswordValidity = (
  passwordInput: HTMLInputElement
): boolean => {
  const passwordValue = passwordInput.value;
  const passwordErrorElement = document.getElementById("password__error");

  if (isNotNullEmptyorUndefined(passwordValue)) {
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

const isNotNullEmptyorUndefined = (value: string): boolean => {
  return value.trim() === "" || value === null || value === undefined;
};
