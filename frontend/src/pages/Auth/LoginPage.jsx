import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import SignUpWebShopping from "../../assets/SignUpWebShopping.svg";
import AuthContext from "../../context/AuthContext";
export default function LoginPage() {
  const { loginUser } = useContext(AuthContext);
  return (
    <section className="flex items-center justify-evenly my-20">
      <img
        loading="lazy"
        src={SignUpWebShopping}
        alt="Lets sign up"
        className=" hidden md:block max-w-[40%] bg-blue-200"
      />
      <form onSubmit={loginUser}>
        <header>
          <h1 className=" text-4xl font-semibold mb-4">Log in to Exclusive</h1>
          <h3 className=" text-xl">Enter your details below</h3>
        </header>
        <div className="form-control mt-6">
          <label className="label">
            <span className="label-text font-semibold">Email: </span>
          </label>
          <input
            type="email"
            placeholder="Enter your email address"
            name="email"
            className="input input-bordered w-full max-w-xs"
          />
          <label className="label">
            <span className="label-text font-semibold">Password: </span>
          </label>
          <input
            type="password"
            name="password"
            required
            onFocus={(e) => (e.target.type = "text")}
            onBlur={(e) => (e.target.type = "password")}
            autoComplete="on"
            placeholder="Enter your password"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="btn bg-[#DB4444] hover:bg-[#BB232D] text-white w-full my-10"
          >
            Log in
          </button>
        </div>
        <div className=" text-center">
          Dont't have account yet?{" "}
          <Link className=" underline" to={"/signup"}>
            Sign up
          </Link>
        </div>
      </form>
    </section>
  );
}
