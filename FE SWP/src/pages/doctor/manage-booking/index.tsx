import { bookingStatus, colorBookingStatus, getUserDataFromLocalStorage } from "@/constants/consts";
import { Booking, Customer, Medicine } from "@/models/booking.model";
import { User } from "@/models/user.model";
import { cancelBooking, editResult, getAllBooking } from "@/services/doctor.service";
import { Button, Form, Image, Input, Modal, Table, Tag } from "antd";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

export interface MedicineFormValues {
    result: string;
    medicines: {
        name: string;
        quatity: number;
        detail: string;
    }[];
}

const ManageBooking = () => {
    const [isModalEditMedicinesOpen, setIsModalEditMedicinesOpen] = useState(false);
    const [isModalCustomerOpen, setIsModalCustomerOpen] = useState(false);
    const [isModalMedicinesOpen, setIsModalMedicinesOpen] = useState(false);
    const [customerInfo, setCustomerInfo] = useState<Customer>();
    const [medicines, setMedicines] = useState<Medicine[]>([])
    const [result, setResult] = useState<string>('')
    const [bookings, setBookings] = useState<Booking[]>([])
    const [bookingId, setBookingId] = useState<number>(0)
    const showModalMedicines = (medicines: Medicine[], result: string) => {
        setMedicines(medicines);
        setResult(result);
        setIsModalMedicinesOpen(true)
    };

    const handleOk = () => {
        setIsModalMedicinesOpen(false)
        setIsModalCustomerOpen(false);
        setIsModalEditMedicinesOpen(false)
    };

    const handleCancel = () => {
        setIsModalMedicinesOpen(false)
        setIsModalCustomerOpen(false);
        setIsModalEditMedicinesOpen(false)
    };

    const showModalEditMedicines = (id: number) => {
        setBookingId(id);
        setIsModalEditMedicinesOpen(true)
    };

    const showModalCustomer = (customer: Customer) => {
        setCustomerInfo(customer)
        setIsModalCustomerOpen(true);
    };

    const userData: User = getUserDataFromLocalStorage();
    const doctorId = userData.Id;

    useEffect(() => {
        getAllBookingByDoctor();
    }, [])

    const getAllBookingByDoctor = async () => {
        const res = await getAllBooking(doctorId);
        if (res) {
            console.log("getAllBookingByDoctor: ", res);

            // Sắp xếp các booking theo thời gian mới nhất
            const sortedBookings = res.sort((a, b) => {
                return new Date(b.createAt).getTime() - new Date(a.createAt).getTime();
            });
            setBookings(sortedBookings);
        }
    };


    const columnsMedicine = [
        {
            title: 'Tên thuốc',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quatity',
            key: 'quatity',
        },
        {
            title: 'Chi tiết',
            dataIndex: 'detail',
            key: 'detail',
        },
    ];

    const handleCancelBooking = async (id: number) => {
        const res = await cancelBooking(id);
        if (res) {
            console.log("res: ", res);
            getAllBookingByDoctor();
        }
    }
    const columns = [
        {
            title: 'Tên bệnh nhân',
            render: (record: Booking) => (
                <div onClick={() => showModalCustomer(record.customer)} className="cursor-pointer text-blue-500">
                    {record.customer.account.fullName}
                </div>
            )
        },
        {
            title: 'Trạng thái',
            render: (record: Booking) => (
                <Tag color={colorBookingStatus(record.status)}>
                    {bookingStatus(record.status)}
                </Tag>
            )
        },
        {
            title: 'Chuyên khoa',
            render: (record: Booking) => (
                <>
                    {record.clinicsService.services.name}
                </>
            )
        },
        {
            title: 'Ngày đặt lịch',
            render: (record: Booking) => (
                <>
                    {format(new Date(record.bookingDate), "dd/MM/yyyy")}
                </>
            )
        },
        {
            title: 'Slot Time',
            render: (record: Booking) => (
                <>
                    {record.slot.slotTime}
                </>
            )
        },
        {
            title: 'Đơn thuốc',
            render: (record: Booking) => (
                record.status === 2 ? <div >
                    <div onClick={() => showModalMedicines(record.medicines, record.result)} className="text-blue-500 cursor-pointer">Xem đơn thuốc</div>
                </div>
                    : <>
                        {
                            record.medicines.length > 0 ?
                                <>
                                    <div onClick={() => showModalMedicines(record.medicines, record.result)} className="text-blue-500 cursor-pointer">Xem đơn thuốc</div>
                                </>
                                :
                                <div className="flex justify-between">
                                    Không có đơn thuốc
                                    {record.status === 1 && <Button onClick={() => showModalEditMedicines(record.id)} type="primary" >Kê đơn</Button>}
                                </div>
                        }
                    </>
            )
        },
        {
            title: 'Action',
            render: (record: Booking) => (
                record.status === 1 && <>
                    <Button onClick={() => handleCancelBooking(record.id)} className="bg-red-500 m-2">
                        Cancel
                    </Button>
                </>
            )
        },
    ];

    const handleFinish = async (values: MedicineFormValues) => {
        console.log("values array: ", values);
        const res = await editResult(bookingId, values, values.result)
        if (res) {
            console.log("res: ", res);

        }
        handleOk();
        getAllBookingByDoctor();
    };

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

    return (
        <>

            <Modal title="Kê đơn" footer="" open={isModalEditMedicinesOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <Form  {...formItemLayout} style={{ maxWidth: 600 }} onFinish={handleFinish}>
                        <Form.Item
                            label="Kết luận khám"
                            name="result"
                            rules={[{ required: true, message: 'Please input!' }]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.List name="medicines">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map((field) => (
                                        <div key={field.key}>
                                            <Form.Item
                                                {...field}
                                                label="Tên thuốc"
                                                name={[field.name, 'name']}
                                                rules={[{ required: true, message: 'Please input the name of the medicine!' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                {...field}
                                                label="Số lượng"
                                                name={[field.name, 'quatity']}
                                                rules={[{ required: true, message: 'Please input the quantity!' }]}
                                            >
                                                <Input type="number" />
                                            </Form.Item>
                                            <Form.Item
                                                {...field}
                                                label="Chi tiết"
                                                name={[field.name, 'detail']}
                                                rules={[{ required: true, message: 'Please input the details!' }]}
                                            >
                                                <Input.TextArea />
                                            </Form.Item>
                                            <Button type="dashed" onClick={() => remove(field.name)}>
                                                Xóa thuốc
                                            </Button>
                                        </div>
                                    ))}
                                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                                        <Button onClick={() => add()} type="dashed">
                                            <PlusOutlined /> Thêm thuốc
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
            <Modal footer="" title="Thông tin bệnh nhân" open={isModalCustomerOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <p>Tên bệnh nhân: <span className="font-bold">{customerInfo?.account?.fullName}</span></p>
                    <p>Địa chỉ email: <span className="font-bold">{customerInfo?.account?.email}</span></p>
                    <p>Giới tính: <span className="font-bold">{customerInfo?.account?.gender}</span></p>
                    <p>Địa chỉ: <span className="font-bold">{customerInfo?.address}</span></p>
                    <p>Ngày sinh: <span className="font-bold">{customerInfo?.doB ? format(new Date(customerInfo?.account?.createdAt), "dd/MM/yyyy") : 'N/A'}</span></p>
                    <p>Số điện thoại: <span className="font-bold">{customerInfo?.phone}</span></p>
                    <p>Ngày tạo tài khoản: <span className="font-bold">{customerInfo?.account?.createdAt ? format(new Date(customerInfo?.account?.createdAt), "dd/MM/yyyy") : 'N/A'}</span></p>
                    <p>Ngày cập nhật tài khoản: <span className="font-bold">{customerInfo?.account?.updateAt ? format(new Date(customerInfo?.account?.updateAt), "dd/MM/yyyy") : 'N/A'}</span></p>
                    <p>Ảnh đại diện: <span className="font-bold"><Image className="w-[30%]" src={customerInfo?.account?.image} /></span></p>
                </div>
            </Modal>
            <Modal footer="" title="Đơn thuốc" open={isModalMedicinesOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <p>Kết luận: {result}</p>
                    <Table
                        dataSource={medicines}
                        columns={columnsMedicine}
                        pagination={false}
                    />
                </div>
            </Modal>
            <h1 className="text-center my-5">Quản lý đặt lịch</h1>
            <Table columns={columns} dataSource={bookings} />
        </>
    )
};

export default ManageBooking;
