import useAuthContext from "../context/AuthContext";
export default function Login() {
  const { loginUser } = useAuthContext();
  return (
    <section className="w-full bg-[#F5F5F5] h-[calc(100vh-64px)] flex flex-col items-center md:flex-row justify-evenly ">
      <img
        src={
          "https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
        className="max-w-[40%] invisible md:visible"
      />

      <form
        onSubmit={loginUser}
        className="bg-[#283342] flex flex-col rounded-lg px-10 md:px-16 w-[min(350px, 40vw)] py-10  my-auto"
      >
        <h1 className="text-xl font-bold bg-[#1DB5B8] text-white rounded-md text-center p-2 mb-10">
          LOG IN
        </h1>
        <p className="text-white mb-4">Enter your details down below</p>
        <div className="form-control my-4">
          <input
            type="text"
            className="bg-transparent focus:outline-none text-white p-3 border-b-2 border-[#a1a1a1] rounded-md"
            placeholder="Email"
            name="email"
          />
          <input
            type="password"
            className="bg-transparent focus:outline-none text-white p-3 border-b-2 border-[#a1a1a1] rounded-md"
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
        <button className="btn bg-[#1DB5B8] hover:bg-[#007F83] border-none text-white text-lg md:w-1/2 my-4">
          Log in
        </button>
      </form>
    </section>
  );
}
