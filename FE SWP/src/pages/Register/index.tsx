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
        <p>Đăng ký và bắt đầu sử dụng dịch vụ!</p>
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
            <option>Chọn vai trò của bạn</option>
            <option>Khách Hàng</option>
            <option>Nha Sĩ</option>
          </select>
          <div className={styles.checkboxContainer}>
            <input type="checkbox" id="emailOptIn" />
            <label htmlFor="emailOptIn">Tôi muốn nhận email với các chương trình giảm giá hấp dẫn và các khuyến nghị được cá nhân hóa</label>
          </div>
          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Signing Up...' : 'Next'}
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>Đăng ký thành công!</p>}
        <p>Bằng cách đăng ký, bạn đồng ý với chúng tôi <a href="#">Điều khoản dịch vụ</a> và <a href="#">Chính sách bảo mật</a>.</p>
        <p>Đã có tài khoản?
          
          <Link to="/login" className={styles.login}>Log In</Link> 
          </p>
      </div>

      
      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <h2>Registration Successful!</h2>
            <p>Your account has been created successfully. Please login to continue.</p>
            <div className={styles.buttonContainer}>
              <button onClick={handleLoginRedirect} className={styles.loginButton}>Đăng Nhập</button>
              <button onClick={handleCloseModal} className={styles.closeButton}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
