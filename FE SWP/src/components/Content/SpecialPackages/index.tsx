import { specialPackagesData } from '@data/specialPackagesData';
import styles from './SpecialPackages.module.css';

const SpecialPackages = () => {
    return (
        <div className={styles.container}>
            {specialPackagesData.slice(0, 4).map((packageItem, index) => (
                <div key={index} className={styles.packageItem}>
                    <img src={packageItem.imageUrl} alt={packageItem.title} className={styles.image} />
                    <h3 className={styles.title}>{packageItem.title}</h3>
                    <p className={styles.description}>{packageItem.description}</p>
                    <a href={packageItem.link} className={styles.link}>MORE</a>
                </div>
            ))}
        </div>
    );
}

export default SpecialPackages;
