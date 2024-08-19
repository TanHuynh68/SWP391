import { bookingStatus, colorBookingStatus, getUserDataFromLocalStorage } from "@/constants/consts";
import { ClinicsService, Doctor, Medicine, Patient, Slot } from "@/models/patient.model";
import { User } from "@/models/user.model";
import { getPatient } from "@/services/customer.service";
import { Image, Modal, Table, Tag } from "antd";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const CustomerBookingHistory = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalClinicOpen, setIsModalClinicOpen] = useState(false);
    const [isModalMedicinesOpen, setIsModalMedicinesOpen] = useState(false);
    const [doctorInfo, setDoctorInfo] = useState<Doctor>();
    const [clinicInfo, setClinicInfo] = useState<ClinicsService>();
    const [medicines, setMedicines] = useState<Medicine[]>([])
    const [result, setResult] = useState<string>('')
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

    const handleOk = () => {
        setIsModalOpen(false);
        setIsModalClinicOpen(false);
        setIsModalMedicinesOpen(false)
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsModalClinicOpen(false);
        setIsModalMedicinesOpen(false)
    };
    const userData: User = getUserDataFromLocalStorage();
    const customerId = userData.Id
    console.log("customerId: ", customerId)
    const [patients, setPatients] = useState<Patient[]>([])

    useEffect(() => {
        getPatientFromCustomer();
    }, [])

    const getPatientFromCustomer = async () => {
        const res = await getPatient(customerId);
        if (res) {
            setPatients(res);
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
    // format(new Date(user.createdAt), "dd/MM/yyyy")
    return (
        <>
            <Modal footer="" title="User Detail" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <p>Full name: <span className="font-bold">{doctorInfo?.account.fullName}</span></p>
                    <p>Email: <span className="font-bold">{doctorInfo?.account.email}</span></p>
                    <p>Gender: <span className="font-bold">{doctorInfo?.account.gender}</span></p>
                    <p>Created At: <span className="font-bold">{doctorInfo?.account.createdAt ? format(new Date(doctorInfo.account.createdAt), "dd/MM/yyyy") : 'N/A'}</span></p>
                    <p>Created At: <span className="font-bold">{doctorInfo?.account.updateAt ? format(new Date(doctorInfo.account.updateAt), "dd/MM/yyyy") : 'N/A'}</span></p>
                    <Image src={doctorInfo?.account?.image} />
                </div>
            </Modal>
            <Modal footer="" title="Clinic Detail" open={isModalClinicOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <p>Clinic name: <span className="font-bold">{clinicInfo?.clinics.name}</span></p>
                    <p>Description: <span className="font-bold">{clinicInfo?.clinics.description}</span></p>
                    <p>Address: <span className="font-bold">{clinicInfo?.clinics.address}</span></p>
                    <p>Image: <Image src={clinicInfo?.clinics.image} /></p>
                </div>
            </Modal>
            <Modal footer="" title="Chi tiết đơn thuốc" open={isModalMedicinesOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <p>Kết Quả: <span className="font-bold">{result}</span></p>
                    <Table dataSource={medicines} columns={columnsMedicine} />
                </div>
            </Modal>
            <div className="mt-10">
                <h1 className="text-center my-10">Booking History</h1>
                <Table dataSource={patients} columns={columns} />
            </div>
        </>
    )
}

export default CustomerBookingHistory;