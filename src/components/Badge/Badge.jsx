import classNames from "classnames";

export default function Badge({ children }) {
  const variant = children?.replaceAll(" ", "").toLowerCase();
  const variantStyles = {
    active: "text-green-500",
    inactive: "text-red-500",
    superadmin: "text-blue-500",
    normaluser: "text-foreground-500",
  };
  const dotStyles = {
    active: "bg-green-500",
    inactive: "bg-red-500",
    superadmin: "bg-blue-500",
    normaluser: "bg-foreground-500",
  };
  return (
    <div
      className={classNames("flex items-center gap-2", variantStyles[variant])}
    >
      <span
        className={classNames("min-w-2 w-2 h-2 rounded-full", dotStyles[variant])}
      ></span>
      {children}
    </div>
  );
}
