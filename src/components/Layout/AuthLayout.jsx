import classNames from 'classnames';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo-without-text.png';
import Typography from '../Typography/Typography';
import { useEffect } from 'react';
import { useAxios } from '../../api/useAxios';

export default function AuthLayout() {
  const navigate = useNavigate();
  const { isAuthenticated, isSuperadmin } = useAxios()
  const year = new Date().getFullYear();
  const copyrightText = `@${year} KD Studio`;

  const isLoginPage = window.location.pathname === '/auth/login'
  const footerLink = isLoginPage ? '/auth/sign-up' : '/auth/login'
  const footerPara = isLoginPage ? `Don't have an account? ` : `Already have an account? `
  const footerText = isLoginPage ? 'Sign-up here' : 'Login here'

  useEffect(() => { 
    if (isAuthenticated && isSuperadmin) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div
      className={classNames('min-h-screen flex justify-center items-center')}
    >
      <div className='bg-white max-md:hidden md:w-[45vw] lg:w-[50vw] xl:w-[60vw] h-screen flex flex-col justify-center'>
        <div className='max-md:px-3 lg:px-20 flex items-center-gap-4'>
          <Link to='/'>
            <img
              src={logo}
              alt='KD-Design-Studio'
              className='w-[140px] lg:w-[160px] xl:w-[220px]'
            />
          </Link>
          <div className='my-auto flex flex-col gap-1'>
            <Typography variant='heading'>KD Studio</Typography>
            <Typography variant='subtitle'>Products and Services</Typography>
          </div>
          <p></p>
        </div>
      </div>
      <div className='w-full md:w-[55vw] lg:w-[50vw] xl:w-[40vw] h-screen flex justify-center items-center bg-foreground-800'>
        <div className='mx-8 sm:mx-20 px-4 max-md:py-4 md:p-10 w-full h-[450px] bg-white flex flex-col justify-between gap-2'>
          {/* Form Header */}
          <div className='h-20 flex justify-center items-center gap-1 sm:gap-3'>
            <Link to='/'>
              <img
                src={logo}
                alt='KD-Design-Studio'
                className='w-[80px] sm:w-[100px] md:hidden'
              />
            </Link>
            <div className='flex flex-col'>
              <Typography variant='heading' className='md:hidden'>
                KD Studio
              </Typography>
              <Typography variant='sub-heading' className='font-bold'>
                Login to the studio
              </Typography>
            </div>
          </div>
          <Outlet />
          <div className="flex flex-col items-center gap-4">
            <Typography
              variant="caption"
              >
            {footerPara}<Link to={footerLink} className='text-blue-700 font-semibold'>{footerText}</Link>
            </Typography>
            {/* Form Footer */}
            <Typography variant='caption'>{copyrightText}</Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
