import classNames from "classnames";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Typography({
  children,
  variant,
  className,
  onClick,
  href,
}) {
  const navigate = useNavigate();
  function applyTextStyles() {
    if (variant === "caption") {
      return "text-xs text-foreground-600";
    } else if (variant === "p") {
      return "text-sm text-foreground-600";
    } else if (variant === "subtitle") {
      return "text-[15px] font-bold text-foreground-700";
    } else if (variant === "title") {
      return "text-base font-bold text-foreground-700";
    } else if (variant === "a") {
      return "text-[15px] font-bold text-red-600";
    } else if (variant === "error") {
      return "h-0 text-xs text-red-500";
    }
  }
  function handleClick() {
    onClick && onClick();
    href && navigate(href);
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
