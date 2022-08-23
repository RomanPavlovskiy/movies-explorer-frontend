import { useState } from "react";

export const useValidation = (valid) => {
  const [isWrong, setIsWrong] = useState(valid);
  const [errorMessage, setErrorMessage] = useState("");

  const validateNameInput = (value) => {
    return /^[а-яА-Яa-zA-ZЁё\-\s]*$/imu.test(value);
  };

  const onChange = (evt) => {
    if (!evt.target.validity.valid) {
      setIsWrong(true);
      setErrorMessage(evt.target.validationMessage);
    } else if (
      evt.target.id === "name-input" &&
      validateNameInput(evt.target.value) === false
    ) {
      setIsWrong(true);
      setErrorMessage(
        "Количество знаков от 2 до 30, латиница или кириллица, может содержать пробел или дефис"
      );
    } else {
      setIsWrong(false);
      setErrorMessage("");
    }
  };

  return {
    isWrong,
    errorMessage,
    onChange,
  };
};
