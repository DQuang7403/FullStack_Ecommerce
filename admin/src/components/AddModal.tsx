import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
type AddProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
type FormValues = {
  eEmail: string;
  ePassword: string;
  Fname: string;
  Lname: string;
  phone: string;
  address: string;
};
export default function AddModal(props: AddProps) {
  const { register, handleSubmit } = useForm<FormValues>();
  const addNew = async (data: FormValues) => {
    const res = await fetch("http://127.0.0.1:5000/admin/add_employee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    if (res.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Employee Added",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      props.setOpen(false);
    } else {
      const message = await res.json();
      Swal.fire({
        icon: "error",
        title: message.msg,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className="w-screen h-screen absolute bg-[rgba(0,0,0,0.75)] top-0 right-0 flex overflow-auto sm:items-center sm:justify-center text-white">
      <div className=" bg-[#283342] overflow-auto rounded-md p-10 relative">
        <span
          className="cursor-pointer font-bold absolute top-10 right-10 text-xl "
          style={{ color: "white" }}
          onClick={() => props.setOpen(false)}
        >
          &#10006;
        </span>
        <h1 className="text-2xl mb-10 ">Add new</h1>
        <form
          onSubmit={handleSubmit(addNew)}
          className="flex flex-wrap max-w-[500px] justify-between"
        >
          <div className="flex flex-col gap-3 mb-5">
            <label htmlFor="eEmail">Email: </label>
            <input
              type="email"
              {...register("eEmail")}
              id=""
              className="p-2 bg-transparent text-white outline-none border border-white rounded-md"
            />
          </div>
          <div className="flex flex-col gap-3 mb-5">
            <label htmlFor="ePassword">Password: </label>
            <input
              type="password"
              {...register("ePassword")}
              id=""
              className="p-2 bg-transparent text-white outline-none border border-white rounded-md"
            />
          </div>
          <div className="flex flex-col gap-3 mb-5">
            <label htmlFor="Fname">First name: </label>
            <input
              type="text"
              {...register("Fname")}
              id=""
              className="p-2 bg-transparent text-white outline-none border border-white rounded-md"
            />
          </div>
          <div className="flex flex-col gap-3 mb-5">
            <label htmlFor="Lname">Last name: </label>
            <input
              type="text"
              {...register("Lname")}
              id=""
              className="p-2 bg-transparent text-white outline-none border border-white rounded-md"
            />
          </div>
          <div className="flex flex-col gap-3 mb-5">
            <label htmlFor="address">Address: </label>
            <input
              type="text"
              {...register("address")}
              id=""
              className="p-2 bg-transparent text-white outline-none border border-white rounded-md"
            />
          </div>
          <div className="flex flex-col gap-3 mb-5">
            <label htmlFor="phone">Phone: </label>
            <input
              type="text"
              {...register("phone")}
              id=""
              className="p-2 bg-transparent text-white outline-none border border-white rounded-md"
            />
          </div>
          <button className="btn w-full">Add</button>
        </form>
      </div>
    </div>
  );
}
