import React from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import styles from './Services.module.css';
import img1 from "@assets/fetch-data/services/image1.png";
import img2 from "@assets/fetch-data/services/image2.png";
import img3 from "@assets/fetch-data/services/image3.png";
import img4 from "@assets/fetch-data/services/image4.png";
import img5 from "@assets/fetch-data/services/image5.png";
import img6 from "@assets/fetch-data/services/image6.png";
import img8 from "@assets/fetch-data/services/image8.png";
import { useNavigate } from 'react-router-dom';

const Services: React.FC = () => {
  const navigate = useNavigate();
  const services = [
    { title: 'Nha khoa', icon: img1 },
    { title: 'Niềng răng', icon: img2 },
    { title: 'Bọc răng sứ', icon: img3 },
    { title: 'Trồng răng implant', icon: img4 },
    { title: 'Nhổ răng khôn', icon: img5 },
    { title: 'Nha khoa tổng quát', icon: img6 },
    { title: 'Nha Khoa trẻ em', icon: img8 },
  ];

  const [index, setIndex] = React.useState(0);
  const [props, set] = useSpring(() => ({
    x: 0,
  }));

  const bind = useDrag(({ direction: [xDir], distance, cancel }) => {
    if (distance > window.innerWidth / 4) cancel();

    if (xDir < 0 && index < services.length - 4) {
      setIndex(index + 1);
    } else if (xDir > 0 && index > 0) {
      setIndex(index - 1);
    }

    set({
      x: -index * (window.innerWidth / 4),
    });
  });

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
        <animated.div {...bind()} className={styles.servicesList} style={{ x: props.x }}>
          {services.map((service, i) => (
            <ServiceCard key={i} title={service.title} icon={service.icon} />
          ))}
        </animated.div> 
      </div> 
    </div> 
  );
};

export default Services;





// import React, { useEffect } from 'react';
// import { useSpring, animated } from 'react-spring';
// import { useDrag } from 'react-use-gesture';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState, AppDispatch } from '@redux/store/Store';
// import { fetchServices } from '@redux/Slice/servicesSlice';
// import styles from './Services.module.css';
// import { useNavigate } from 'react-router-dom';

// const Services: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();
//   const { services, status, error } = useSelector((state: RootState) => state.services);

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchServices());
//     }
//   }, [status, dispatch]);

//   const [index, setIndex] = React.useState(0);
//   const [props, set] = useSpring(() => ({
//     x: 0,
//   }));

//   const bind = useDrag(({ direction: [xDir], distance, cancel }) => {
//     if (distance > window.innerWidth / 4) cancel();

//     if (xDir < 0 && index < services.length - 4) {
//       setIndex(index + 1);
//     } else if (xDir > 0 && index > 0) {
//       setIndex(index - 1);
//     }

//     set({
//       x: -index * (window.innerWidth / 4),
//     });
//   });

//   const handleAllPostsClick = () => {
//     navigate('/specialty');
//   };

//   const ServiceCard: React.FC<{ name: string; status: number; id: number }> = ({ name }) => (
//     <div className={styles.serviceCard}>
//       <p>{name}</p>
//     </div>
//   );

//   return (
//     <div className={styles.servicesContainer}>
//       <div className={styles.head}>
//         <h2>Chuyên khoa nổi bật</h2>
//         <button onClick={handleAllPostsClick} className={styles.allPostsButton}>
//           Xem thêm
//         </button>
//       </div>
//       <div className={styles.carouselContainer}>
//         {status === 'loading' && <p>Loading...</p>}
//         {status === 'succeeded' && (
//           <animated.div {...bind()} className={styles.servicesList} style={{ x: props.x }}>
//             {services.map((service) => (
//               <ServiceCard key={service.id} name={service.name} status={service.status} id={service.id} />
//             ))}
//           </animated.div>
//         )}
//         {status === 'failed' && <p>{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default Services;
