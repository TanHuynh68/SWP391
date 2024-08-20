import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Input, Modal, Row, Table, Form, Select, Upload, message } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerClinic, fetchAllClinics } from "@redux/Slice/registerClinicSlice";
import { RootState, AppDispatch } from "@redux/store/store";
import { fetchSevicesAllServices } from '@redux/Slice/servicesRegisterClinicSlice';

const RegisterClinic = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const dispatch: AppDispatch = useDispatch();
    const { clinics, loading, error } = useSelector((state: RootState) => state.registerClinic);
    const { services } = useSelector((state: RootState) => state.servicesRegisterClinic);
   
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(fetchAllClinics());
            dispatch(fetchSevicesAllServices());
        }
    }, [dispatch]);
    
    

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };



    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const user = localStorage.getItem('user');
            const userData = user ? JSON.parse(user) : null;
            const ownerId = userData?.Id;
            const clinicData = {
                clinicName: values.name,
                description: values.description,
                address: values.address,
                serviceIdList: values.specialty.map(Number),
                image: "", 
                ownerId: ownerId, 
            };
    
            console.log("Clinic Data:", clinicData); 
            dispatch(registerClinic(clinicData))
                .unwrap()
                .then(() => {
                    message.success("Phòng khám đã được đăng ký thành công!");
                    setIsModalOpen(false);
                    form.resetFields();
                    dispatch(fetchAllClinics());
                })
                .catch((err) => {
                    message.error(`Đăng ký phòng khám thất bại: ${JSON.stringify(err)}`);
                });
        } catch (err) {
            console.error("Error:", err);
            message.error("Có lỗi xảy ra khi nộp form.");
        }
    };

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
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: number) => (
                <>
                    {status === 2 ? "Active" : "Unactive"}
                </>
            ),
        },
    ];

    const dataSource = clinics.map((clinic, index) => ({
        key: clinic.id,
        no: index + 1,
        name: clinic.name,
        address: clinic.address,
        status: clinic.status,
    }));

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

    const options = services.map(service => ({
        value: service.id,
        label: service.name
    }));

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
    };

    const onSearch = (value: string) => console.log(value);

    return (
        <div>
            <Modal width={750} footer="" title="Đăng Ký Phòng Khám" open={isModalOpen} onCancel={handleCancel}>
                <div className="flex justify-center">
                    <Form
                        form={form}
                        className="w-full"
                        {...formItemLayout}
                        style={{ maxWidth: 650 }}
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            label="Tên Phòng Khám"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên phòng khám!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Mô Tả"
                            name="description"
                            rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Địa Chỉ"
                            name="address"
                            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Chuyên Khoa"
                            name="specialty"
                            rules={[{ required: true, message: 'Vui lòng chọn chuyên khoa!' }]}
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
                        <Form.Item label="Hình ảnh" name="image" valuePropName="fileList" getValueFromEvent={normFile}>
                            <Upload name="image" listType="picture-card">
                                <button style={{ border: 0, background: 'none' }} type="button">
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Hình ảnh của phòng khám</div>
                                </button>
                            </Upload>
                        </Form.Item>
                        <Form.Item className="flex justify-center" wrapperCol={{ offset: 6, span: 16 }}>
                            <Button type="primary" htmlType="submit" loading={loading}>
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

            <Table dataSource={dataSource} columns={columns} loading={loading} />
            {error && <p style={{ color: 'red' }}>Lỗi: {error}</p>}
        </div>
    );
};

export default RegisterClinic;
