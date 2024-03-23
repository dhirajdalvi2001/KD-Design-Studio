import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import TopNavbar from "../Navbar/TopNavbar";
import classNames from "classnames";
import Footer from "../Footer/Footer";

const RootLayout = () => {
  const [theme, setTheme] = useState("light");
  const location = useLocation();
  const showFooter = !location.pathname.startsWith("/products/");

  return (
    <div className={classNames(theme, "min-h-screen")}>
      <TopNavbar theme={theme} setTheme={setTheme} />
      <Outlet />
      {showFooter && <Footer />}
    </div>
  );
};

export default RootLayout;
