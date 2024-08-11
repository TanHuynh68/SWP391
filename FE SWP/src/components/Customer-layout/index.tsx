

import { Outlet } from 'react-router-dom';
import Layout from '@/components/Layout';
const CustomerLayout = () => {
    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};

export default CustomerLayout;
