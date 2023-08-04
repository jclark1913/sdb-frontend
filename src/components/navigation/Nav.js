import { Link, NavLink } from 'react-router-dom';
import './Nav.css';
import { useContext } from 'react';

/** Nav bar for app that shows on every page.
 *
 * Contains links to main areas of app.
 *
 * Rendered by App.
 */

function Nav() {
  return (
    <nav className="Nav">
      <ul className="Navbar">
        <li className="nav-item">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
          <NavLink className="nav-link" to="/scrape-data">
            Scrape Data
          </NavLink>
          <NavLink className="nav-link" to="/collections">
            My Collections
          </NavLink>
          <NavLink className="nav-link" to="/about">
            About
          </NavLink>
          <NavLink className="settings" to="/settings">
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
