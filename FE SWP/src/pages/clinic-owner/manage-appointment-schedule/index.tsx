
import { bookingStatus, colorBookingStatus, getUserDataFromLocalStorage, slotTime } from "@/constants/consts";
import { Booking } from "@/models/booking.model";
import { Clinic } from "@/models/clinic.model";
import { Doctor } from "@/models/doctor.model";
import { getAllBookingOfCLinic, getAllClinicByOwnerId, getAllDoctorOfCLinic, UpdateDoctorForWeeklyBooking } from "@/services/clinicOwner.service";
import { Button, message, Select, Table, Tag } from "antd";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const ManageAppointmentSchedule = () => {

    const [clinics, setClinics] = useState<Clinic[]>([]);
    const [clinicId, setClinicId] = useState<number>(0);
    const [doctorId, setDoctorId] = useState<number>(0);
    const [bookingId, setBookingId] = useState<number>(0);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const user = getUserDataFromLocalStorage();
    const ownerId = user.Id

    useEffect(() => {
        getAllClinicByOwner();
        if (clinicId) {
            getAllBooking();
            getAllDoctors();
        }
    }, [clinicId])

    const UpdateDoctorForBooking = async (bookingId: number, doctorId: number) => {
        console.log("bookingId: ", bookingId)
        console.log("doctorId: ", doctorId)
        if (bookingId && doctorId) {
            const res = await UpdateDoctorForWeeklyBooking(bookingId, doctorId);
            if (res) {
                message.success("Cập nhật bác sĩ thành công");
                console.log("UpdateDoctorForBooking: ", res)
                getAllBooking();
            }
        } else {
            message.error("Hãy chọn bác sĩ");
        }
    }

    const getAllDoctors = async () => {
        const res = await getAllDoctorOfCLinic(clinicId);
        console.log("getAllDoctors: ", res)
        if (res) {
            setDoctors(res)
        }
    }

    const getAllBooking = async () => {
        const res = await getAllBookingOfCLinic(clinicId);
        console.log("getAllBooking: ", res)
        const sortedBookings = res.sort((a, b) => {
            return new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime();
        });
        if (res) {
            setBookings(sortedBookings);
        }
    }

    const getAllClinicByOwner = async () => {
        const res = await getAllClinicByOwnerId(ownerId);
        console.log("getAllClinicByOwner: ", res)
        if (res) {
            setClinics(res);
        }
    }


    const columns = [
        {
            title: 'Tên bện nhân',
            render: (record: Booking) => (
                <>
                    {record?.customer?.account?.fullName}
                </>
            )
        },
        {
            title: 'Trạng thái',
            render: (record: Booking) => (
                <Tag color={colorBookingStatus(record.status)}>
                    {bookingStatus(record?.status)}
                </Tag>
            )
        },
        {
            title: 'Chuyên Khoa',
            render: (record: Booking) => (
                <>
                    {record?.clinicsService?.services?.name}
                </>
            )
        },
        {
            title: 'Ngày đặt lịch',
            render: (record: Booking) => (
                <>
                     {format(new Date(record?.bookingDate), "dd/MM/yyyy")}
                </>
            )
        },
        {
            title: 'Só điện thoại',
            render: (record: Booking) => (
                <>
                    {record?.customer?.phone}
                </>
            )
        },
        {
            title: 'Thời gian khám',
            render: (record: Booking) => (
                <>
                    {slotTime(record?.slot?.slotTime)}
                </>
            ),
        },
        {
            title: 'Bác sĩ',
            render: (record: Booking) => (
                <>
                    <Select
                        disabled={record.status != 1 ? true : false}
                        className="my-2"
                        defaultValue={record.doctor.account.fullName}
                        style={{ width: 200 }}
                        onClick={() => handleSetBookingId(record.id)}
                        onChange={handleChangeDoctor}
                        options={doctors.map(doctor => (
                            { label: doctor?.account?.fullName, value: doctor.id }
                        ))}
                    />
                </>
            )
        },
        {
            title: 'Cập nhật',
            render: (record: Booking) => (
              record.status === 1 &&  <>
                    <Button onClick={() => UpdateDoctorForBooking(bookingId, doctorId)} type="primary">
                        Cập nhật bác sĩ
                    </Button>
                </>
            )
        },
    ];
    const handleSetBookingId = (value: number) => {
        setBookingId(value);
        console.log('handleSetBookingId: ', bookingId)
    };
    const handleChangeDoctor = (value: string) => {
        setDoctorId(parseInt(value));
    };
    const handleChange = (value: string) => {
        setClinicId(parseInt(value));
    };

    return (
        <div>
            <div className="text-center my-10">
                <h1 >Quản lý lịch hẹn</h1>
            </div>
            <Select
                className="my-2"
                defaultValue="Chọn Phòng khám"
                style={{ width: 200 }}
                onChange={handleChange}
                options={clinics.map(clinic => (
                    { label: clinic.name, value: clinic.id }
                ))}
            />
            <Table dataSource={bookings} columns={columns} />;
        </div>
    )
}
export default ManageAppointmentSchedule;