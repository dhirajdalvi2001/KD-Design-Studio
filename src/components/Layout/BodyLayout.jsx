import classNames from "classnames";
import React from "react";

export default function BodyLayout({ children, className }) {
  return (
    <div className={classNames("min-h-screen bg-foreground-50", className)}>
      {children}
    </div>
  );
}
