import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoggedInContext } from "../context/LoggedInContext";
import Navbar from "../components/Navbar/Navbar";

export default function User() {
  const [user_data, set_user_data] = useState({});
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(LoggedInContext);

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error(
        "Err: invalid auth_token, User is not logged in redirecting....",
      );
      navigate("/login");
      return;
    }

    const auth_token = localStorage.getItem("auth_token");

    axios
      .get(import.meta.env.VITE_API_URL + "/user", {
        headers: { authorization_token: "bearer " + auth_token },
      })
      .then((response) => {
        // console.log(response);
        set_user_data(response?.data?.user);
      })
      .catch((error) => {
        setIsLoggedIn(false);
        toast.error(
          error.response.status +
            " " +
            error.response.data.message +
            " redirecting to login page...",
        );
        navigate("/login");
      });
  }, []);

  function handleLogOut() {
    localStorage.removeItem("auth_token");
    setIsLoggedIn(false);
    toast.warning("Logged out");
    navigate("/");
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <main className="w-full h-full bg-body-bg">
        <div className="flex flex-col items-start gap-3 mt-32 ml-20 w-96 h-48 bg-black rounded-md px-10 py-10">
          <div className="flex gap-6">
            <div>
              <p>Username: </p>
              <p>Email:</p>
              <p>Role:</p>
            </div>
            <div>
              <p>{user_data?.username}</p>
              <p>{user_data?.email}</p>
              <p>{user_data?.Role}</p>
            </div>
          </div>
          <button className="my-3" onClick={handleLogOut}>
            Log-Out
          </button>
        </div>
      </main>
    </div>
  );
}
