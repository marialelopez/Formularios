import React, { useState } from "react";
import "./App.css";
import { registerUser } from "./services/registerUser";

export function App() {
  const onSubmit = (data) => {
    registerUser(data);
  };

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    age: "",
    password: "",
    passwordCheck: "",
    acceptTerms: false,
  });
  
  const [errors, setErrors] = useState({
    email: undefined,
    name: undefined,
    age: undefined,
    password: undefined,
    passwordCheck: undefined,
    acceptTerms: undefined,
  });

  function handleOnChange(event) {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));

    if (name === "email") {
      if (!value) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "email is required",
        }));
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "email is invalid",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: undefined,
        }));
      }
    } else if (name === "name") {
      if (value.length < 3) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: "name is required",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: undefined,
        }));
      }
    } else if (name === "age") {
      if (!value) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          age: "age is required",
        }));
      } else if (value < 18) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          age: "you must be above 18 to register",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          age: undefined,
        }));
      }
    } else if (name === "password") {
      if (!value) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "password is required",
        }));
      } else if (value.length < 6) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "password is too short",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: undefined,
        }));
      }
    } else if (name === "passwordCheck") {
      if (value !== formData.password) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          passwordCheck: "passwords do not match",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          passwordCheck: undefined,
        }));
      }
    } else if (name === "acceptTerms") {
      if (!checked) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          acceptTerms: "please read and accept the terms and conditions",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          acceptTerms: undefined,
        }));
      }
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    // Verificar si hay errores antes de enviar los datos
    const hasErrors = Object.values(errors).some((error) => error !== undefined);

    if (!hasErrors) {
      console.log(formData);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
            />
          </label>
          <span className="error" role="alert">
            {errors.email}
          </span>
        </div>
        <div>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleOnChange}
            />
          </label>
          <span className="error" role="alert">
            {errors.name}
          </span>
        </div>
        <div>
          <label>
            Age
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleOnChange}
            />
          </label>
          <span className="error" role="alert">
            {errors.age}
          </span>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleOnChange}
            />
          </label>
          <span className="error" role="alert">
            {errors.password}
          </span>
        </div>
        <div>
          <label>
            Password check
            <input
              type="password"
              name="passwordCheck"
              value={formData.passwordCheck}
              onChange={handleOnChange}
            />
          </label>
          <span className="error" role="alert">
            {errors.passwordCheck}
          </span>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleOnChange}
            />
            Accept terms & conditions: Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Pellentesque pharetra, tortor ac
            placerat elementum, neque libero luctus mi, ut efficitur nisl
            mauris at nisl. Suspendisse non neque et neque facilisis
            convallis. Praesent erat magna, sollicitudin eu porttitor ut,
            tincidunt sit amet urna. Vestibulum congue neque metus.
          </label>
          <span className="error" role="alert">
            {errors.acceptTerms}
          </span>
        </div>

        <button
          type="submit"
          disabled={Object.values(errors).some((error) => error !== undefined)}
        >
          Sign up
        </button>
      </form>
    </div>
  );
}

export default App;