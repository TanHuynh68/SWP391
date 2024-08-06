import React from 'react';
import styles from './Login.module.css';
import img1 from "@assets/home-img/logo.jpg"

const Login: React.FC = () => {
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
        <form className={styles.loginForm}>
          <input type="email" placeholder="Email Address" className={styles.inputField} />
          <input type="password" placeholder="Password" className={styles.inputField} />
          <div className={styles.rememberMe}>
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>
          <button type="submit" className={styles.loginButton}>Log In</button>
        </form>
        <div className={styles.footer}>
          <a href="/forgot-password" className={styles.forgotPassword}>Forgot Password?</a>
          <a href="/sign-up" className={styles.signUp}>Sign Up</a>
        </div>
      </div>
      </div>

  );
};

export default Login;
