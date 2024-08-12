import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, GetProps, Input, Modal, Row, Table, Form, Select, Upload } from "antd";
import { useState, } from "react";
const ManageDoctor = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm(); // Sử dụng Form.useForm để quản lý trạng thái form
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
            no: '1',
            name: "Trương Mỹ Lan",
            birthday: '10/9/1978',
            gender: "Nữ"
        },
        {
            key: '2',
            no: '1',
            name: "Lê Thị Hồng Gấm",
            birthday: '9/10/1975',
            gender: "Nữ"
        },
    ];

    const columns = [
        {
            title: 'STT',
            dataIndex: 'no',
            key: 'no',
        },
        {
            title: 'Tên Bác Sĩ',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ngày Tháng Năm Sinh',
            dataIndex: 'birthday',
            key: 'birthday',
        },
        {
            title: 'Giới Tính',
            dataIndex: 'gender',
            key: 'gender',
        },
       
    ];
    type SearchProps = GetProps<typeof Input.Search>;
    const { Search } = Input;

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
    // const options: SelectProps['options'] = [{ value: 'dentistry', label: 'Nha khoa' },
    // { value: 'cardiology', label: 'Tim mạch' },
    // { value: 'neurology', label: 'Thần kinh' },
    // { value: 'orthopedics', label: 'Chấn thương chỉnh hình' },];


    // const handleChange = (value: string[]) => {
    //     console.log(`selected ${value}`);
    // };

    const normFile = (e: React.ChangeEvent<HTMLInputElement>): File[] => {
        return e.target.files ? Array.from(e.target.files) : [];
    };

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
    return (
        <div>
            <Modal footer="" width={900} title="Đăng Ký Bác Sĩ" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className="flex justify-center">
                    <Form
                        form={form} // Kết nối form với trạng thái
                        className="w-full"
                        {...formItemLayout}
                        variant="filled"
                        style={{ maxWidth: 800 }}
                    >
                        <Form.Item
                            label="Tên Bác Sĩ"
                            name="name"
                            rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Ngày Tháng Năm Sinh"
                            name="name"
                            rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Giới Tính"
                            name="name"
                            rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <Select
                                defaultValue="Chọn Giới Tính"
                                style={{ width: 151 }}
                                options={[
                                    { value: 'male', label: 'Male' },
                                    { value: 'female', label: 'Female' },
                                ]}
                            />
                        </Form.Item>
                        {/* <Form.Item
                            label="Chuyên Khoa"
                            name="gender"
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
                        </Form.Item> */}
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <Input type="email" style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <Input type="password" style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            label="Nhập lại mật khẩu"
                            name="confirmPassword"
                            rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <Input type="password" style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item label="Ảnh đại diện" valuePropName="fileList" getValueFromEvent={normFile}>
                            <Upload action="/upload.do" listType="picture-card">
                                <button style={{ border: 0, background: 'none' }} type="button">
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Ảnh đại diện</div>
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
                Quản Lý Bác Sĩ
            </h1>
            <Row gutter={10} className="my-10 flex justify-between">
                <Col span={12}>
                    <Search style={{ width: 200 }} placeholder="Nhập từ khóa" onSearch={onSearch} enterButton />
                </Col>
                <Col span={12}>
                    <Button type="primary" onClick={showModal} className=" float-right">
                        Add new
                    </Button>
                </Col>
            </Row>

            <Table dataSource={dataSource} columns={columns} />
        </div>
    )

}

export default ManageDoctor;