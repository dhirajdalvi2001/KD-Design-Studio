import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import TopNavbar from "../Navbar/TopNavbar";
import classNames from "classnames";

const RootLayout = () => {
  const [theme, setTheme] = useState("dark");
  return (
    <div className={classNames(theme)}>
      <TopNavbar theme={theme} setTheme={setTheme} />
      <Outlet />
    </div>
  );
};

export default RootLayout;
