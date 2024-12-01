import { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  Button,
} from '@nextui-org/react';
import Logo from '../../assets/logo-without-text.png';
import { useNavigate } from 'react-router-dom';
import ThemeSwitch from '../Switch/ThemeSwitch';
import { useAxios } from '../../api/useAxios';
import ProfileMenu from '../Select/ProfileMenu';

export default function AdminNavbar() {
  const navigate = useNavigate();
  const { handleLogout } = useAxios();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function navigateTo(href) {
    if (href === 'logout') {
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
      className="bg-foreground-100 fixed top-0 w-full h-12 md:h-16"
    >
      <NavbarContent className="w-full">
        <NavbarContent className="flex justify-between h-12 md:h-16">
          <NavbarBrand>
            <div
              onClick={() => navigateTo('/')}
              className="font-bold text-inherit h-14 overflow-hidden cursor-pointer flex items-center"
            >
              <img
                src={Logo}
                alt="KD-design-studio"
                className="w-[60px] md:w-[80px]"
              />
            </div>
          </NavbarBrand>

          <div className="md:hidden flex items-center">
            <Button size="sm" onClick={() => navigateTo('/')} className="mr-3">
              Go to Customer
            </Button>
            <ThemeSwitch />
            <NavbarMenuToggle
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="!w-10 !h-10 !text-foreground-500"
            />
          </div>
        </NavbarContent>
        <div className="hidden md:flex items-center">
          <Button
            size="sm"
            onClick={() => navigateTo('/')}
            className="mr-3 min-w-fit"
          >
            Go to Customer
          </Button>
          <ThemeSwitch className="hidden md:block" />
          <ProfileMenu />
        </div>
      </NavbarContent>
    </Navbar>
  );
}
