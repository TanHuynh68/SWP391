import React from 'react';
import styles from './register.module.css';

const SignUp: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>Welcome to FPTeeth </h1>
        <p>Sign Up and Start Using The Service!</p>
        <form>
          <input type="text" placeholder="Full Name" className={styles.input} />
          <input type="email" placeholder="Email Address" className={styles.input} />
          <input type="password" placeholder="Password" className={styles.input} />
          <select className={styles.input}>
            <option>Select your role</option>
            <option>Customer</option>
            <option>Dentist</option>
          </select>
          <div className={styles.checkboxContainer}>
            <input type="checkbox" id="emailOptIn" />
            <label htmlFor="emailOptIn">I'm in for emails with exciting discounts and personalized recommendations</label>
          </div>
          <button type="submit" className={styles.submitButton}>Next</button>
        </form>
        <p>By signing up, you agree to our <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.</p>
        <p>Already have an account? <a href="#">Log In</a></p>
      </div>
    </div>
  );
};

export default SignUp;
