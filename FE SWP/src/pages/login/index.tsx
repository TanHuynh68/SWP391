import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@redux/auth/authSlice';
import { RootState, AppDispatch } from '@redux/store/Store';
import styles from './Login.module.css';
import img1 from "@assets/home-img/logo.jpg";

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>(); 
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const authError = useSelector((state: RootState) => state.auth.error);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.logo}>
          <img src={img1} alt="logo" />
        </div>
        <h2 className={styles.title}>Welcome Back</h2>
        <p className={styles.subtitle}>Log in to Your Account!</p>
        <div className={styles.socialButtons}>
          <button className={`${styles.socialButton} ${styles.facebook}`}>Continue with Facebook</button>
          <button className={`${styles.socialButton} ${styles.twitter}`}>Continue with Twitter</button>
          <button className={`${styles.socialButton} ${styles.google}`}>Continue with Google</button>
        </div>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            className={styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.inputField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={styles.rememberMe}>
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>
          <button type="submit" className={styles.loginButton}>Log In</button>
        </form>
        {authStatus === 'loading' && <p>Loading...</p>}
        {authStatus === 'failed' && <p>{authError}</p>}
        <div className={styles.footer}>
          <a href="/forgot-password" className={styles.forgotPassword}>Forgot Password?</a>
          <a href="/sign-up" className={styles.signUp}>Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
