import { getUserDataFromLocalStorage } from "@/constants/consts";
import {  ClinicsService, Doctor, Patient, Slot } from "@/models/patient.model";
import { User } from "@/models/user.model";
import { getPatient } from "@/services/customer.service";
import { Image, Modal, Table } from "antd";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const CustomerBookingHistory = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalClinicOpen, setIsModalClinicOpen] = useState(false);
    const [doctorInfo, setDoctorInfo]=useState<Doctor>();
    const [clinicInfo, setClinicInfo]=useState<ClinicsService>();

    const showModalClinic = (clinicsService: ClinicsService) => {
        setClinicInfo(clinicsService)
        setIsModalClinicOpen(true);
    };

    const showModal = (doctor: Doctor) => {
        setDoctorInfo(doctor)
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        setIsModalClinicOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsModalClinicOpen(false);
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
            title: 'Slot',
            dataIndex: 'slot',
            key: 'slot',
            render: (slot: Slot) => (
                <>
                    {slot.slotTime}
                </>
            )
        },
        {
            title: 'Doctor',
            dataIndex: 'doctor',
            key: 'doctor',
            render: (doctor: Doctor) => (
                <div onClick={()=>showModal(doctor)} className="cursor-pointer text-blue-500">
                    {doctor.account.fullName}
                </div>
            )
        },
        {
            title: 'Clinic',
            dataIndex: 'clinicsService',
            key: 'clinicsService',
            render: (clinicsService: ClinicsService) => (
                <div  onClick={()=>showModalClinic(clinicsService)}  className="cursor-pointer text-blue-500">
                    {clinicsService.clinics.name}
                </div>
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
            title: 'Update At',
            dataIndex: 'updateAt',
            key: 'updateAt',
            render: (updateAt: string) => (
                <div>
                    {format(new Date(updateAt), "dd/MM/yyyy")}
                </div>
            )
        },
        {
            title: 'Booking Date',
            dataIndex: 'bookingDate',
            key: 'bookingDate',
            render: (bookingDate: string) => (
                <div>
                    {format(new Date(bookingDate), "dd/MM/yyyy")}
                </div>
            )
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
            <Modal footer="" title="User Detail" open={isModalClinicOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <p>Full name: <span className="font-bold">{doctorInfo?.account.fullName}</span></p>
                    <p>Email: <span className="font-bold">{doctorInfo?.account.email}</span></p>
                    <p>Gender: <span className="font-bold">{doctorInfo?.account.gender}</span></p>
                    <p>Created At: <span className="font-bold">{doctorInfo?.account.createdAt ? format(new Date(doctorInfo.account.createdAt), "dd/MM/yyyy") : 'N/A'}</span></p>
                    <p>Created At: <span className="font-bold">{doctorInfo?.account.updateAt ? format(new Date(doctorInfo.account.updateAt), "dd/MM/yyyy") : 'N/A'}</span></p>
                    <Image src={doctorInfo?.account?.image} />
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