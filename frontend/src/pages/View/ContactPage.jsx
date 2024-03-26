import React, { useState, useEffect } from "react";
import { BsTelephone, BsEnvelope } from "react-icons/bs";
export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const formSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:5000/account/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
        message,
        phone,
      }),
    });
    const data = await res.json();
    if (res.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Thank you for contacting us!",
        text: "We will get back to you soon.",
        showConfirmButton: false,
        timer: 1500,

      });
      setEmail("");
      setMessage("");
      setName("");
      setPhone("");
    }else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      })
    }
  };
  return (
    <section className="flex flex-col items-center rounded md:flex-row gap-10 lg:mx-32 md:my-32 mx-1 my-4 justify-evenly">
      <div className=" p-10 w-80 shadow-[2px_1px_13px_0px_rgba(0,0,0,0.1)]">
        <div className="border-b-2 border-black pb-10 mb-10 flex flex-col items-start gap-4">
          <div className="flex items-center gap-4">
            <div className=" flex items-center w-10 h-10 justify-center rounded-full bg-[#DB4444]">
              <BsTelephone className=" text-2xl text-white " />
            </div>
            <div className=" text-xl font-semibold">Call Us</div>
          </div>
          <p>We are available 24/7, 7 days a week.</p>
          <p>Phone: +1 123 456 789</p>
        </div>

        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-4">
            <div className=" flex items-center w-10 h-10 justify-center rounded-full bg-[#DB4444]">
              <BsEnvelope className=" text-2xl text-white " />
            </div>
            <div className=" text-xl font-semibold">Write To US</div>
          </div>
          <p>Fill out our form and we will contact you within 24 hours.</p>
          <p>Emails: customer@techtopia.com</p>
          <p>Emails: support@techtopia.com</p>
        </div>
      </div>
      <form
        onSubmit={formSubmit}
        className=" flex flex-col gap-8 rounded items-center shadow-[2px_1px_13px_0px_rgba(0,0,0,0.1)] w-80 flex-grow p-3 md:p-10 h-[489px]"
      >
        <div className="flex flex-col gap-3 w-full md:flex-row">
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name *"
            className="input input-bordered w-full "
          />
          <input
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email *"
            className="input input-bordered w-full "
          />
          <input
            type="text"
            name="phonenumber"
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Your Phone *"
            className="input input-bordered w-full"
          />
        </div>
        <textarea
          name="message"
          onChange={(e) => setMessage(e.target.value)}
          className="textarea textarea-bordered w-full resize-none h-48"
          placeholder="Your Massage"
        ></textarea>
        <button
          type="submit"
          className="btn bg-primary hover:bg-primary_hover text-white my-4"
        >
          Send message
        </button>
      </form>
    </section>
  );
}
