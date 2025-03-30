import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  Button,
} from "@nextui-org/react";
import Logo from "../../assets/logo-without-text.png";
import { useNavigate } from "react-router-dom";
import ThemeSwitch from "../Switch/ThemeSwitch";
import { useAxios } from "../../api/useAxios";
import ProfileMenu from "../Select/ProfileMenu";
import { themeAtom } from "../../utils/globalAtom";
import { useSetAtom } from "jotai";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const { handleLogout } = useAxios();
  const setTheme = useSetAtom(themeAtom);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function navigateTo(href) {
    if (href === "logout") {
      handleLogout();
      return;
    }
    navigate(href);
    setIsMenuOpen(false);
  }

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      maxWidth="full"
      className="bg-foreground-100 fixed top-0 w-full h-16"
    >
      <NavbarContent className="w-full">
        <div className="ml-auto flex items-center">
          <Button
            size="sm"
            onClick={() => {
              setTheme("light");
              navigateTo("/");
            }}
            className="mr-3 min-w-fit"
          >
            Go to Customer
          </Button>
          <ThemeSwitch />
          <ProfileMenu />
        </div>
      </NavbarContent>
    </Navbar>
  );
}
