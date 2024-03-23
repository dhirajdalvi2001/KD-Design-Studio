import classNames from "classnames";
import React from "react";

export default function Typography({ children, variant, className, onClick }) {
  function applyTextStyles() {
    if (variant === "caption") {
      return "text-xs text-foreground-600";
    } else if (variant === "p") {
      return "text-sm text-foreground-600";
    } else if (variant === "subtitle") {
      return "text-[15px] font-bold text-foreground-700";
    } else if (variant === "title") {
      return "text-xl font-bold text-foreground-700";
    }
  }
  function handleClick() {
    onClick && onClick();
  }
  return (
    <div
      className={classNames(applyTextStyles(), className)}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}
