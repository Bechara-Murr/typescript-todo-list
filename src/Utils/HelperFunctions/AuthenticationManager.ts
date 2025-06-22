import type { ILogin } from "../../Model/Authentication.model";
import { authenticationCredentials } from "../Constants/Login";
import * as ValidationErrorMessages from "../Constants/ValidationErrorMessages";
import { setItem, getItem, removeItem } from "./localStorageManager";
import { navigateTo } from "./router";

export const loginUser = (login: ILogin, window: Window): void => {
  const errorElement = document.getElementById("form__error");
  if (
    login.email === authenticationCredentials.email &&
    login.password === authenticationCredentials.password
  ) {
    if (errorElement) errorElement.innerText = "";
    setItem("userData", login.email);
    window.location.href = "tasks.html";
  } else {
    if (errorElement)
      errorElement.innerText = ValidationErrorMessages.WrongCredentials;
  }
};

export const logoutUser = () => {
  removeItem("userData");
  navigateTo("/");
};

export const checkUserAuthentication = (): boolean => {
  if (getItem("userData")) return true;
  return false;
};
