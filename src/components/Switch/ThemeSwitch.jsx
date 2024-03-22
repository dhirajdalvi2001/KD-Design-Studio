import { VisuallyHidden, useSwitch } from "@nextui-org/react";
import { MoonIcon, SunIcon } from "../icons";

const ThemeSwitch = (props) => {
  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch(props);
  const { theme, setTheme } = props;
  return (
    <div className="flex flex-col gap-2">
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input
            {...getInputProps()}
            onClick={() =>
              setTheme((prev) => (prev === "light" ? "dark" : "light"))
            }
          />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: [
              "w-8 h-8",
              "flex items-center justify-center",
              "rounded-lg bg-default-100 hover:bg-default-200",
            ],
          })}
        >
          {theme === "light" ? <SunIcon /> : <MoonIcon />}
        </div>
      </Component>
    </div>
  );
};

export default ThemeSwitch;
