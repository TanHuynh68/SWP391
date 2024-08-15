const Paths = {
   /* GUEST PATHS */
   HOME: "/",
   LOGIN: "/login",
   ABOUT: "/about",
   REGISTER: "/sign-up",
   DENTAL_HANDBOOK: "/dental-handbook",
   SPECIAL_PACKAGE:"/specialty",

   // CLINIC_OWNER
   REGISTER_CLINIC:"register-clinic",
   MANAGE_DOCTOR:"manage-doctor",
   MANAGE_PATIENT:"manage-patient",
   MANAGE_MEDICAL_EXAMINATION_SCHEDULE:"manage-medical-examination-schedule",

   /* DENTIST PATHS */
   DENTIST_DASHBOARD: "dashboard",
   DENTIST_CHAT_WINDOW: "chat-window",
   BOOKING_PAGE: "booking-page/:clinic_id",

   /* ADMIN PATHS */
   ADMIN_LOGIN: "login",
   ADMIN_DASHBOARD: "dashboard",
   ADMIN_HOME: "/admin/dashboard",
   ADMIN_MANAGE_USER: "manage-user",
   ADMIN_MANAGE_CLINIC: "manage-clinic",
   ADMIN_MANAGE_CLINIC_OWNER: "manage-clinic-owner",
}

export default Paths;
