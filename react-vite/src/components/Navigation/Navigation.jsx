import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import "./Navigation.css";

function Navigation() {
  const user = useSelector((store) => store.session.user);

  return (
    <ul className="nav-container">
      <li>
        <NavLink to="/" className="active-link">
          Home
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/recipes/new" className="active-link">
            Create New Recipe
          </NavLink>
        </li>
      )}
      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
