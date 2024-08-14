// import { useState } from "react";
// import styles from "./styles.module.css";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { FaCheck } from "react-icons/fa6";
// // import { deleteCookie } from "@/service/cookies";
// // import { getCookie } from "@/service/cookies";
// // import type { RootState } from "@redux/Store/store";

// export const ProfilePopUp = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const navigate = useNavigate();
//   const profile = useSelector((state: RootState) => state.profile.user);
//   const token = getCookie("token");

//   const handleOpen = () => {
//     setIsOpen(!isOpen);
//   };
//   const handleSignOut = () => {
//     deleteCookie("token");
//     navigate("/login");
//   };

//   return (
//     <div className={styles.profiledropdown}>
//       <div onClick={handleOpen} className={styles.opts_account}>
//         <div className={styles.avtpopup}>{(profile && <img src={profile.avatar} />) || <img src="https://i.pinimg.com/564x/d0/7b/a6/d07ba6dcf05fa86c0a61855bc722cb7a.jpg" />} </div>
//         {isOpen && (
//           <div className={styles.dropdown_menu} style={{ position: "absolute" }}>
//             <div className={styles.channel_my}>
//               <div className={styles.profile_link}>
//                 {profile ? (
//                   <>
//                     <img src={profile.avatar} alt="User Avatar" />
//                     <div className={styles.pd_content}>
//                       <div className={styles.name3}>
//                         <div>
//                           <h6>{profile ? profile.name : "Guest"}</h6>
//                         </div>
//                         <div className={styles.ver2} title="Verify" style={{ marginBottom: "12px" }}>
//                           <i>
//                             <FaCheck />
//                           </i>
//                         </div>
//                       </div>
//                       <span>{profile ? profile.email : "Guest"}</span>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <img src="https://i.pinimg.com/564x/d0/7b/a6/d07ba6dcf05fa86c0a61855bc722cb7a.jpg" alt="Default Avatar" />
//                     <div className={styles.pd_content}>
//                       <div className={styles.name3}>
//                         <div>
//                           <h6>Guest</h6>
//                         </div>
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>
//               {profile ? (
//                 <Link to="/instructor-profile" className={styles.dp_link_12}>
//                   View My Profile
//                 </Link>
//               ) : null}
//             </div>
//             <div className={styles.night_mode_switch__btn}>
//             </div>
//             <Link to="/instructor-dashboard" className={styles.item}>
//               Cursus dashboard
//             </Link>
//             <Link to="/paid-membership" className={styles.item}>
//               Paid Memberships
//             </Link>
//             <Link to="/setting" className={styles.item}>
//               Setting
//             </Link>
//             <Link to="/help" className={styles.item}>
//               Help
//             </Link>
//             <Link to="/send-feedback" className={styles.item}>
//               Send Feedback
//             </Link>
//             {token ? (
//               <a onClick={handleSignOut} className={styles.item}>
//                 Sign Out
//               </a>
//             ) : (
//               <Link to="/login" className={styles.item}>
//                 Login
//               </Link>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
