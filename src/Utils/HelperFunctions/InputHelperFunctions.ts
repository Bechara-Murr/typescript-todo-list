import * as ValidationErrorMessages from "../Constants/ValidationErrorMessages";

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
  if (
    elementValue === "" ||
    elementValue === null ||
    elementValue === undefined
  ) {
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
