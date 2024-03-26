import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
type EmployeeType = {
  employee_id: number;
  firstname: string;
  email: string;
  lastname: string;
  address: string;
  phone: string;
  password: string;
};
type EditProps = {
  data: EmployeeType;
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
};
type FormValues = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phone: string;
  address: string;
};
export default function EditModal(props: EditProps) {
  const { register, handleSubmit } = useForm<FormValues>();
  const values = props.data;
  useForm({
    defaultValues: {
      email: props.data.email,
      password: props.data.password,
      firstname: props.data.firstname,
      lastname: props.data.lastname,
      phone: props.data.phone,
      address: props.data.address,
    },
    values,
  });
  const editEmployee = async (data: FormValues) => {
    console.log(data);
    const res = await fetch(
      `http://127.0.0.1:5000/admin/edit_employee/${props.data.employee_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      },
    );
    if (res.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Employee Edited",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
      props.setOpenEdit(false);
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
          onClick={() => props.setOpenEdit(false)}
        >
          &#10006;
        </span>
        <h1 className="text-2xl mb-10 ">
          Edit Employee: {props.data.employee_id}
        </h1>
        <form
          onSubmit={handleSubmit(editEmployee)}
          className="flex flex-wrap max-w-[500px] justify-between"
        >
          <div className="flex flex-col gap-3 mb-5">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              {...register("email")}
              className="p-2 bg-transparent text-white outline-none border border-white rounded-md"
              defaultValue={values.email}
            />
          </div>
          <div className="flex flex-col gap-3 mb-5">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              defaultValue={values.password}
              onFocus={(e) => e.target.type = "text"}
              {...register("password")}
              className="p-2 bg-transparent text-white outline-none border border-white rounded-md"
            />
          </div>
          <div className="flex flex-col gap-3 mb-5">
            <label htmlFor="firstname">First name: </label>
            <input
              type="text"
              defaultValue={values.firstname}
              {...register("firstname")}
              className="p-2 bg-transparent text-white outline-none border border-white rounded-md"
            />
          </div>
          <div className="flex flex-col gap-3 mb-5">
            <label htmlFor="lastname">Last name: </label>
            <input
              type="text"
              defaultValue={values.lastname}
              {...register("lastname")}
              className="p-2 bg-transparent text-white outline-none border border-white rounded-md"
            />
          </div>
          <div className="flex flex-col gap-3 mb-5">
            <label htmlFor="address">Address: </label>
            <input
              type="text"
              defaultValue={values.address}
              {...register("address")}
              className="p-2 bg-transparent text-white outline-none border border-white rounded-md"
            />
          </div>
          <div className="flex flex-col gap-3 mb-5">
            <label htmlFor="phone">Phone: </label>
            <input
              type="text"
              defaultValue={values.phone}
              {...register("phone")}
              className="p-2 bg-transparent text-white outline-none border border-white rounded-md"
            />
          </div>
          <button className="btn w-full">Edit</button>
        </form>
      </div>
    </div>
  );
}
