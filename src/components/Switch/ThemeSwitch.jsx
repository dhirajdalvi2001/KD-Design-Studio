import { VisuallyHidden, useSwitch } from '@nextui-org/react';
import { MoonIcon, SunIcon } from '../icons';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import { themeAtom } from '../../utils/globalAtom';

const ThemeSwitch = (props) => {
  const {
    Component,
    slots,
    className,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch(props);
  const [theme, settheme] = useAtom(themeAtom);
  return (
    <div className={classNames('flex flex-col', className)}>
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input
            {...getInputProps()}
            onClick={() =>
              settheme((prev) => (prev === 'light' ? 'dark' : 'light'))
            }
          />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: [
              'w-8 h-8',
              'flex items-center justify-center',
              'rounded-lg bg-default-100 hover:bg-default-200',
            ],
          })}
        >
          {theme === 'light' ? (
            <SunIcon className={classNames('fill-current')} />
          ) : (
            <MoonIcon className={classNames('text-white')} />
          )}
        </div>
      </Component>
    </div>
  );
};

export default ThemeSwitch;
