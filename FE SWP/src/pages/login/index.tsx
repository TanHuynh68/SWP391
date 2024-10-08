import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@redux/auth/authSlice';
import { RootState, AppDispatch } from '@redux/store/store';
import { useNavigate, Link } from 'react-router-dom'; 
import styles from './Login.module.css';
import img1 from "@assets/home-img/logo.jpg";
import { decodeJWT } from '@/configs/decode-jwt';
import { message } from 'antd';
import { role } from '@/redux/hooks/usRedirect';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const dispatch = useDispatch<AppDispatch>(); 
  const authError = useSelector((state: RootState) => state.auth.error);
  const navigate = useNavigate(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(login({ email, password }));
   
    const decodeToken = decodeJWT(resultAction.payload + "");
    if(!decodeToken){
      message.error("Authentication Failed")
    }
    if (decodeToken.role === "CUSTOMER" ||decodeToken.role === "CLINICOWNER" || decodeToken.role === "DOCTOR" ) {
      console.log("decodeToken: ", decodeToken)
      localStorage.setItem("token", resultAction.payload + "");
      localStorage.setItem("user", JSON.stringify(decodeToken));
      if (login.fulfilled.match(resultAction)) {
        setPopupMessage("Login thành công");
      } else if (login.rejected.match(resultAction)) {
        setPopupMessage(authError || "Đăng nhập thất bại");
      }
      setShowPopup(true);
    if(decodeToken.role === role.CUSTOMER){
      navigate("/");
    }else if(decodeToken.role === role.DOCTOR){
      navigate("/doctor/manage-booking");
    }
    else{
      navigate("/clinic-owner/register-clinic");
    }
    } else {
      message.error("You are Admin")
      navigate("/admin/login");
    }
  };

  const closePopup = () => {
    setShowPopup(false);

    if (popupMessage === "Login thành công") {
      navigate('/'); 
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.logo}>
          <img src={img1} alt="logo" />
        </div>
        <h2 className={styles.title}>Welcome Back</h2>
        <p className={styles.subtitle}>Đăng Nhập vào tài khoản của bạn!</p>
        <div className={styles.socialButtons}>
          <button className={`${styles.socialButton} ${styles.facebook}`}>Tiếp Tục với Facebook</button>
          <button className={`${styles.socialButton} ${styles.twitter}`}>Tiếp Tục với Twitter</button>
          <button className={`${styles.socialButton} ${styles.google}`}>Tiếp Tục với Google</button>
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
        <div className={styles.footer}>
          <a href="/forgot-password" className={styles.forgotPassword}>Quên Mật Khẩu?</a>
          <Link to="/sign-up" className={styles.signUp}>Đăng Ký</Link> 
        </div>
      </div>

      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <p>{popupMessage}</p>
            <button onClick={closePopup} className={styles.popupButton}>Xác nhận</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
