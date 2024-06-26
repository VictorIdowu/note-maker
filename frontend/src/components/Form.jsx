import React, { useEffect, useRef, useState } from "react";
import api from "../api";
import { Navigate, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const Form = ({ route, method }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const buttonRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const btn = buttonRef.current;
    username.length > 0 && password.length > 0
      ? (btn.disabled = false)
      : (btn.disabled = true);
  }, [username, password, buttonRef]);

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post(route, { username, password });

      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, await res.data.access);
        localStorage.setItem(REFRESH_TOKEN, await res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="max-w-[500px] mx-auto bg-white drop-shadow-md p-6 rounded flex flex-col gap-6"
      onSubmit={handleSubmit}
    >
      <h1 className="text-center text-2xl text-blue-800 font-medium">{name}</h1>
      <label
        className="flex flex-col gap-[1px] text-blue-950"
        htmlFor="username"
      >
        {"Username "}

        <input
          className="border-2 border-gray-400 h-11 rounded-md pl-2 focus:outline-none focus:border-blue-800"
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
      </label>
      <label
        className="flex flex-col gap-[1px] text-blue-950 relative"
        htmlFor="password"
      >
        Password
        <input
          className="border-2 border-gray-400 h-11 rounded-md pl-2 focus:outline-none focus:border-blue-800"
          name="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <button
          onClick={() => setShowPassword((prev) => !prev)}
          className="text-xs text-blue-500 absolute bottom-3 right-2"
          type="button"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </label>
      <button
        ref={buttonRef}
        className="bg-blue-800 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed text-white h-11 rounded-md"
        type="submit"
        disabled
      >
        {loading ? "Loading..." : name}
      </button>
      <p
        onClick={() =>
          method === "login" ? navigate("/register") : navigate("/login")
        }
        className="text-center text-blue-700 cursor-pointer"
      >
        {method === "login" ? "Register" : "Login"}
        {" instead"}
      </p>
    </form>
  );
};

export default Form;
