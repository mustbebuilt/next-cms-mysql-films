"use client";
import { registerUser } from "@/app/lib/actions"; // Make sure the correct import path is set
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const initialState = {
    message: "",
  };
  const [formState, formAction] = useFormState(registerUser, initialState);
  const [passwordError, setPasswordError] = useState(null); // To display password mismatch error
  const router = useRouter();

  useEffect(() => {
    // If registration is successful, redirect to login
    if (formState?.message === true) {
      router.push("/login");
    }
  }, [formState?.message, router]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.target);
    const password = formData.get("password");
    const passwordRepeat = formData.get("passwordRepeat");

    // Check if passwords match
    if (password !== passwordRepeat) {
      setPasswordError("Passwords do not match. Please try again.");
      return;
    }

    setPasswordError(null); // Clear error if passwords match

    // Submit the form using formAction (which calls registerUser)
    formAction(formData); // Pass the form data directly
  };

  return (
    <div className='container'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username / Email</label>
          <input
            type='email'
            placeholder='Enter your email'
            name='username'
            id='username'
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            placeholder='Enter your password'
            name='password'
            id='password'
            required
          />
        </div>
        <div>
          <label htmlFor='passwordRepeat'>Repeat Password</label>
          <input
            type='password'
            placeholder='Repeat your password'
            name='passwordRepeat'
            id='passwordRepeat'
            required
          />
        </div>
        <button type='submit'>Register</button>

        {/* Show password mismatch error */}
        {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}

        {/* Show any message from the server */}
        {formState.message && typeof formState.message === "string" && (
          <p>{formState.message}</p>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
