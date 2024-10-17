import "../index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../service/api";

import { useForm } from "react-hook-form";
import { Loading } from "./Loading";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isloading, Setloading] = useState(false);
  const handleapi = async (data) => {
    setError("");
    try {
      Setloading(true);
      await signup(data.email, data.password);
      Setloading(false);
      navigate("/login");
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
                  SignUp to Create New User
                  <br />
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
                <button class="button-confirm">Create→</button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Signup;
