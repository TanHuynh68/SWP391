import { getUserDataFromLocalStorage } from "@/constants/consts";
import { Account, ClinicsService, Doctor, Patient, Slot } from "@/models/patient.model";
import { User } from "@/models/user.model";
import { getPatient } from "@/services/customer.service";
import { Table } from "antd";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const CustomerBookingHistory = () => {
    const userData: User = getUserDataFromLocalStorage();
    const customerId = userData.Id
    console.log("customerId: ", customerId)
    const [patients, setPatients]=useState<Patient[]>([])

    useEffect(()=>{
        getPatientFromCustomer();
    }, [])

    const getPatientFromCustomer=async()=>{
        const res = await getPatient(customerId);
        if(res){
            setPatients(res);
        }
    }

    const columns = [
        {
            title: 'Slot',
            dataIndex: 'slot',
            key: 'slot',
            render:(slot: Slot)=>(
                <>
                 {slot.slotTime}
                </>
            )
        },
        {
            title: 'Doctor',
            dataIndex: 'doctor',
            key: 'doctor',
            render:(doctor: Doctor)=>(
                <div className="cursor-pointer text-blue-500">
                 {doctor.account.fullName}
                </div>
            )
        },
        {
            title: 'Clinic',
            dataIndex: 'clinicsService',
            key: 'clinicsService',
            render:(clinicsService: ClinicsService)=>(
                <div className="cursor-pointer text-blue-500">
                 {clinicsService.clinics.name}
                </div>
            )
        },
        {
            title: 'Create At',
            dataIndex: 'createAt',
            key: 'createAt',
            render:(createAt: string)=>(
                <div>
                 {format(new Date(createAt), "dd/MM/yyyy")}
                </div>
            )
        },
        {
            title: 'Update At',
            dataIndex: 'updateAt',
            key: 'updateAt',
            render:(updateAt: string)=>(
                <div>
                 {format(new Date(updateAt), "dd/MM/yyyy")}
                </div>
            )
        },
    ];
    // format(new Date(user.createdAt), "dd/MM/yyyy")
    return (
        <>
            <div className="mt-10">
                <h1 className="text-center my-10">Booking History</h1>
                <Table dataSource={patients} columns={columns} />
            </div>
        </>
    )
}

export default CustomerBookingHistory;