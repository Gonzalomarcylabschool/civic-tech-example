import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import '../index.css'

export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      const content = document.querySelector('#content');

      if (window.scrollY > 0) {
        header.classList.add('sticky');
        content.style.paddingTop = `${header.offsetHeight}px`; // Add padding to content
      } else {
        header.classList.remove('sticky');
        content.style.paddingTop = '0'; // Reset padding
      }
    };

    const handleMouseMove = (event) => {
      const header = document.querySelector('header');
      if (event.clientY <= 5) { // Adjust the threshold value as needed
        header.style.top = '0';
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <header>
      <a id="logo" href="/">
        Script Academy
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
