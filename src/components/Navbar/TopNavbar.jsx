import { useState } from "react";
import classNames from "classnames";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Logo from "../../assets/logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import ThemeSwitch from "../Switch/ThemeSwitch";

export default function TopNavbar({ theme, setTheme }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Testing Comment
  const menuItems = [
    { title: "Home", href: "/" },
    { title: "Products", href: "/products" },
    { title: "Work", href: "/work" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ];
  const pathName = location.pathname;

  function navigateTo(href) {
    navigate(href);
    setIsMenuOpen(false);
  }

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      className=""
      isBordered
    >
      <NavbarContent className="flex justify-between">
        <NavbarBrand>
          <div
            onClick={() => navigateTo("/")}
            className="font-bold text-inherit h-14 overflow-hidden cursor-pointer"
          >
            <img
              src={Logo}
              alt="KD-design-studio"
              className="w-[140px] -mt-5"
            />
          </div>
        </NavbarBrand>

        <div className="md:hidden flex gap-4 items-center">
          <ThemeSwitch theme={theme} setTheme={setTheme} />
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </div>
      </NavbarContent>
      <NavbarContent className="hidden md:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <div
              className={classNames(
                "w-full h-14 px-4 flex items-center cursor-pointer",
                item.href === pathName ? "text-primary" : "text-foreground"
              )}
              onClick={() => navigateTo(item.href)}
            >
              {item.title}
            </div>
          </NavbarItem>
        ))}
        <ThemeSwitch theme={theme} setTheme={setTheme} />
      </NavbarContent>
      <NavbarMenu className="lg:hidden">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <div
              className={classNames(
                "w-full",
                item.href === pathName ? "text-primary" : "text-foreground"
              )}
              onClick={() => navigateTo(item.href)}
            >
              {item.title}
            </div>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
