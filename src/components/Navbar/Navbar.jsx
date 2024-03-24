import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center text-lg px-4 py-3 bg-dreamy-white text-dreamy-dark font-semibold">
      <Link to="/" className="drop-shadow-xl">
        CODEIT
      </Link>
      <ul className="flex gap-4">
        <li>
          <Link to="/problemset">Problems</Link>
        </li>
        <li>
          <Link>User</Link>
        </li>
      </ul>
    </nav>
  );
}
