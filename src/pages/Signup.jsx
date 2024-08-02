import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoggedInContext } from "../context/LoggedInContext";

export default function Signup() {
  const {isLoggedIn} = useContext(LoggedInContext);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [confirmpwd, setConfirmPwd] = useState("");
  const [passwordMatches, setPasswordMatches] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      toast.info("Already logged in redirecting...");
      setTimeout(() => {
        navigate("/user");
      }, 1000);
      return;
    }

    confirmpwd === data.password && data.password != ""
      ? setPasswordMatches(true)
      : setPasswordMatches(false);
  }, [data.password, confirmpwd]);

  async function handleSignup(e) {
    e.preventDefault();

    // Now sending the data to backend via axios
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/signup",
        data,
      );
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  }

  return (
    <main className="flex justify-center">
      <div className="text-center mt-20 bg-navbar-boder pb-36 px-10 rounded-md">
        <h1 className="text-4xl my-16">Sign Up</h1>
        <form
          className="flex flex-col gap-y-6 items-center"
          onSubmit={handleSignup}
        >
          <input
            autoComplete="off"
            type="text"
            placeholder="Username"
            className="resize-none placeholder:main-dark border-2 border-main-dark rounded-md w-80 h-10 px-6"
            value={data.username}
            onChange={(e) => {
              setData({ ...data, username: e.target.value });
            }}
            required={true}
          />

          <input
            autoComplete="off"
            type="email"
            placeholder="E-mail address"
            className="resize-none placeholder:main-dark border-2 border-main-dark rounded-md w-80 h-10 px-6"
            value={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
            required={true}
          />

          <input
            autoComplete="off"
            type="password"
            placeholder="Password"
            className="resize-none placeholder:main-dark border-2 border-main-dark rounded-md w-80 h-10 px-6"
            value={data.password}
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
            required={true}
          />

          <div className="relative w-full">
            <input
              id="confirmPassword"
              autoComplete="off"
              type="text"
              placeholder="Confirm password"
              className="resize-none placeholder:main-dark border-2 border-main-dark rounded-md h-10 px-6 w-full"
              value={confirmpwd}
              onChange={(e) => {
                setConfirmPwd(e.target.value);
              }}
            />
            <label
              htmlFor="confirmPassword"
              className={
                "absolute top-2 ml-2" + (passwordMatches ? " hidden" : "")
              }
            >
              <span>
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="text-red-400"
                />
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={passwordMatches ? false : true}
            className={
              "bg-main-dark w-4/12 py-2 rounded-sm mt-20  border-1 border-main-dark " +
              (passwordMatches
                ? "opacity-100 hover:border-white"
                : "opacity-75")
            }
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
