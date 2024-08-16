import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '@redux/Slice/doctorSlice';
import { RootState, AppDispatch } from '@redux/store/Store';
import styles from './Doctor.module.css';

const Doctor: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const doctors = useSelector((state: RootState) => state.doctor.doctors);

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const DoctorCard: React.FC<{ name: string; imageUrl: string }> = ({ name, imageUrl }) => (
    <div className={styles.doctorCard}>
      <img src={imageUrl} alt={name} className={styles.icon} />
      <p>{`Bác sĩ ${name}`}</p>
    </div>
  );

  return (
    <div className={styles.doctorContainer}>
      <div className={styles.head}>
        <h2>Nha sĩ nổi bật</h2>
        <button className={styles.allPostsButton}>
        {/* onClick={() => navigate('/doctors')} */}
          Tìm kiếm
        </button>
      </div>
      <div className={styles.carouselContainer}>
        <div className={styles.doctorList}>
          {doctors.map((doctor, i) => (
            <DoctorCard key={i} name={doctor.account.fullName} imageUrl={doctor.image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctor;
