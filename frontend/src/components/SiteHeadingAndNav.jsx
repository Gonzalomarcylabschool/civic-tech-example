import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import '../index.css'

export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);
  const [showNav, setShowNav] = useState(false);

  return (
    <header>
      <a id="logo" href="/">
        Make your Wish
      </a>
      <nav className={showNav ? "show-nav" : ""}>
        {/* Hamburger icon */}
        <div className="hamburger" onClick={() => setShowNav(!showNav)}>
          &#9776;
        </div>
        <ul>
          {/* Render navigation links */}
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {currentUser ? (
            <>
              <li>
                <NavLink to="/users" end={true}>
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink to={`/users/${currentUser.id}`}>
                  {currentUser.username}
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/sign-up">Sign Up</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
