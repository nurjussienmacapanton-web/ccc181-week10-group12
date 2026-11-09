// GIVEN FILE (styled in form.css by Member 3). Do not edit.
// The sign-in is a DEMO: nothing is sent to a server and nothing is saved.
import { useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { LoginErrors, LoginFormValues } from '../types';
import { login, getMe } from '../api/auth';
import type { User } from '../api/auth';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_VALUES: LoginFormValues = {
  email: '',
  password: '',
  remember: false,
};

function validate(values: LoginFormValues): LoginErrors {
  const errors: LoginErrors = {};

  if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }

  return errors;
}

export default function LoginForm() {
  const [values, setValues] = useState<LoginFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  // Check existing login session when the page loads
  useEffect(() => {
    async function checkSession() {
      const token = sessionStorage.getItem('token');

      if (!token) {
        setIsCheckingSession(false);
        return;
      }

      try {
        const currentUser = await getMe(token);
        setUser(currentUser);
      } catch {
        sessionStorage.removeItem('token');
      } finally {
        setIsCheckingSession(false);
      }
    }

    checkSession();
  }, []);

  // Handle changes in the form
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, type, value, checked } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  // Handle login submission
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setErrorMessage('');

    // Do not send invalid form data to the backend
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(values.email, values.password);

      sessionStorage.setItem('token', result.token);
      setUser(result.user);
      setValues(INITIAL_VALUES);
    } catch (error) {
      if (error instanceof TypeError) {
        setErrorMessage(
          'Cannot reach the server. Please check your connection and try again.'
        );
      } else {
        setErrorMessage(
          error instanceof Error ? error.message : 'Login failed.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Handle logout
  function handleLogout() {
    sessionStorage.removeItem('token');
    setUser(null);
    setValues(INITIAL_VALUES);
    setErrors({});
    setErrorMessage('');
  }

  // Display a loading message while checking the session
  if (isCheckingSession) {
    return (
      <section className="login-card">
        <p>Checking your session...</p>
      </section>
    );
  }

  // Display the welcome screen after successful login
  if (user) {
    return (
      <section className="login-card welcome-card">
        <h2 className="login-card__title">Welcome, {user.name}!</h2>
        <p className="login-card__subtitle">{user.email}</p>

        <button
          type="button"
          className="btn btn--primary"
          onClick={handleLogout}
        >
          Logout
        </button>
      </section>
    );
  }

  // Display the login form
  return (
    <section className="login-card" aria-labelledby="login-title">
      <h2 id="login-title" className="login-card__title">
        Sign in
      </h2>

      <p className="login-card__subtitle">
        Use your school email to continue.
      </p>

      {errorMessage && (
        <p className="form-error" role="alert">
          {errorMessage}
        </p>
      )}

      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="email">School email</label>

          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="name@school.edu.ph"
            value={values.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />

          {errors.email && (
            <p id="email-error" className="form-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>

          <div className="password-row">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password ? 'password-error' : undefined
              }
            />

            <button
              type="button"
              className="btn btn--ghost toggle-password"
              aria-controls="password"
              aria-pressed={showPassword}
              onClick={() => setShowPassword((current) => !current)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {errors.password && (
            <p id="password-error" className="form-error" role="alert">
              {errors.password}
            </p>
          )}
        </div>

        <div className="form-options">
          <label className="checkbox">
            <input
              type="checkbox"
              name="remember"
              checked={values.remember}
              onChange={handleChange}
            />
            <span>Keep me signed in</span>
          </label>

          <a className="link" href="#forgot">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="btn btn--primary"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <div className="login-card__divider">
        <span>or</span>
      </div>

      <div className="alt-actions">
        <button type="button" className="btn btn--secondary">
          Create account
        </button>

        <button type="button" className="btn btn--secondary">
          Continue as guest
        </button>
      </div>
    </section>
  );
}