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
import Logo from "../../assets/logo-without-text.png";
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
      maxWidth="full"
      className="bg-foreground-100 fixed top-0 w-full h-16 md:h-24"
    >
      <NavbarContent className="w-full">
        <NavbarContent className="flex justify-between h-16 md:h-24">
          <NavbarBrand>
            <div
              onClick={() => navigateTo("/")}
              className="font-bold text-inherit h-14 overflow-hidden cursor-pointer flex items-center"
            >
              <img
                src={Logo}
                alt="KD-design-studio"
                className="w-[80px] md:w-[100px]"
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
        <div className="hidden md:flex items-center">
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
              const activeItem =
                item.href === pathName || pathName.startsWith(item.href);
              if (item.href === "/") return null;
              return (
                <NavbarItem
                  key={`${item}-${index}`}
                  className="w-full text-right flex justify-end "
                >
                  <Typography
                    variant="subtitle"
                    className={classNames(
                      "w-fit px-4 flex items-center cursor-pointer transition-all hover:line-through !text-xs",
                      activeItem ? "text-red-600" : "text-foreground"
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
          {menuItems.map((item, index) => {
            const homeActive = pathName === "/" && item.title === "Home";
            const products =
              pathName.startsWith("/products/") && item.title === "Products";
            const activeItem = item.href === pathName || homeActive || products;
            return (
              <NavbarMenuItem key={`${item}-${index}`}>
                <div
                  className={classNames(
                    "w-full",
                    activeItem ? "text-red-600" : "text-foreground"
                  )}
                  onClick={() => navigateTo(item.href)}
                >
                  {item.title}
                </div>
              </NavbarMenuItem>
            );
          })}
        </NavbarMenu>
      </NavbarContent>
    </Navbar>
  );
}
