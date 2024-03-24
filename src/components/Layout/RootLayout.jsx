import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Outlet, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import TopNavbar from "../Navbar/TopNavbar";
import classNames from "classnames";
import Footer from "../Footer/Footer";

const RootLayout = () => {
  const [theme, setTheme] = useState("light");
  const location = useLocation();
  const showFooter = !location.pathname.startsWith("/products/");

  return (
    <div className={classNames(theme, "min-h-screen")}>
      <ToastContainer theme={theme} />
      <TopNavbar theme={theme} setTheme={setTheme} />
      <Outlet />
      {showFooter && <Footer />}
    </div>
  );
};

export default RootLayout;
