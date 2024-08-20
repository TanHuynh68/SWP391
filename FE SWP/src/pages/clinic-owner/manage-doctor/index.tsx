import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Input, Modal, Row, Table, Form, Select, Upload } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClinics, fetchPatients } from "@redux/Slice/manageDoctorSlice";
import { RootState, AppDispatch } from "@redux/store/store";

const ManageDoctor = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClinic, setSelectedClinic] = useState<number | null>(null);
    const [form] = Form.useForm();
    const dispatch: AppDispatch = useDispatch();
    const { clinics, patients, loading, error } = useSelector((state: RootState) => state.manageDoctor);

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    useEffect(() => {
        dispatch(fetchClinics());
    }, [dispatch]);

    useEffect(() => {
        if (selectedClinic !== null) {
            dispatch(fetchPatients(selectedClinic));
        }
    }, [selectedClinic, dispatch]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleClinicChange = (value: number) => {
        setSelectedClinic(value);
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
            render: (status: number) => (
                <>
                    {status === 2 ? "Active" : "Unactive"}
                </>
            ),
        },
    ];

    const dataSource = patients.map((patient, index) => ({
        key: patient.id,
        no: index + 1,
        name: patient.account.fullName,
        gender: patient.account.gender === 0 ? "Nữ" : "Nam",
        description: patient.account.email,
        status: patient.account.status,
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

    const onSearch = (value: string) => console.log(value);

    return (
        <div>
            <Modal footer="" width={900} title="Đăng Ký Bác Sĩ" open={isModalOpen} onCancel={handleCancel}>
                <div className="flex justify-center">
                    <Form
                        form={form}
                        className="w-full"
                        {...formItemLayout}
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
                            name="birthday"
                            rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Giới Tính"
                            name="gender"
                            rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <Select
                                defaultValue="Chọn Giới Tính"
                                style={{ width: 151 }}
                                options={[
                                    { value: 'male', label: 'Nam' },
                                    { value: 'female', label: 'Nữ' },
                                ]}
                            />
                        </Form.Item>
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
                            <Upload name="image" listType="picture-card">
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
            <Row gutter={10} className="my-10 ">
                <Col span={8}>
                    <Input.Search style={{ width: 200 }} placeholder="Nhập từ khóa" onSearch={onSearch} enterButton />
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
                    <Button type="primary" onClick={showModal} className=" float-right">
                        Add new
                    </Button>
                </Col>
            </Row>

            <Table dataSource={dataSource} columns={columns} loading={loading} />
            {error && <p style={{ color: 'red' }}>Lỗi: {error}</p>}
        </div>
    );
}

export default ManageDoctor;
