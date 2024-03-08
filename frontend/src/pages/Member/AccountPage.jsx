import React, { useEffect, useState, useContext } from "react";
import { fetchAPI } from "../../utils/fetchAPI";
import AuthContext from "../../context/AuthContext";
export default function AccountPage() {
  const [userDetail, setUserDetail] = useState({});
  const [refresh, setRefresh] = useState(false);
  const { user } = useContext(AuthContext);
  const [resetPassword, setResetPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (resetPassword.newPassword === resetPassword.confirmPassword) {
      let response = await fetch("http://127.0.0.1:5000/account/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          id: userDetail.id,
          username: userDetail.username,
          email: userDetail.email,
          firstname: userDetail.firstname,
          lastname: userDetail.lastname,
          phone: userDetail.phone,
          address: userDetail.address,
          password: resetPassword.newPassword || "",
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        setRefresh(true);
        Swal.fire({
          title: "Good job!",
          text: "Account updated successfully",
          icon: "success",
        });
        setResetPassword({
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password does not match!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      const data = await fetchAPI(`account/get_user/${user?.sub}`);
      setUserDetail(data);
      setRefresh(false);
    };
    fetchUser();
  }, [refresh]);
  return (
    <form
      onSubmit={handleUpdate}
      className="flex flex-col gap-8 rounded items-center shadow-[2px_1px_13px_0px_rgba(0,0,0,0.1)]  flex-grow p-3 md:p-10 my-10"
    >
      <h1 className="text-xl font-semibold text-[#DB4444]">
        Edit Your Profile
      </h1>
      <div className="flex flex-col gap-3 w-full md:flex-row">
        <div className="flex-grow">
          <label>First Name:</label>
          <input
            type="text"
            placeholder="Enter your first name"
            className="input input-bordered w-full "
            value={userDetail?.firstname || ""}
            onChange={(e) => {
              setUserDetail({
                ...userDetail,
                firstname: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex-grow">
          <label>Last Name:</label>
          <input
            type="text"
            placeholder="Enter your last name"
            className="input input-bordered w-full "
            value={userDetail?.lastname || ""}
            onChange={(e) => {
              setUserDetail({
                ...userDetail,
                lastname: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex-grow">
          <label>Phone:</label>
          <input
            name="phone"
            type="text"
            placeholder="Enter your phone number"
            className="input input-bordered w-full "
            value={userDetail?.phone || ""}
            onChange={(e) => {
              setUserDetail({
                ...userDetail,
                phone: e.target.value,
              });
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full md:flex-row">
        <div className="flex-grow">
          <label>Email:</label>
          <input
            type="text"
            placeholder="Enter your email"
            className="input input-bordered w-full "
            name="email"
            value={userDetail?.email || ""}
            onChange={(e) => {
              setUserDetail({
                ...userDetail,
                email: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex-grow">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            name="address"
            placeholder="Enter your Address "
            className="input input-bordered w-full "
            value={userDetail?.address || ""}
            onChange={(e) => {
              setUserDetail({
                ...userDetail,
                address: e.target.value,
              });
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <label>Password Change:</label>
        <input
          type="password"
          placeholder="New Password"
          className="input input-bordered w-full "
          autoComplete="on"
          value={resetPassword.newPassword}
          onChange={(e) => {
            setResetPassword({
              ...resetPassword,
              newPassword: e.target.value,
            });
          }}
          onFocus={(e) => (e.target.type = "text")}
          onBlur={(e) => (e.target.type = "password")}
        />
        <input
          type="password"
          autoComplete="on"
          placeholder="Confirm Password"
          className="input input-bordered w-full"
          value={resetPassword.confirmPassword}
          onChange={(e) => {
            setResetPassword({
              ...resetPassword,
              confirmPassword: e.target.value,
            });
          }}
          onFocus={(e) => (e.target.type = "text")}
          onBlur={(e) => (e.target.type = "password")}
        />
      </div>
      <div className="">
        <div
          onClick={() => setRefresh(!refresh)}
          className="btn btn-outline border-0 text-black hover:bg-inherit hover:text-[#DB4444]"
        >
          Cancel
        </div>
        <button
          type="submit"
          className="btn bg-[#DB4444] hover:bg-[#BB232D] text-white my-4 px-10"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
