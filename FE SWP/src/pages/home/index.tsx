
import React from 'react';

import styles from './home.module.css';
import Search from '@/components/Content/Seach';
import SpecialPackages from '@/components/Content/SpecialPackages';
import Layout from '@/components/Layout';
import DentalGuide from '@/components/Content/DentalGuide';
import Services from '@/components/Content/AllServices';
const Home: React.FC = () => {
    return (
        <Layout>
            <div className={styles.pageContainer}>
                <div className={styles.mainContent}>
                    <Search />
                    <SpecialPackages />
                    <DentalGuide/>
                    <Services/>
        
                </div>
            </div>
        </Layout>
    );
}

export default Home;
