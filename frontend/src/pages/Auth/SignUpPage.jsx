import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignUpWebShopping from "../../assets/SignUpWebShopping.svg";
import AuthContext from "../../context/AuthContext";
export default function SignUpPage() {
  const { SignupUser } = useContext(AuthContext);

  return (
    <section className="flex items-center justify-evenly my-20">
      <img
        loading="lazy"
        src={SignUpWebShopping}
        alt="Lets sign up"
        className=" hidden md:block max-w-[40%] bg-blue-200"
      />
      <form onSubmit={SignupUser}>
        <header>
          <h1 className=" text-4xl font-semibold mb-4">Create an account</h1>
          <h3 className=" text-xl">Enter your details below</h3>
        </header>
        <div className="form-control mt-6">
          <label className="label">
            <span className="label-text font-semibold">Name: </span>
          </label>
          <input
            name="username"
            required
            type="text"
            placeholder="Enter your name"
            className="input input-bordered w-full max-w-xs"
          />
          <label className="label">
            <span className="label-text font-semibold">Email: </span>
          </label>
          <input
            type="email"
            required
            name="email"
            placeholder="Enter your email address"
            className="input input-bordered w-full max-w-xs"
          />
          <label className="label">
            <span className="label-text font-semibold">Password: </span>
          </label>
          <input
            type="password"
            required
            onFocus={(e) => (e.target.type = "text")}
            onBlur={(e) => (e.target.type = "password")}
            name="password"
            autoComplete="on"
            placeholder="Enter your password"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="btn bg-primary hover:bg-primary_hover text-white w-full my-10"
          >
            Create Account
          </button>
        </div>
        <div className=" text-center">
          Already have account?{" "}
          <Link className="underline" to={"/login"}>
            Log in
          </Link>
        </div>
      </form>
    </section>
  );
}
