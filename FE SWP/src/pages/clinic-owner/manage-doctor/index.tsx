import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Input, Modal, Row, Table, Form, Select, Upload, message } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClinics, fetchDoctors, addDoctor } from "@redux/Slice/manageDoctorSlice";  
import { RootState, AppDispatch } from "@redux/Store/store";

const ManageDoctor = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClinic, setSelectedClinic] = useState<number | null>(null);
    const [form] = Form.useForm();

    const tokenWithBearer = localStorage.getItem('token');
    const token = tokenWithBearer?.replace('Bearer ', '');
    const user = localStorage.getItem('user');
    const userData = user ? JSON.parse(user) : null;
    const ownerId = userData?.Id;

    const dispatch: AppDispatch = useDispatch();
    const { clinics, doctors, loading, error } = useSelector((state: RootState) => state.manageDoctor);

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    useEffect(() => {
        if (token && ownerId) {
            dispatch(fetchClinics({ ownerId, token }));
        }
    }, [dispatch, ownerId, token]);

    useEffect(() => {
        if (selectedClinic !== null && token) {
            dispatch(fetchDoctors({ clinicId: selectedClinic, token }));
        }
    }, [selectedClinic, dispatch, token]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleClinicChange = (value: number) => {
        setSelectedClinic(value);
    };

    const handleAddDoctor = async (values: any) => {
        try {
            const doctorData = { 
                email: values.email,
                password: values.password,
                fullName: values.fullName,
                description: values.description,
                gender: values.gender
            };
            const clinicId = values.clinicId; // Extract the clinicId from the form values
    
            // Call the API with the clinicId as a query parameter
            await dispatch(addDoctor({ token, ...doctorData, clinicId })).unwrap();
            
            message.success("Đăng ký bác sĩ thành công!");
            setIsModalOpen(false);
            form.resetFields();
            window.location.reload();
        } catch (err) {
            message.error("Có lỗi xảy ra khi đăng ký bác sĩ, vui lòng thử lại!");
        }
    };
    
    // Only keep one declaration of handleAssignClinic
    const handleAssignClinic = (doctorId: number) => {
        console.log(`Assigning clinic to doctor with ID: ${doctorId}`);
        // Logic to assign clinic goes here
    };

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
            title: 'Giới Tính',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: number) => {
                switch (status) {
                    case 1:
                        return "Chờ Duyệt";
                    case 2:
                        return "Đang Hoạt Động";
                    case 3:
                        return "Không Hoạt Động";

                }
            },
        },
        {
            title: 'Thêm Phòng Khám',
            key: 'action',
            render: (_, record) => (
                record.clinicsId ?
                    <span>Đã có phòng khám</span> :
                    <Button type="primary" onClick={() => handleAssignClinic(record.key)}>
                        Thêm Phòng Khám
                    </Button>
            )
        }
    ];

    const dataSource = Array.isArray(doctors) ? doctors.map((doctors, index) => ({
        key: doctors.id,
        no: index + 1,
        name: doctors.account.fullName,
        gender: doctors.account.gender === 0 ? "Nữ" : "Nam",
        description: doctors.account.email,
        status: doctors.account.status,
        clinicsId: doctors.clinicsId,  
    })) : [];

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

    const onSearch = (value: string) => console.log(value);

    return (
        <div>
            <Modal
                footer={null}
                width={900}
                title="Đăng Ký Bác Sĩ"
                open={isModalOpen}
                onCancel={handleCancel}
            >
                <div className="flex justify-center">
                    <Form
                        form={form}
                        className="w-full"
                        {...formItemLayout}
                        style={{ maxWidth: 800 }}
                        onFinish={handleAddDoctor}
                    >
                        <Form.Item
                            label="Tên Bác Sĩ"
                            name="fullName"
                            rules={[{ required: true, message: 'Vui lòng nhập tên bác sĩ!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Chọn Phòng Khám"
                            name="clinicId"
                            rules={[{ required: true, message: 'Vui lòng chọn phòng khám!' }]}
                        >
                            <Select
                                style={{ width: '100%' }}
                                placeholder="Chọn Phòng Khám"
                                options={clinics.map(clinic => ({
                                    value: clinic.id,
                                    label: clinic.name
                                }))}
                                onChange={handleClinicChange}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Giới Tính"
                            name="gender"
                            rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
                        >
                            <Select
                                placeholder="Chọn Giới Tính"
                                style={{ width: 151 }}
                                options={[
                                    { value: 1, label: 'Nam' },
                                    { value: 2, label: 'Nữ' },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Vui lòng nhập email!' },
                                { type: 'email', message: 'Email không hợp lệ!' }
                            ]}
                        >
                            <Input style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
                            ]}
                        >
                            <Input.Password style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            label="Nhập lại mật khẩu"
                            name="confirmPassword"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Mật khẩu không khớp!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            label="Mô tả"
                            name="description"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Ảnh đại diện"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                        >
                            <Upload name="image" listType="picture-card">
                                <button
                                    style={{ border: 0, background: 'none' }}
                                    type="button"
                                >
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

            <h1 className="font-bold text-2xl text-center">Quản Lý Bác Sĩ</h1>
            <Row gutter={10} className="my-10">
                <Col span={8}>
                    <Input.Search
                        style={{ width: 200 }}
                        placeholder="Nhập từ khóa"
                        onSearch={onSearch}
                        enterButton
                    />
                </Col>
                <Col span={8}>
                    <Select
                        className="w-full"
                        placeholder="Chọn Phòng Khám"
                        onChange={handleClinicChange}
                        options={clinics.map(clinic => ({
                            value: clinic.id,
                            label: clinic.name
                        }))}
                    />
                </Col>
                <Col span={8}>
                    <Button type="primary" onClick={showModal} className="float-right">
                        Add new
                    </Button>
                </Col>
            </Row>

            <Table dataSource={dataSource} columns={columns} loading={loading} />
            {error && <p style={{ color: 'red' }}>Lỗi: {error}</p>}
        </div>
    );
};

export default ManageDoctor;