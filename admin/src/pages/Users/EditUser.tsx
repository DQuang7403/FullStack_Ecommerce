import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteUser } from "./User";
import { FaRegTrashCan } from "react-icons/fa6";
type User = {
  user_id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  address: string;
  pwd: string;
  create_at: string;
};
export default function EditUser() {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState<User>({} as User);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUserDetail = async () => {
      const res = await fetch(`http://localhost:5000/admin/users/${id}`);
      const data = await res.json();
      setUserDetails(data);
    };
    fetchUserDetail();
  }, []);
  const updateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/admin/users/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username: usernameRef.current?.value,
        email: emailRef.current?.value,
        phone: phoneRef.current?.value,
        firstname: firstnameRef.current?.value,
        lastname: lastnameRef.current?.value,
        address: addressRef.current?.value,
        pwd: pwdRef.current?.value,
      }),
    });
    const data = await res.json();
    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        title: data.message,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
      });
    }
  };
  return (
    <section className="overflow-x-auto bg-white md:m-6  overflow-auto rounded-md">
      <h1 className="text-2xl p-6 font-semibold">Edit User</h1>
      <div className="flex items-center gap-10 px-6">
        <h3 className="text-lg">User ID: {userDetails.user_id}</h3>
        <h3 className="text-lg">
          Create at:{" "}
          {new Date(userDetails.create_at).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </h3>
        <FaRegTrashCan
          className="text-red-500 hover:text-red-600 cursor-pointer  transition-colors text-xl"
          onClick={() => deleteUser(userDetails.user_id)}
        >
          Delete
        </FaRegTrashCan>
      </div>
      <form
        onSubmit={updateUser}
        className="p-6 grid grid-cols-1 md:grid-cols-2 gap-3"
      >
        <div className="form-control col-span-1">
          <label className="label">
            <span className="label-text">Username: </span>
          </label>
          <input
            ref={usernameRef}
            type="text"
            placeholder="Username"
            name="title"
            className="input input-bordered"
            defaultValue={userDetails.username}
            onChange={(e) => {
              if (usernameRef.current)
                usernameRef.current.value = e.target.value;
            }}
          />
        </div>
        <div className="form-control col-span-1">
          <label className="label">
            <span className="label-text">First Name: </span>
          </label>
          <input
            ref={firstnameRef}
            type="text"
            placeholder="First name"
            name="title"
            className="input input-bordered"
            defaultValue={userDetails.firstname}
          />
        </div>
        <div className="form-control col-span-1">
          <label className="label">
            <span className="label-text">Last Name: </span>
          </label>
          <input
            ref={lastnameRef}
            type="text"
            placeholder="Last name"
            name="title"
            className="input input-bordered"
            defaultValue={userDetails.lastname}
            onChange={(e) => {
              if (lastnameRef.current)
                lastnameRef.current.value = e.target.value;
            }}
          />
        </div>
        <div className="form-control col-span-1">
          <label className="label">
            <span className="label-text">Email: </span>
          </label>
          <input
            required
            ref={emailRef}
            type="text"
            placeholder="Email"
            name="title"
            className="input input-bordered"
            defaultValue={userDetails.email}
            onChange={(e) => {
              if (emailRef.current) emailRef.current.value = e.target.value;
            }}
          />
        </div>
        <div className="form-control col-span-1">
          <label className="label">
            <span className="label-text">Address: </span>
          </label>
          <input
            ref={addressRef}
            type="text"
            placeholder="Address"
            name="title"
            className="input input-bordered"
            defaultValue={userDetails.address}
            onChange={(e) => {
              if (addressRef.current) addressRef.current.value = e.target.value;
            }}
          />
        </div>
        <div className="form-control col-span-1">
          <label className="label">
            <span className="label-text">Phone: </span>
          </label>
          <input
            ref={phoneRef}
            type="text"
            placeholder="Phone Number"
            name="title"
            className="input input-bordered"
            defaultValue={userDetails.phone}
            onChange={(e) => {
              if (phoneRef.current) phoneRef.current.value = e.target.value;
            }}
          />
        </div>
        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            ref={pwdRef}
            required
            type="password"
            className={`input input-bordered`}
            defaultValue={userDetails.pwd}
            onFocus={(e) => (e.target.type = "text")}
            onBlur={(e) => {
              e.target.type = "password";
            }}
            onChange={(e) => {
              if (pwdRef.current) pwdRef.current.value = e.target.value;
            }}
          />
        </div>
        <div className="flex items-center gap-4">
          <button type="submit" className="btn btn-accent text-white">
            Update
          </button>

          <Link to="/user" className="link">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}
