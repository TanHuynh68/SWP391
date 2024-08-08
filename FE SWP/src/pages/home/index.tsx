
import React from 'react';
import Footer from "@/components/Layout/Footer";
import Header from "@components/Layout/Header";
import styles from './home.module.css';
import Search from '@/components/Content/Seach';


const Home: React.FC = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.mainContent}>
                    <Search/>

                {/* <div className={styles.section}>
                    <SpecialPackages />
                </div>
                <div className={styles.section}>
                    <DentalGuide />
                </div>
                <div className={styles.section}>
                    <FeaturedSpecialties />
                </div>
                <div className={styles.section}>
                    <PrestigiousDentalClinics />
                </div>
                <div className={styles.section}>
                    <FeaturedDentists />
                </div> */}
            </div>
            <div className={styles.footer}>
                <Footer />
            </div>
        </div>
    );
}

export default Home;
