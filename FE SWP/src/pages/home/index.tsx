
import React from 'react';
import Footer from "@/components/Layout/Footer";
import Header from "@components/Layout/Header";
import styles from './home.module.css';
import Search from '@/components/Content/Seach';
import SpecialPackages from '@/components/Content/SpecialPackages';
import Layout from '@/components/Layout';
import DentalGuiDe from '@/components/Content/DentalGuide';


const Home: React.FC = () => {
    return (
        <Layout>
                    <div className={styles.pageContainer}>
            {/* <div className={styles.header}>
                <Header />
            </div> */}
            <div className={styles.mainContent}>
                    <Search/>
                    <SpecialPackages/>
                    <DentalGuiDe/>
                    
            </div>
            {/* <div className={styles.footer}>
                <Footer />
            </div> */}
        </div>
        </Layout>
    );
}

export default Home;
