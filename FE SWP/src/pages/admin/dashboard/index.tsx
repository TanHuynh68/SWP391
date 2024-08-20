
import { Card, Col, Row } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Statistic, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { filterUserbyNameAndRole, getUserActiveAndInactive } from '@/services/user.service';
import { User } from '@/models/user.model';
import { role } from '@/redux/hooks/usRedirect';

const { Title } = Typography;

const data = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

// const onChange: DatePickerProps['onChange'] = (date, dateString) => {
//   console.log(date, dateString);
// };

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [doctors, setDoctors] = useState<User[]>([]);
  const [countUserActive, setCountUserActive] = useState<number>(0);
  const [countDoctor, setCountDoctor] = useState<number>(0);
  useEffect(() => {
    if (users.length > 0) {
      setUsers(users.filter(user => user.status === 2))
      setCountUserActive(users.length);
      setCountDoctor(doctors.length)
    } else {
      getDoctor();
      getAllUserActive();
    }
  }, [users, doctors]);

  const getAllUserActive = async () => {
    const res = await getUserActiveAndInactive();
    //    const userActive = res.filter()
    setUsers(res);
  }

  const getDoctor = async () => {
    const res = await filterUserbyNameAndRole("", role.DOCTOR);
    console.log("getDoctor: ", res)
    setDoctors(res);
  }
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Title level={2} className="mb-6">Dashboard</Title>
      <div className="flex justify-center items-center">
        {/* <Row gutter={10}>
          <Col className='mt-1'>
            <FilterOutlined />
          </Col>
          <Col>
            <DatePicker className="mb-10" onChange={onChange} />
          </Col>
        </Row> */}
      </div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card>
            <Statistic title="Người dùng đang hoạt động" value={countUserActive} />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic title="Số bác sĩ" value={countDoctor} />
          </Card>
        </Col>
        {/* <Col span={8}>
          <Card>
            <Statistic title="Số phòng khám" value={112893} prefix="đ" />
          </Card>
        </Col> */}
      </Row>

      <Card className="mt-8">
        <Title level={4} className="mb-4">Sales Overview</Title>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default AdminDashboard;
