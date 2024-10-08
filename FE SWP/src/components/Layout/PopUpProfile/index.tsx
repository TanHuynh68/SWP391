import React, { useState, useEffect } from "react";
import styles from "./PopUpProfile.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaCheck } from "react-icons/fa6";
import type { RootState } from "@redux/Store/store";
import { logout } from '@redux/auth/logoutSlice';
import { getUserDataFromLocalStorage } from "@/constants/consts";
import { Col, Row } from "antd";

export const ProfilePopUp: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile.user);
  const token = localStorage.getItem('token'); 

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    dispatch(logout()); 
    navigate("/login");
  };

  const user = getUserDataFromLocalStorage();

  return (
    <div className={styles.profiledropdown}>
      <div onClick={handleOpen} className={styles.opts_account}>
        <div className={styles.avtpopup}>
          {profile ? (
            <img src={profile.avatar} alt="User Avatar" />
          ) : (
            <img src="https://i.pinimg.com/564x/d0/7b/a6/d07ba6dcf05fa86c0a61855bc722cb7a.jpg" alt="Default Avatar" />
          )}
        </div>
        {isOpen && (
          <div className={styles.dropdown_menu} style={{ position: "absolute" }}>
            <div className={styles.channel_my}>
              <div className={styles.profile_link}>
                {profile ? (
                  <>
                    <img src={profile.avatar} alt="User Avatar" />
                    <div className={styles.pd_content}>
                      <div className={styles.name3}>
                        <h6>{profile.name}</h6>
                        <div className={styles.ver2} title="Verify" style={{ marginBottom: "12px" }}>
                          <i>
                            <FaCheck />
                          </i>
                        </div>
                      </div>
                      <span>{profile.email}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <img src="https://i.pinimg.com/564x/d0/7b/a6/d07ba6dcf05fa86c0a61855bc722cb7a.jpg" alt="Default Avatar" />
                    <div className={styles.pd_content}>
                      <div className={styles.name3}>
                        <div>
                          <div>
                            {user?.given_name}
                          </div>
                          <div>
                            {user?.email}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              {profile && (
                <Link to="/instructor-profile" className={styles.dp_link_12}>
                  View My Profile
                </Link>
              )}
            </div>
            <div className={styles.night_mode_switch__btn}>
            </div>
            <Link to="/customer/booking-history" className={styles.item}>
              Lịch sử đặt lịch
            </Link>
            {token && (
              <a onClick={handleSignOut} className={styles.item}>
                Đăng Xuất
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
