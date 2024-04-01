import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [streak, setStreak] = useState(0);

  return (
    <nav>
      <div className="px-96 py-3.5 flex justify-between items-center text-lg bg-navbar-bg text-white box-border">
        <ul className="flex gap-4">
          <li className="flex gap-2.5 justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width={30}
              height={30}
              className="fill-main-dark"
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
            </svg>
            {" "}
            <Link to="/" className="drop-shadow-xl">
              {" "}
              CODEIT{" "}
            </Link>{" "}
          </li>
          <li>
            {" "}
            <Link to="/problemset">Problems</Link>{" "}
          </li>
        </ul>

        <ul className="flex gap-4 justify-center items-center">
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width={18}
              height={18}
              className="fill-white"
            >
              <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
            </svg>
          </li>

          <li className="flex gap-1 justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width={18}
              height={18}
              className="fill-white"
            >
              <path d="M159.3 5.4c7.8-7.3 19.9-7.2 27.7 .1c27.6 25.9 53.5 53.8 77.7 84c11-14.4 23.5-30.1 37-42.9c7.9-7.4 20.1-7.4 28 .1c34.6 33 63.9 76.6 84.5 118c20.3 40.8 33.8 82.5 33.8 111.9C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5c0-38.4 17.8-85.3 45.4-131.7C73.3 97.7 112.7 48.6 159.3 5.4zM225.7 416c25.3 0 47.7-7 68.8-21c42.1-29.4 53.4-88.2 28.1-134.4c-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5c-16.5-21-46-58.5-62.8-79.8c-6.3-8-18.3-8.1-24.7-.1c-33.8 42.5-50.8 69.3-50.8 99.4C112 375.4 162.6 416 225.7 416z" />
            </svg>
            <span>{streak}</span>
          </li>

          <li className="flex gap-5 justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width={30}
              height={30}
              className="fill-main-dark"
            >
              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
            </svg>
            <Link>Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
