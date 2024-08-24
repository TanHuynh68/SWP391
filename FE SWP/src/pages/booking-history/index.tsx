// @ts-nocheck
import { bookingStatus, colorBookingStatus, getUserDataFromLocalStorage } from "@/constants/consts";
import { ClinicsService, Doctor, Medicine, Patient } from "@/models/patient.model";
import { User } from "@/models/user.model";
import { getPatient } from "@/services/customer.service";
import { cancelBooking } from "@/services/doctor.service";
import { Button, Image, message, Modal, Table, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const CustomerBookingHistory = () => {
    const [reasonToCancelBooking, setReasonCancelBooking] = useState<string>('');
    const [isModalCancelBooking, setIsModalCancelBooking] = useState(false);
    const [bookingNeedToCancel, setBookingNeedToCancel] = useState<Patient>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalClinicOpen, setIsModalClinicOpen] = useState(false);
    const [isModalMedicinesOpen, setIsModalMedicinesOpen] = useState(false);
    const [doctorInfo, setDoctorInfo] = useState<Doctor>();
    const [clinicInfo, setClinicInfo] = useState<ClinicsService>();
    const [medicines, setMedicines] = useState<Medicine[]>([])
    const [result, setResult] = useState<string>('')

    useEffect(() => {
        getPatientFromCustomer();
    }, [])

    const showModalClinic = (clinicsService: ClinicsService) => {
        setClinicInfo(clinicsService)
        setIsModalClinicOpen(true);
    };

    const showModal = (doctor: Doctor) => {
        setDoctorInfo(doctor)
        setIsModalOpen(true);
    };

    const showModalMedicines = (medicines: Medicine[], result: string) => {
        setMedicines(medicines);
        setResult(result);
        setIsModalMedicinesOpen(true)
    };

    const handleOk = async () => {
        const res = await handleCancelBooking(bookingNeedToCancel.id)
        if (res) {
            setIsModalCancelBooking(false)
        }
        setIsModalOpen(false);
        setIsModalClinicOpen(false);
        setIsModalMedicinesOpen(false)
    };
    const handleCancelBooking = async (id: number) => {
        if (reasonToCancelBooking) {
            const res = await cancelBooking(id, reasonToCancelBooking);
            if (res) {
                console.log("res: ", res);
                message.success(`Xoá đặt lịch ${bookingNeedToCancel?.customer?.account?.fullName} thành công`)
                setIsModalCancelBooking(false)
                setReasonCancelBooking('')
            }
            getPatientFromCustomer();
        } else {
            message.error("Hãy nhập lý do huỷ!")
        }
    }
    const handleCancel = () => {
        setIsModalOpen(false);
        setIsModalClinicOpen(false);
        setIsModalMedicinesOpen(false)
        setIsModalCancelBooking(false)
    };
    const userData: User = getUserDataFromLocalStorage();
    const customerId = userData.Id
    console.log("customerId: ", customerId)
    const [patients, setPatients] = useState<Patient[]>([])

    const getPatientFromCustomer = async () => {
        const res = await getPatient(customerId);
        const sortedBookings = res.sort((a, b) => {
            return new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime();
        });
        if (res) {
            console.log("getPatientFromCustomer: ", res);
            setPatients(sortedBookings);

        }
    }

    const columns = [
        {
            title: 'Tên Phòng Khám',
            dataIndex: 'clinicsService',
            key: 'clinicsService',
            render: (clinicsService: ClinicsService) => (
                <div onClick={() => showModalClinic(clinicsService)} className="cursor-pointer text-blue-500">
                    {clinicsService.clinics.name}
                </div>
            )
        },
        {
            title: 'Bác sĩ',
            dataIndex: 'doctor',
            key: 'doctor',
            render: (doctor: Doctor) => (
                <div onClick={() => showModal(doctor)} className="cursor-pointer text-blue-500">
                    {doctor.account.fullName}
                </div>
            )
        },
        {
            title: 'Ngày đặt lịch',
            dataIndex: 'bookingDate',
            key: 'bookingDate',
            render: (bookingDate: string) => (
                <div>
                    {format(new Date(bookingDate), "dd/MM/yyyy")}
                </div>
            )
        },
        {
            title: 'Trạng thái',
            render: (record: Patient) => (
                <Tag color={colorBookingStatus(record.status)}>
                    {bookingStatus(record.status)}
                </Tag>
            )
        },
        {
            title: 'Loại',
            render: (record: Patient) => (
                record.type === 1 ? <>
                    <>Khám</>
                </>
                    : <>
                        Điều trị
                    </>
            )
        },
        {
            title: 'Create At',
            dataIndex: 'createAt',
            key: 'createAt',
            render: (createAt: string) => (
                <div>
                    {format(new Date(createAt), "dd/MM/yyyy")}
                </div>
            )
        },
        {
            title: 'Đơn thuốc',
            render: (record: Patient) => (
                record.status === 2 ? <>
                    <div onClick={() => showModalMedicines(record.medicines, record.result)} className="text-blue-500 cursor-pointer">Xem đơn thuốc</div>
                </>
                    : <>
                        Không có đơn thuốc
                    </>
            )
        },
        {
            title: 'Action',
            width: "20%",
            render: (record: Patient) => (
                <>
                    {
                        record.status === 1 && <>
                            <Button onClick={() => showModalCancelBooking(record)} className="bg-red-500  ">
                                Huỷ đặt lịch
                            </Button>
                        </>
                    }
                    {
                        record.status === 3 && <>
                            Lý do hủy:
                            <span className="font-bold"> {record?.reason}</span>
                        </>
                    }
                </>
            )
        },
    ];
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

    const showModalCancelBooking = (record: Patient) => {
        console.log("reason: ", reasonToCancelBooking);
        setBookingNeedToCancel(record);
        setIsModalCancelBooking(true)
    };

    const onchangeReason = (e) => {
        console.log("onchangeReason: ", e.target.value);
        setReasonCancelBooking(e.target.value);
    };

    return (
        <>
            <Modal footer="" title="Thông tin bác sĩ" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <p>Tên bác sĩ: <span className="font-bold">{doctorInfo?.account.fullName}</span></p>
                    <p>Email: <span className="font-bold">{doctorInfo?.account.email}</span></p>
                    <p>Giới tính: <span className="font-bold">{doctorInfo?.account.gender}</span></p>
                    <p>Ngày tạo: <span className="font-bold">{doctorInfo?.account.createdAt ? format(new Date(doctorInfo.account.createdAt), "dd/MM/yyyy") : 'N/A'}</span></p>
                    <p>Ngày chỉnh sửa: <span className="font-bold">{doctorInfo?.account.updateAt ? format(new Date(doctorInfo.account.updateAt), "dd/MM/yyyy") : 'N/A'}</span></p>
                    <Image src={doctorInfo?.account?.image} />
                </div>
            </Modal>
            <Modal title="Xác nhận huỷ đặt lịch" open={isModalCancelBooking} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <p>Bạn có chắc muốn huỷ đặt lịch của <span>{bookingNeedToCancel?.customer?.account?.fullName}</span></p>
                    <Title level={5}>Lý do huỷ: <span className="text-red-500">*</span></Title>
                    <TextArea value={reasonToCancelBooking} onChange={onchangeReason} />
                </div>
            </Modal>
            <Modal footer="" title="Thông tin phòng khám" open={isModalClinicOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <p>Tên phòng khám: <span className="font-bold">{clinicInfo?.clinics.name}</span></p>
                    <p>Mô tả: <span className="font-bold">{clinicInfo?.clinics.description}</span></p>
                    <p>Địa chỉ: <span className="font-bold">{clinicInfo?.clinics.address}</span></p>
                    <p>Hình ảnh: <Image src={clinicInfo?.clinics.image} /></p>
                </div>
            </Modal>
            <Modal footer="" title="Thông tin đơn thuốc" open={isModalMedicinesOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <p>Kết Quả: <span className="font-bold">{result}</span></p>
                    <Table dataSource={medicines} columns={columnsMedicine} />
                </div>
            </Modal>
            <div className="mt-10">
                <h1 className="text-center my-10">Lịch sử đặt lịch</h1>
                <Table dataSource={patients} columns={columns} />
            </div>
        </>
    )
}

export default CustomerBookingHistory;