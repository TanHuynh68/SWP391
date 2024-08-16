import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Input, Modal, Row, Table, Form, Select, Upload } from "antd";
import { useState } from "react";

interface ClinicData {
    key: string;
    no: string;
    name: string;
    address: string;
}

const RegisterClinic = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm(); 

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const dataSource: ClinicData[] = [
        {
            key: '1',
            no: '1',
            name: "Phòng Khám Bình An",
            address: '10 Downing Street',
        },
        {
            key: '2',
            no: '1',
            name: "Phòng Khám An Hòa",
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'STT',
            dataIndex: 'no',
            key: 'no',
        },
        {
            title: 'Tên Phòng Khám',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Địa Chỉ',
            dataIndex: 'address',
            key: 'address',
        },
    ];

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

    const options = [
        { value: 'dentistry', label: 'Nha khoa' },
        { value: 'cardiology', label: 'Tim mạch' },
        { value: 'neurology', label: 'Thần kinh' },
        { value: 'orthopedics', label: 'Chấn thương chỉnh hình' },
    ];

    const normFile = (e: React.ChangeEvent<HTMLInputElement>): File[] => {
        return e.target.files ? Array.from(e.target.files) : [];
    };

    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
    };

    const onSearch = (value: string) => console.log(value);

    return (
        <div>
            <Modal width={750} footer="" title="Đăng Ký Phòng Khám" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className="flex justify-center">
                    <Form
                        form={form}
                        className="w-full"
                        {...formItemLayout}
                        style={{ maxWidth: 650 }}
                    >
                        <Form.Item
                            label="Tên Phòng Khám"
                            name="name"
                            rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Mô Tả"
                            name="description"
                            rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Địa Chỉ"
                            name="address"
                            rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Chuyên Khoa"
                            name="specialty"
                            rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="Chọn Chuyên Khoa"
                                onChange={handleChange}
                                options={options}
                            />
                        </Form.Item>
                        <Form.Item label="Hình ảnh" valuePropName="fileList" getValueFromEvent={normFile}>
                            <Upload action="/upload.do" listType="picture-card">
                                <button style={{ border: 0, background: 'none' }} type="button">
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Hình ảnh của phòng khám</div>
                                </button>
                            </Upload>
                        </Form.Item>
                        <Form.Item className="flex justify-center" wrapperCol={{ offset: 6, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
            <h1 className="font-bold text-2xl text-center">
               Quản Lý Phòng Khám
            </h1>
            <Row gutter={10} className="my-10 flex justify-between">
                <Col span={12}>
                    <Input.Search style={{ width: 200 }} placeholder="Nhập từ khóa" onSearch={onSearch} enterButton />
                </Col>
                <Col span={12}>
                    <Button type="primary" onClick={showModal} className=" float-right">
                        Đăng ký phòng khám
                    </Button>
                </Col>
            </Row>

            <Table dataSource={dataSource} columns={columns} />
        </div>
    );
};

export default RegisterClinic;
