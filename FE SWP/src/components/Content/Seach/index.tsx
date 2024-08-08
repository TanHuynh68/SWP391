import React, { useState, useEffect, useRef } from 'react';
import styles from './Seach.module.css';
// import searchIcon from './search-icon.png'; 

const Search: React.FC = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const searchBoxRef = useRef<HTMLDivElement>(null);

    const handleSearchClick = () => {
        setIsDropdownVisible(true);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
            setIsDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.searchContainer}>
            <div className={styles.background}>
                <div className={styles.searchContent}>
                    <h1 className={styles.title}>CHUYÊN TRANG NHA KHOA</h1>
                    <div ref={searchBoxRef} className={styles.searchBox} onClick={handleSearchClick}>
                        {/* <img src={searchIcon} alt="Search Icon" className={styles.searchIcon} /> */}
                        <input type="text" placeholder="Tìm kiếm Nha sĩ" className={styles.searchInput} />
                    </div>
                    {isDropdownVisible && (
                        <div className={styles.dropdown}>
                            <h2 className={styles.dropdownTitle}>Chuyên khoa</h2>
                            <ul className={styles.dropdownList}>
                                <li className={styles.dropdownItem}>Nha khoa</li>
                                <li className={styles.dropdownItem}>Bác sĩ tư vấn F0</li>
                                <li className={styles.dropdownItem}>Niềng răng</li>
                                <li className={styles.dropdownItem}>Bọc răng sứ</li>
                                <li className={styles.dropdownItem}>Trồng răng implant</li>
                                <li className={styles.dropdownItem}>Nhổ răng khôn</li>
                                <li className={styles.dropdownItem}>Nha khoa tổng quát</li>
                                <li className={styles.dropdownItem}>Nha khoa trẻ em</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
