import useAuthContext from "../context/AuthContext";
import { RiAdminLine } from "react-icons/ri";
export default function Login() {
  const { loginUser } = useAuthContext();
  return (
    <section className="w-full bg-[#F5F5F5] h-[calc(100vh-64px)] flex flex-col items-center sm:flex-row justify-evenly overflow-auto">
      <img
        src={
          "https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
        className="max-w-[35%] hidden sm:block rounded-sm"
      />
      <form
        onSubmit={loginUser}
        className="bg-white flex flex-col rounded-lg px-6 md:px-10 min-w-[400px] py-8 my-auto shadow-lg"
      >
        <div className="flex flex-col items-center">
          <RiAdminLine className=" text-white bg-primary w-24 h-24  p-5 mb-4 rounded-full" />
          <h1 className="text-2xl font-bold rounded-md text-center mb-6">
            Log in to your account
          </h1>
        </div>
        <p className=" mb-4">Enter your details down below</p>
        <div className="form-control my-4">
          <input
            type="text"
            className="bg-transparent focus:outline-none p-3 border-2 border-[#a1a1a1] rounded-md mb-4"
            placeholder="Email"
            name="email"
          />
          <input
            type="password"
            className="bg-transparent focus:outline-none p-3 border-2 border-[#a1a1a1] rounded-md"
            placeholder="Password"
            name="password"
            onFocus={(e) => {
              e.target.type = "text";
            }}
            onBlur={(e) => {
              e.target.type = "password";
            }}
          />
        </div>
        <button className="btn bg-primary hover:bg-primary_hover scale-hover border-none text-white text-lg md:w-1/2 my-4">
          Log in
        </button>
      </form>
    </section>
  );
}
