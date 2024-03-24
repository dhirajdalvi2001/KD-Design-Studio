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
import { menuItems } from "../../utils/data";
import Typography from "../Typography/Typography";

export default function TopNavbar({ theme, setTheme }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = location.pathname;

  function navigateTo(href) {
    navigate(href);
    setIsMenuOpen(false);
  }

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      className="bg-foreground-100 sticky top-0 w-full h-24"
    >
      <NavbarContent className="flex justify-between h-24">
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

        <div className="md:hidden flex items-center">
          <ThemeSwitch theme={theme} setTheme={setTheme} />
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="!w-10 !h-10"
          />
        </div>
      </NavbarContent>
      <div className="flex items-center">
        <ThemeSwitch
          theme={theme}
          setTheme={setTheme}
          className="hidden md:block"
        />
        <NavbarContent
          className="hidden md:flex md:flex-col gap-0 max-w-fit"
          justify="center"
        >
          {menuItems.map((item, index) => {
            const activeItem = item.href === pathName;
            if (item.href === "/") return null;
            return (
              <NavbarItem
                key={`${item}-${index}`}
                className="w-full text-right flex justify-end"
              >
                <Typography
                  variant="subtitle"
                  className={classNames(
                    "w-fit px-4 flex items-center cursor-pointer transition-all hover:line-through",
                    activeItem ? "text-primary-500" : "text-foreground"
                  )}
                  onClick={() => navigateTo(item.href)}
                >
                  {item.title}
                </Typography>
              </NavbarItem>
            );
          })}
        </NavbarContent>
      </div>
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
