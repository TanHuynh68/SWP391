import React from 'react';
import Footer from "@/components/Layout/Footer";
import Header from "@components/Layout/Header";
import styles from './home.module.css';
import Login from '../Login';

const Home: React.FC = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
               <Header/>
            </div>

        <div className={styles.mainComtent}> 
        <Login/>
        </div>
                
 
            <div className={styles.footer}>
               <Footer/>
            </div>
        </div>
    );
}

export default Home;
