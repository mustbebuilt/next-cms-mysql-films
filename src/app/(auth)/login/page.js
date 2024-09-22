"use client";
import { loginUser } from "../../lib/actions";
import Link from "next/link";
import { useFormState } from "react-dom";

const LoginPage = () => {
  const initialState = {
    success: "",
    error: "",
  };
  const [formState, formAction] = useFormState(loginUser, initialState);

  return (
    <div>
      <form action={formAction}>
        <h1>Login</h1>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            placeholder='username'
            name='username'
            id='username'
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            placeholder='password'
            name='password'
            id='password'
          />
        </div>
        <button>Login</button>
        {formState.error && <p className='error'>{formState.error}</p>}
        <div>
          <Link href='/register'>"Don't have an account?" Register</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
