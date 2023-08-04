import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

/** Nav bar for app that shows on every page.
 *
 * Contains links to main areas of app.
 *
 * Rendered by App.
 */

function Nav() {
  return (
    <nav className="Nav flex justify-center mt-10">
        <NavigationMenu className="border">
          <NavigationMenuList>
            <NavigationMenuItem className=''>
              <NavLink to="/">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem className=''>
              <NavLink to="/scrape">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Scrape Data</NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink to="/collections">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Saved Collections</NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink to="/about">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>About</NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink to="/settings">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Settings</NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
    </nav>
  );
}

export default Nav;
