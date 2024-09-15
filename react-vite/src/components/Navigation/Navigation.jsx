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
          <img src="/DishDabble1.png" alt="DishDabble" className="logo" />
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/recipes/personal" className="active-link">
            <button className="my-recipes">My Recipes</button>
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
