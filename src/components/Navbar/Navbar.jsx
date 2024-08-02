import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { LoggedInContext } from "../../context/LoggedInContext";

export default function Navbar() {
  const [streak, setStreak] = useState(0);
  const { isLoggedIn } = useContext(LoggedInContext);

  return (
    <nav>
      <div className="px-4 lg:px-96 md:px-30 sm:px-10 py-3 flex justify-between items-center text-base bg-navbar-bg text-white box-border border-b-1 border-b-navbar-boder">
        <ul className="flex gap-2 md:gap-8 lg:gap-6 justify-center items-center">
          <li className="flex gap-6 sm:gap-5 justify-center items-center">
            {/*Site Logo*/}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width={27}
              height={27}
              className="fill-main-dark"
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
            </svg>
            <Link to="/"> CodeIt </Link>{" "}
          </li>
          <li>
            <Link to="/problemset">Problems</Link>{" "}
          </li>
        </ul>

        <ul className="flex gap-5 justify-center items-center">
          {/*Notification button*/}
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width={18}
              height={18}
              className="fill-white"
            >
              <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112v25.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V208c0-61.9 50.1-112 112-112zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" />
            </svg>
          </button>
          <li className="flex gap-1.5 justify-center items-center">
            {/*Streak Button*/}
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width={18}
                height={18}
                className="fill-white"
              >
                <path d="M159.3 5.4c7.8-7.3 19.9-7.2 27.7 .1c27.6 25.9 53.5 53.8 77.7 84c11-14.4 23.5-30.1 37-42.9c7.9-7.4 20.1-7.4 28 .1c34.6 33 63.9 76.6 84.5 118c20.3 40.8 33.8 82.5 33.8 111.9C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5c0-38.4 17.8-85.3 45.4-131.7C73.3 97.7 112.7 48.6 159.3 5.4zM225.7 416c25.3 0 47.7-7 68.8-21c42.1-29.4 53.4-88.2 28.1-134.4c-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5c-16.5-21-46-58.5-62.8-79.8c-6.3-8-18.3-8.1-24.7-.1c-33.8 42.5-50.8 69.3-50.8 99.4C112 375.4 162.6 416 225.7 416z" />
              </svg>
            </button>
            <span>{streak}</span>
          </li>

          {/* TODO LOGIN OR SIGNUP BUTTON IF USER NOT LOGGED IN */}

          {isLoggedIn ? (
            <Link to="/user" className="flex gap-3 justify-center items-center">
              {/*Profile image*/}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width={27}
                height={27}
                className="fill-main-dark"
              >
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
              </svg>
              <span>Profile</span>
            </Link>
          ) : (
            <div className="flex gap-2">
              <Link to="/signup" className="bg-main-dark p-1 px-2 rounded-md">
                Signup
              </Link>
              <span className="py-1">or</span>
              <Link to="/login" className="bg-main-dark p-1 px-2 rounded-md">
                Login
              </Link>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
}
