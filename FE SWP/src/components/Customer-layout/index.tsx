
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import { Outlet } from 'react-router-dom';

const CustomerLayout = () => {
    return (
        <nav>
            <ul>
                <Header />
                <Outlet />
                <Footer />
            </ul>
        </nav>
    );
};

export default CustomerLayout;
