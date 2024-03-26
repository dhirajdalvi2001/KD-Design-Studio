import classNames from "classnames";
import React from "react";

export default function Typography({
  children,
  variant,
  className,
  onClick,
  href,
}) {
  function applyTextStyles() {
    if (variant === "caption") {
      return "text-xs text-foreground-600";
    } else if (variant === "p") {
      return "text-sm text-foreground-600";
    } else if (variant === "subtitle") {
      return "text-[15px] font-bold text-foreground-700";
    } else if (variant === "title") {
      return "text-xl font-bold text-foreground-700";
    } else if (variant === "a") {
      return "text-[15px] font-bold text-blue-500";
    } else if (variant === "error") {
      return "h-0 text-xs text-red-500";
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
      {href ? <a href={href}>{children}</a> : children}
    </div>
  );
}
