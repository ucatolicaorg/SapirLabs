import HomeIcon from "../assets/home.png";
import LogIcon from "../assets/login.png";
import RegIcon from "../assets/register.png";
import { Link } from "react-router-dom";


export function NavBar() {
  return (
    <div className="flex flex-row items-center h-15 bg-gray-900 border border-neutral-700 rounded">
      <nav className="flex flex-row items-center justify-center p-5 gap-20 mx-40">
        <ul className="flex items-center gap-20">
          <li>
            <Link to="/login" className="flex items-center gap-2 hover:text-sky-400">
              <img src={LogIcon} className="w-6 h-6" alt="Login Icon" />
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="flex items-center gap-2 hover:text-sky-400">
              <img src={RegIcon} className="w-6 h-6" alt="Register Icon" />
              Register
            </Link>
          </li>
          <li>
            <Link to="/" className="flex items-center gap-2 hover:text-sky-400">
              <img src={HomeIcon} className="w-6 h-6" alt="Home Icon" />
              Home
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
