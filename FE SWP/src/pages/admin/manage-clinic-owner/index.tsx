// @ts-nocheck
import { Button, Col, GetProps, Modal, Row, Table, Tag } from "antd";
import Input from "antd/es/input";
import { useEffect, useState } from "react";
import { Form, Select } from 'antd';
import { ClinicOwner } from "@/models/clinicOwner.model";
import { addClinicOwner, getAllClinicOwner, searchUser } from "@/services/admin.service";
import { statusColor, statusName } from "@/constants/consts";
import { format } from "date-fns";

const ManageClinicOwner = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm(); // Sử dụng Form.useForm để quản lý trạng thái form
    const [clinicOwners, setClinicOwner] = useState<ClinicOwner[]>([])

    useEffect(() => {
        getAllClinicOwnerFromAdmin();
    }, [])

    const getAllClinicOwnerFromAdmin = async () => {
        const res = await getAllClinicOwner("", "CLINICOWNER");
        if (res) {
            const sortedBookings = res.sort((a, b) => {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });
            console.log("getAllClinicOwnerFromAdmin: ", res)
            setClinicOwner(sortedBookings);
        }
    }
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    
    const columns = [
        {
            title: 'Tên chủ phòng khám',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            render: (gender: number) => (
                <Tag color={gender === 1 ? "orange" : "pink"}>
                    {gender === 1 ? "Nam" : "Nữ"}
                </Tag>
            )
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: number) => (
                <>
                    <Tag color={statusColor(status)}>
                        {statusName(status)}
                    </Tag>
                </>
            )
        },
        {
            title: 'Create At',
            render: (record: ClinicOwner) => (
                <>
                     {format(new Date(record?.createdAt), "dd/MM/yyyy")}
                </>
            ),
        },
        ([
            {
                title: 'Hành động',
                render: (record: ClinicOwner) => (
                    record.status === 1 && <>
                        <Row>
                            <Col span={12}>
                                <Button className="bg-blue-500">
                                    Accept
                                </Button>
                            </Col>
                            <Col span={12}>
                                <Button className="bg-red-500">
                                    Delete
                                </Button>
                            </Col>
                        </Row>
                    </>
                ),
                key: 'action',
            },
        ])

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

    const onSearch: SearchProps['onSearch'] = async (value) => {
        const res = await searchUser(value, "CLINICOWNER");
        setClinicOwner(res);
    };
    const onFinish = async (value: ClinicOwner) => {
        console.log("value: ", value)
        const res = await addClinicOwner(value.fullName, value.gender, value.email, value.password);
        console.log("onFinish: ", res)
        setIsModalOpen(false);
        getAllClinicOwnerFromAdmin();
    }
    return (
        <div>
            <Modal
                footer={null}
                width={800}
                title="Add New Clinic Owner"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className="flex justify-center">
                    <Form
                        form={form} // Kết nối form với trạng thái
                        className="w-full"
                        {...formItemLayout}
                        variant="filled"
                        style={{ maxWidth: 600 }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Tên chủ phòng khám"
                            name="fullName"
                            rules={[{ required: true, message: 'Hãy nhập tên chủ phòng khám!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Giới tính"
                            name="gender"
                            rules={[{ required: true, message: 'Hãy chọn giới tính!' }]}
                        >
                            <Select
                                defaultValue="Hãy chọn giới tính"
                                style={{ width: 151 }}
                                options={[
                                    { value: '1', label: 'Nam' },
                                    { value: '2', label: 'Nữ' },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Hãy nhập địa chỉ email!' }]}
                        >
                            <Input type="email" style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Hãy nhập mật khẩu!' }]}
                        >
                            <Input type="password" style={{ width: '100%' }} />
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
                Quản lý chủ phòng khám
            </h1>
        
            <Row gutter={10} className="my-10 flex justify-between">
                <Col span={12}>
                    <Search style={{ width: 300 }} placeholder="Nhập tên chủ phòng khám" onSearch={onSearch} enterButton />
                </Col>
                <Col span={12}>
                    <Button onClick={showModal} type="primary" className="float-right">
                        Add new
                    </Button>
                </Col>
            </Row>
            <Table dataSource={clinicOwners} columns={columns} />
        </div>
    );
}

export default ManageClinicOwner;
