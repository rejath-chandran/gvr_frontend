import "../index.css";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { login as apiLogin } from "../service/api";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { Loading } from "./Loading";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");
  const [isloading, Setloading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleapi = async (data) => {
    setError("");
    try {
      Setloading(true);
      const response = await apiLogin(data.email, data.password);
      login(response.data.token, response.data.user);
      Setloading(false);
      navigate("/");
    } catch (error) {
      Setloading(false);
      setError(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <>
      {isloading ? (
        <Loading />
      ) : (
        <>
          <div
            style={{
              width: "100dvw",
              height: "100dvh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <form className="form" onSubmit={handleSubmit(handleapi)}>
                <div class="title">
                  Welcome to Login <br />
                  <NavLink to={"/signup"}>signup to continue</NavLink>
                </div>
                <input
                  class="input"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && (
                  <span style={{ color: "red" }}>{errors.email.message}</span>
                )}
                <input
                  class="input"
                  placeholder="Password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                />
                {errors.password && (
                  <span style={{ color: "red" }}>
                    {errors.password.message}
                  </span>
                )}
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button class="button-confirm">Let`s go →</button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
