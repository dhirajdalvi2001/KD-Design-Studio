import classNames from 'classnames';

export default function Badge({ children }) {
  const variant = children.toLowerCase();
  const variantStyles = {
    active: 'text-green-500',
    inactive: 'text-red-500',
  };
  const dotStyles = {
    active: 'bg-green-500',
    inactive: 'bg-red-500',
  };
  return (
    <div className={classNames('flex items-center gap-2', variantStyles[variant])}>
      <span
        className={classNames('w-2 h-2 rounded-full', dotStyles[variant])}
      ></span>
      {children}
    </div>
  );
}
