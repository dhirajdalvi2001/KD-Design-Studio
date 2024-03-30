import classNames from "classnames";

export default function BodyLayout({ children, className }) {
  return (
    <div
      className={classNames("pt-16 md:pt-24 min-h-screen bg-foreground-50", className)}
    >
      {children}
    </div>
  );
}
