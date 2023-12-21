import React, {useState, useEffect } from "react";
import { AiOutlineSend } from "react-icons/ai";

export default function Footer() {
  const [email, setEmail] = useState('')
  const EmailSubmit = (e) =>{
    e.preventDefault();
    if (email === "") return;
    setEmail("");
  }
  return (
    <footer className="pt-10 bg-black text-white flex flex-col items-center">
      <div className="footer justify-evenly">
        <form onSubmit={EmailSubmit}>
          <header>
            <h1 className=" font-bold mb-4 text-2xl">Electrifies</h1>
            <p className="text-xl">Subscribe</p>
          </header>
          <div className="form-control w-60 gap-2">
            <label className="label">
              <span className=" text-gray-400">
                Get 10% off your first order
              </span>
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="username@site.com"
                className="input input-bordered border-white w-full max-w-xs bg-transparent"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <button
                
                type="submit"
                className="btn absolute top-0 right-0 rounded-l-none bg-transparent border-none hover:text-black text-white"
              >
                <AiOutlineSend className=" text-2xl  " />
              </button>
            </div>
          </div>
        </form>
        <nav>
          <header className="footer-title">Services</header>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <header className="footer-title">Company</header>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <header className="footer-title">Legal</header>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </div>
      <aside className="mt-10 mb-2 text-[#808080]">
        <p>Copyright © 2023 - All right reserved</p>
      </aside>
    </footer>
  );
}
