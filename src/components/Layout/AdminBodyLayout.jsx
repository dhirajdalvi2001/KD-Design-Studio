import classNames from 'classnames';

export default function AdminBodyLayout({ children, className }) {
  return (
    <div
      className={classNames(
        'h-[calc(100vh-100px)] bg-transparent flex flex-col',
        className
      )}
    >
      {children}
    </div>
  );
}
