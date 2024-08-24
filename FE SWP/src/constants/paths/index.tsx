const Paths = {
   /* GUEST PATHS */
   HOME: "/",
   LOGIN: "/login",
   ABOUT: "/about",
   REGISTER: "/sign-up",
   CLINIC_PAGE: "/clinic",
   CLINIC_DETAIL: "/clinic/:id",

   // CUSTOMER
   BOOKING_HISTORY: "booking-history",
   CUSTOMER_CLINIC_DETAIL: "clinic/:id",
   DENTAL_DETAILS: "dental-details",
   DENTAL_HANDBOOK: "dental-handbook",
   SPECIAL_PACKAGE: "specialty",

   // CLINIC_OWNER
   REGISTER_CLINIC: "register-clinic",
   MANAGE_DOCTOR: "manage-doctor",
   MANAGE_PATIENT: "manage-patient",
   CUSTOMER_CLINIC_PAGE: "clinic",
   MANAGE_MEDICAL_EXAMINATION_SCHEDULE: "manage-medical-examination-schedule",
   MANAGE_APPOINTMENT_SCHEDULE: "manage-appointment-schedule",
   /* DENTIST PATHS */
   DENTIST_DASHBOARD: "dashboard",
   DENTIST_CHAT_WINDOW: "chat-window",
   BOOKING_PAGE: "booking-page/:clinic_id",

   //DOCTOR PATHS
   DOCTOR_MANAGE_BOOKING: "manage-booking",
   DOCTOR_SCHEDULE_OF_WEEK: "schedule-of-week",
   /* ADMIN PATHS */
   ADMIN_LOGIN: "login",
   ADMIN_DASHBOARD: "dashboard",
   ADMIN_HOME: "/admin/dashboard",
   ADMIN_MANAGE_USER: "manage-user",
   ADMIN_MANAGE_CLINIC: "manage-clinic",
   ADMIN_MANAGE_CLINIC_OWNER: "manage-clinic-owner",
}

export default Paths;
