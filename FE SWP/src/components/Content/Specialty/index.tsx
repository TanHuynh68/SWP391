import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@redux/store/store';
import { fetchSpecialties } from '@redux/Slice/specialtySlice';
import styles from './Specialty.module.css';
import { Link } from 'react-router-dom';

const Specialty: React.FC = () => {
  const dispatch: AppDispatch = useDispatch(); // Đảm bảo rằng dispatch có kiểu AppDispatch
  const specialties = useSelector((state: RootState) => state.specialty.specialties); // Xác định kiểu cho state

  useEffect(() => {
    dispatch(fetchSpecialties());
  }, [dispatch]);

  const SpecialtyCard: React.FC<{ name: string; imageUrl: string }> = ({ name, imageUrl }) => (
    <div className={styles.specialtyCard}>
      <img src={imageUrl} alt={name} className={styles.icon} />
      <p>{name}</p>
    </div>
  );

  return (
    <div className={styles.specialtyContainer}>
      <div className={styles.head}>
        <h2>Phòng Nha uy tín</h2>
        <button className={styles.allPostsButton}>
          Tìm kiếm
        </button>
      </div>
      <div className={styles.carouselContainer}>
        <div className={styles.specialtyList}>
          {specialties.map((specialty, i) => (
            <Link to={`/customer/clinic/${specialty.id}`}>
              <SpecialtyCard key={i} name={specialty.name} imageUrl={specialty.image} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Specialty;
