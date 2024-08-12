import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { AppDispatch, RootState } from '@redux/store/Store';
import { registerUser } from '@redux/auth/registerSlice';
import styles from './register.module.css';



const SignUp: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state: RootState) => state.register);

  useEffect(() => {
    if (success) {
      setShowModal(true);
    }
    if (error) {
      alert(`Registration failed: ${error}`);
    }
  }, [success, error]);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser({ fullName, email, password })).then((result: any) => {
      console.log('Registration status:', result);
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLoginRedirect = () => {
    setShowModal(false);
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>Welcome to FPTeeth</h1>
        <p>Sign Up and Start Using The Service!</p>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Full Name"
            className={styles.input}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email Address"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select className={styles.input}>
            <option>Select your role</option>
            <option>Customer</option>
            <option>Dentist</option>
          </select>
          <div className={styles.checkboxContainer}>
            <input type="checkbox" id="emailOptIn" />
            <label htmlFor="emailOptIn">I'm in for emails with exciting discounts and personalized recommendations</label>
          </div>
          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Signing Up...' : 'Next'}
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>Registration successful!</p>}
        <p>By signing up, you agree to our <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.</p>
        <p>Already have an account? 
          
          <Link to="/login" className={styles.login}>Log In</Link> 
          </p>
      </div>

      
      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <h2>Registration Successful!</h2>
            <p>Your account has been created successfully. Please login to continue.</p>
            <div className={styles.buttonContainer}>
              <button onClick={handleLoginRedirect} className={styles.loginButton}>Login</button>
              <button onClick={handleCloseModal} className={styles.closeButton}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
