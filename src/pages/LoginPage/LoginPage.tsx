import { FC } from 'react';
import { Formik, FormikHelpers } from 'formik';
import styles from './LoginPage.module.scss';
import { Link } from 'react-router-dom';

import LoginPageForm from './components/LoginPageForm';

interface InputValues {
  email: string;
  password: string;
}

const LoginPage: FC = () => {
  return (
    <>
      <div className='md:block fixed top-[70px] left-[80px] hidden '>Logo</div>
      <div className={styles['loginPage-container']}>
        <h1 className={styles['loginPage-title']}>Log in</h1>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={(inputValues: InputValues, { setSubmitting }: FormikHelpers<InputValues>) => {
            alert('hi');
          }}>
          <LoginPageForm />
        </Formik>
        <div className={styles['loginPage_delimiter']}>
          <div className={styles['delimiter-line']}></div>
          <div className='text-[20px]'>or</div>
          <div className={styles['delimiter-line']}></div>
        </div>
        <div className={styles['loginVia-block']}>
          <div className={styles['loginVia-text']}>log in via</div>
          <ul className='flex gap-6 justify-center items-center'>
            <li className=' rounded-full bg-red-600 w-[51px] h-[51px]'>
              <Link to='#'></Link>
            </li>
            <li className=' rounded-full bg-green-600 w-[51px] h-[51px]'>
              <Link to='#'></Link>
            </li>
            <li className=' rounded-full bg-blue-600 w-[51px] h-[51px]'>
              <Link to='#'></Link>
            </li>
          </ul>
        </div>
        <div className='text-sm mb-[85px] sm:mb-[127px]'>
          <div>
            <span className='font-medium'>You don`t have an account?</span>
            &nbsp;
            <Link className='text-blue-1030 font-semibold' to='#'>
              Sign up
            </Link>
          </div>
        </div>
        <div className='text-gray-1030 max-w-[302px] sm:max-w-[449px]'>
          <p className='text-center text-2xs'>
            By clicking “Sign in” above, you acknowledge that you have read and understood, and
            agree to Chapter's&nbsp;
            <Link className='underline' to='#'>
              Terms & Conditions
            </Link>
            &nbsp; and&nbsp;
            <Link className='underline' to='#'>
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
