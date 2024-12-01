import classNames from 'classnames';
import { Outlet } from 'react-router-dom';
import logo from '../../assets/logo-without-text.png';
import Typography from '../Typography/Typography';

export default function AuthLayout() {
  const year = new Date().getFullYear();
  const copyrightText = `@${year} KD Studio`;
  return (
    <div
      className={classNames('min-h-screen flex justify-center items-center')}
    >
      <div className="bg-white max-md:hidden md:w-[45vw] lg:w-[50vw] xl:w-[55vw] h-screen flex flex-col justify-center">
        <div className="flex items-center-gap-4">
          <img
            src={logo}
            alt="KD-Design-Studio"
            className="w-[140px] lg:w-[160px] xl:w-[220px]"
          />
          <div className="my-auto flex flex-col gap-1">
            <Typography variant="heading">KD Studio</Typography>
            <Typography variant="subtitle">KD Design Studio</Typography>
          </div>
          <p></p>
        </div>
      </div>
      <div className="w-full md:w-[55vw] lg:w-[50vw] xl:w-[45vw] h-screen flex justify-center items-center bg-foreground-800">
        <div className="mx-20 p-10 w-full h-[500px] bg-foreground-100 flex flex-col justify-between gap-10">
          {/* Form Header */}
          <div className="h-20 flex justify-center items-center gap-3">
            <img
              src={logo}
              alt="KD-Design-Studio"
              className="w-[140px] md:hidden"
            />
            <Typography variant="sub-heading" className='font-bold'>Login to the studio</Typography>
          </div>
          <Outlet />
          {/* Form Footer */}
          <div className="h-20 flex justify-center items-center gap-3">
            <Typography variant="caption">{copyrightText}</Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
