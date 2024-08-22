import { bookingStatus, colorBookingStatus, getUserDataFromLocalStorage } from "@/constants/consts";
import { Booking, Customer, Medicine } from "@/models/booking.model";
import { User } from "@/models/user.model";
import { addBookingByWeeks, cancelBooking, editResult, getAllBooking, getAllBookingByCustomerPhone } from "@/services/doctor.service";
import { Button, DatePicker, Form, Image, Input, message, Modal, Select, Table, Tag } from "antd";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import dayjs from "dayjs";
import { SearchProps } from "antd/es/input";
import Search from "antd/es/input/Search";
import TextArea from "antd/es/input/TextArea";

export interface MedicineFormValues {
    result: string;
    medicines: {
        name: string;
        quatity: number;
        detail: string;
    }[];
}

const ManageBooking = () => {
    const [isModalBookingByWeeks, setIsModalBookingByWeeks] = useState(false);
    const [isModalCancelBooking, setIsModalCancelBooking] = useState(false);
    const [isModalEditMedicinesOpen, setIsModalEditMedicinesOpen] = useState(false);
    const [isModalCustomerOpen, setIsModalCustomerOpen] = useState(false);
    const [isModalMedicinesOpen, setIsModalMedicinesOpen] = useState(false);
    const [customerInfo, setCustomerInfo] = useState<Customer>();
    const [medicines, setMedicines] = useState<Medicine[]>([])
    const [result, setResult] = useState<string>('')
    const [bookings, setBookings] = useState<Booking[]>([])
    const [bookingId, setBookingId] = useState<number>(0)
    const [bookingNeedToCancel, setBookingNeedToCancel] = useState<Booking>();
    const [reasonToCancelBooking, setReasonCancelBooking] = useState<string>('');
    const [weeksDuration, setWeeksDuration] = useState<number>(0);
    const [customerIdToAddBookingByWeeks, setCustomerIdToAddBookingByWeeks] = useState<number>(0);
    const [typeToAddBookingByWeeks, setTypeToAddBookingByWeeks] = useState<number>(-1);
    const [slotToAddBookingByWeeks, setSlotToAddBookingByWeeks] = useState<number>(-1);
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
    const [clinicIdToAddBookingByWeeks, setClinicIdToAddBookingByWeeks] = useState<number>(0);
    const [serviceIdToAddBookingByWeeks, setServiceIdToAddBookingByWeeks] = useState<number>(0);
    const [form] = Form.useForm();
    const showModalMedicines = (medicines: Medicine[], result: string) => {
        setMedicines(medicines);
        setResult(result);
        setIsModalMedicinesOpen(true)
    };

    const userData: User = getUserDataFromLocalStorage();
    const doctorId = userData.Id;

    const handleSetWeeksDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("handleSetWeeksDuration: ", e.target.value);
        setWeeksDuration(parseInt(e.target.value));
    };

    const handleOk = () => {
        setIsModalCustomerOpen(false);
        handleCancelBooking(bookingNeedToCancel.id)
        setIsModalEditMedicinesOpen(false)
      
        setIsModalBookingByWeeks(false)
    };

    const handleCancel = () => {
        setIsModalBookingByWeeks(false)
        setIsModalMedicinesOpen(false)
        setIsModalCustomerOpen(false);
        setIsModalEditMedicinesOpen(false)
        setIsModalCancelBooking(false)
    };

    const showModalBookingByWeeks = (booking: Booking) => {
        setCustomerIdToAddBookingByWeeks(booking?.customer?.account.id)
        setTypeToAddBookingByWeeks(booking?.type)
        setClinicIdToAddBookingByWeeks(booking?.clinicsService?.clinics?.id)
        setServiceIdToAddBookingByWeeks(booking?.clinicsService?.services?.id)
        // setSlotToAddBookingByWeeks(booking.slot.slotTime)
        setIsModalBookingByWeeks(true)
    };
    const showModalEditMedicines = (id: number) => {
        setBookingId(id);
        setIsModalEditMedicinesOpen(true)
    };

    const showModalCustomer = (customer: Customer) => {
        setCustomerInfo(customer)
        setIsModalCustomerOpen(true);
    };

    const showModalCanlcelBooking = (booking: Booking) => {
        console.log("reason: ", reasonToCancelBooking);
        setBookingNeedToCancel(booking);
        setIsModalCancelBooking(true)
    };


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
        if (reasonToCancelBooking) {
            const res = await cancelBooking(id, reasonToCancelBooking);
            if (res) {
                console.log("res: ", res);
                message.success(`Xoá đặt lịch ${bookingNeedToCancel?.customer?.account?.fullName} thành công`)
                setIsModalCancelBooking(false)
                setReasonCancelBooking('')
            }
            getAllBookingByDoctor();
        }else{
            message.error("Hãy nhập lý do huỷ!")
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
            title: 'Số điện thoại',
            render: (record: Booking) => (
                <>
                    {record.customer.phone}
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
            width: "20%",
            render: (record: Booking) => (
                <>
                    {
                        record.status === 1 && <>
                            <Button onClick={() => showModalCanlcelBooking(record)} className="bg-red-500 m-2 ">
                                Huỷ đặt lịch
                            </Button>
                            <Button onClick={() => showModalBookingByWeeks(record)} className="bg-purple-500 m-2 ">
                                Hẹn khám định kỳ
                            </Button>
                        </>
                    }

                </>
            )
        },
    ];
    const onSearch: SearchProps['onSearch'] = async (value) => {
        console.log("value: ", value)
        const res = await getAllBookingByCustomerPhone(value);
        if (value != "") {
            console.log("onSearch: ", res)
            setBookings(res);
        } else {
            getAllBookingByDoctor();
        }
    };
    const handleFinish = async (values: MedicineFormValues) => {
        console.log("values array: ", values);
        const res = await editResult(bookingId, values, values.result)
        if (values.medicines != undefined) {
            setIsModalMedicinesOpen(false)
            message.success("Kê đơn thuốc thành công!")
            console.log("res: ", res);
            getAllBookingByDoctor();
            form.setFieldsValue([])
            setIsModalEditMedicinesOpen(false)
        } else {
            message.error("Hãy chọn thuốc cho bệnh nhân!")
        }
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
    const handleChangeSlotTimeToAddBookingByWeeks = (value: string) => {
        console.log(`handleChangeSlotTimeToAddBookingByWeeks: ${value}`);
        setSlotToAddBookingByWeeks(parseInt(value))
    };
    const disabledDate = (current: dayjs.Dayjs) => {
        // Disable dates before today
        return current && current < dayjs().startOf('day');
    };
    const handleDateChange = (date: dayjs.Dayjs | null) => {
        setSelectedDate(date);
        console.log("handleDateChange: ", selectedDate?.toISOString());
    };

    const handleAddBookingByWeeks = async () => {
        console.log("weeksDuration: ", weeksDuration)
        console.log("slotToAddBookingByWeeks: ", slotToAddBookingByWeeks)
        console.log("selectedDate: ", selectedDate?.toISOString())
        console.log("customerIdToAddBookingByWeeks: ", customerIdToAddBookingByWeeks)
        console.log("doctorId: ", doctorId)
        console.log("clinicIdToAddBookingByWeeks: ", clinicIdToAddBookingByWeeks)
        console.log("serviceIdToAddBookingByWeeks: ", serviceIdToAddBookingByWeeks)
        const res = await addBookingByWeeks(weeksDuration, slotToAddBookingByWeeks, typeToAddBookingByWeeks, new Date(selectedDate.format('YYYY-MM-DD')), customerIdToAddBookingByWeeks
            , doctorId, clinicIdToAddBookingByWeeks, serviceIdToAddBookingByWeeks
        );
        if (res) {
            console.log("handleAddBookingByWeeks: ", res);
        }
    }
    const onchangeReason = (e) => {
        console.log("onchangeReason: ", e.target.value);
        setReasonCancelBooking(e.target.value);
    };


    return (
        <>

            <Modal title="Kê đơn" footer="" open={isModalEditMedicinesOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <Form form={form} {...formItemLayout} style={{ maxWidth: 600 }} onFinish={handleFinish}>
                        <Form.Item
                            label="Kết luận khám"
                            name="result"
                            rules={[{ required: true, message: 'Hãy nhập kết luận khám!' }]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.List name="medicines"

                        >
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map((field) => (
                                        <div key={field.key}>
                                            <Form.Item
                                                {...field}
                                                label="Tên thuốc"
                                                name={[field.name, 'name']}
                                                rules={[{ required: true, message: 'Hãy nhập tên thuốc' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                {...field}
                                                label="Số lượng"
                                                name={[field.name, 'quatity']}
                                                rules={[{ required: true, message: 'Hãy nhập số lượng!' }]}
                                            >
                                                <Input type="number" />
                                            </Form.Item>
                                            <Form.Item
                                                {...field}
                                                label="Chi tiết"
                                                name={[field.name, 'detail']}
                                                rules={[{ required: true, message: 'Hãy nhập chi tiết thông tin!' }]}
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
                            <Button onClick={handleOk} type="primary" htmlType="submit">
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
            <Modal title="Xác nhận huỷ đặt lịch" open={isModalCancelBooking} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <p>Bạn có chắc muốn huỷ đặt lịch của <span>{bookingNeedToCancel?.customer?.account?.fullName}</span></p>
                    <Title level={5}>Lý do huỷ: <span className="text-red-500">*</span></Title>
                    <TextArea value={reasonToCancelBooking} onChange={onchangeReason} />
                </div>
            </Modal>
            <Modal width={1200} footer="" title="Hẹn lịch khám định kỳ" open={isModalBookingByWeeks} onOk={handleOk} onCancel={handleCancel}>
                <div className="grid grid-cols-3 gap-20 h-96">
                    <div>
                        <Title level={5}>Chọn khung giờ<span className="text-red-500"> *</span></Title>
                        <Select
                            defaultValue="hãy chọn khung giờ"
                            className="w-full"
                            onChange={handleChangeSlotTimeToAddBookingByWeeks}
                            options={[
                                {
                                    options: [
                                        { label: <span>8h-8h45</span>, value: '1' },
                                        { label: <span>8h45-9h30</span>, value: '2' },
                                        { label: <span>9h30-10h15</span>, value: '3' },
                                        { label: <span>10h15-11h</span>, value: '4' },
                                        { label: <span>11h-11h45</span>, value: '5' },
                                        { label: <span>1h-1h45</span>, value: '6' },
                                        { label: <span>1h45-2h30</span>, value: '7' },
                                        { label: <span>2h30-3h15</span>, value: '8' },
                                        { label: <span>3h15-4h</span>, value: '9' },
                                        { label: <span>4h-4h45</span>, value: '10' },
                                    ],
                                },
                            ]}
                        />
                    </div>
                    <div >
                        <Title level={5}>Chọn ngày bắt đầu<span className="text-red-500"> *</span></Title>
                        <DatePicker
                            className="w-full"
                            onChange={handleDateChange}
                            format="DD/MM/YYYY"
                            disabledDate={disabledDate}
                            placeholder="Hãy chọn ngày bắt đầu khám định kỳ"
                        />
                    </div>
                    <div>
                        <Title level={5}>Chọn số tuần<span className="text-red-500"> *</span></Title>
                        <Input type="number" onChange={handleSetWeeksDuration} placeholder="Hãy nhập số tuần đặt lịch" />
                    </div>
                </div>
                <div className="text-center pt-5">
                    <Button onClick={handleAddBookingByWeeks} type="primary">
                        Đặt lịch
                    </Button>
                </div>
            </Modal>
            <h1 className="text-center my-5">Quản lý đặt lịch</h1>
            <Search className="mb-5" style={{ width: "300px" }} type="number" placeholder="Nhập số điện thoại" onSearch={onSearch} enterButton />
            <Table columns={columns} dataSource={bookings} />
        </>
    )
};

export default ManageBooking;
