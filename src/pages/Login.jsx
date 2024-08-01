import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleLogin(e) {
    // handleSubmit
    e.preventDefault();

    axios
      .post(import.meta.env.VITE_API_URL + "/login", data)
      .then((response) => {
        if (response.data?.token) {
          localStorage.setItem("auth_token", response.data?.token);
          navigate("/");
        }
      })
      .catch((e) => {
        console.log(e);
        alert(e.response.data.message)
      });
  }

  return (
    <main className="flex justify-center">
      <div className="text-center mt-20 bg-navbar-boder pb-36 px-10 rounded-md">
        <h1 className="text-4xl my-16">Login</h1>

        <form
          className="flex flex-col gap-y-6 items-center"
          onSubmit={handleLogin}
        >
          <input
            type="text"
            placeholder="Username"
            className="resize-none placeholder:main-dark border-2 border-main-dark rounded-md w-80 h-10 px-6"
            value={data.username}
            onChange={(e) => {
              setData({ ...data, username: e.target.value });
            }}
            required={true}
          />

          <input
            type="email"
            placeholder="E-mail address"
            className="resize-none placeholder:main-dark border-2 border-main-dark rounded-md w-80 h-10 px-6"
            value={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
            required={true}
          />

          <input
            type="password"
            placeholder="Password"
            className="resize-none placeholder:main-dark border-2 border-main-dark rounded-md w-80 h-10 px-6"
            value={data.password}
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
            required={true}
          />

          <button
            type="submit"
            className="bg-main-dark w-4/12 py-2 rounded-sm mt-20  border-1 border-main-dark hover:border-white"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
