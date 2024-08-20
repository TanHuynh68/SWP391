import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '@redux/Slice/servicesSlice';
import { RootState, AppDispatch } from '@redux/store/store';
import { useNavigate } from 'react-router-dom'; 
import { animated } from 'react-spring'; 
import styles from './Services.module.css';

const Services: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate(); 
  const services = useSelector((state: RootState) => state.services.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleAllPostsClick = () => {
    navigate('/specialty');  
  };

  const ServiceCard: React.FC<{ title: string; icon: string }> = ({ title, icon }) => (
    <div className={styles.serviceCard}>
      <img src={icon} alt={title} className={styles.icon} />
      <p>{title}</p>
    </div>
  );

  return (
    <div className={styles.servicesContainer}>
      <div className={styles.head}>
        <h2>Chuyên khoa nổi bật</h2>
        <button onClick={handleAllPostsClick} className={styles.allPostsButton}>
          Xem thêm
        </button>
      </div>
      <div className={styles.carouselContainer}>
        <animated.div className={styles.servicesList}>
          {services.map((service, i) => (
            <ServiceCard key={i} title={service.name} icon={service.icon} />
          ))}
        </animated.div> 
      </div> 
    </div> 
  );
};

export default Services;
