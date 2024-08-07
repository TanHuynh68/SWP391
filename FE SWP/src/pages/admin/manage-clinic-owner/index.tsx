import { Button, Col, DatePicker, GetProps, Modal, Row, Table } from "antd";
import Input from "antd/es/input";
import { useState } from "react";
import {
    Cascader,
    Form,
    InputNumber,
    Mentions,
    Select,
    TreeSelect,
} from 'antd';

const ManageClinicOwner = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Gender',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Birth Day',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Phone Number',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Email',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Action',
            render: () => (
                <>
                    <Row>
                        <Col span={12}>
                            <Button className="bg-blue-500">
                                Accept
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button className="bg-red-500">
                                Reject
                            </Button>
                        </Col>
                    </Row>

                </>
            )
        },
    ];
    type SearchProps = GetProps<typeof Input.Search>;
    const { Search } = Input;

    const { RangePicker } = DatePicker;

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
        },
    };

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
    return (
        <div>
            <Modal
            footer={""}
            width={800}
            title="Add New Clinic Owner" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className=" flex justify-center">
                <Form className="w-full" {...formItemLayout} variant="filled" style={{ maxWidth: 600 }}>
                    <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Gender"
                        name="DatePicker"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Select                    
                        defaultValue="Please Choose Gender"
                        style={{ width: 151 }}
                        options={[
                            { value: 'male', label: 'Male' },
                            { value: 'female', label: 'Female' },
                        ]}
                    />
                    </Form.Item>
                    
                    <Form.Item
                        label="Birth Day"
                        name="DatePicker"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                        name="InputNumber"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input type="number" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input type="email" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input type="password" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input type="password" style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item className="flex justify-center" wrapperCol={{ offset: 6, span: 16 }}>
                        <Button  type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                </div>
            </Modal>
            <h1 className="font-bold text-2xl text-center">
                Manage Clinic Owner
            </h1>
            <Row gutter={10} className="my-10 flex justify-between">
                <Col span={12}>
                    <Search style={{ width: 200 }} placeholder="input search text" onSearch={onSearch} enterButton />
                </Col>
                <Col span={12}>
                    <Button onClick={showModal} type="primary" className=" float-right">
                        Add new
                    </Button>
                </Col>
            </Row>

            <Table dataSource={dataSource} columns={columns} />
        </div>
    )
}
export default ManageClinicOwner;