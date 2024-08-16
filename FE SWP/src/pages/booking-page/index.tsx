import { isPastSlotTimeToday, slotTime } from "@/constants/consts";
import { Clinic } from "@/models/clinic.model";
import { Doctor } from "@/models/doctor.model";
import { WorkingTime } from "@/models/workingTime.model";
import { createBooking, getAllDoctorByClinic, getAllServicesOfClinic, getClinicById } from "@/services/customer.service";
import { getWorkingOfDoctor, getWorkingTimeDoctor } from "@/services/workingTime.service";
import { CalendarOutlined } from "@ant-design/icons";
import { Card, Col, Button, Image, Row, Select, Typography, DatePicker, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from 'dayjs';
import { ServiceDetail } from "@/models/service.model";
import { User } from "@/models/user.model";

const { Title } = Typography;

// const getDateForDayOfWeek = (dayOfWeek: number) => {
//     const today = dayjs();
//     const currentDayOfWeek = today.day(); // Sunday = 0, Monday = 1, etc.
//     const targetDayOfWeek = (dayOfWeek === 8 ? 0 : dayOfWeek - 1); // Adjust for Sunday
//     const daysDiff = targetDayOfWeek - currentDayOfWeek;

//     return today.add(daysDiff, 'day').format('DD/MM/YYYY');
// };

const CustomerBookingPage = () => {
    const { clinic_id } = useParams<{ clinic_id: string }>();
    const [clinic, setClinic] = useState<Clinic>();
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [accountIdDoctor, setAccountIdDoctor] = useState<number>(0);
    const [doctorIdSelected, setDoctorIdSelected] = useState<number>(0);
    const [workingTimeA, setWorkingTimeA] = useState<WorkingTime[]>([]);
    const [workingTimeB, setWorkingTimeB] = useState<WorkingTime[]>([]);
    const [workingDayOfWeek, setWorkingDayOfWeek] = useState<number>(0);
    const [service, setService] = useState<string>('');
    const [services, setServices] = useState<ServiceDetail[]>([]);
    const [slotChecked, setSlotChecked] = useState<number>(0);
    const [slotTimeToBooking, setSlotTimeToBooking] = useState<number>(0);
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

    const user = localStorage.getItem("user");
    const userData: User = JSON.parse(user)
    const customerId = userData.Id;
    const handleSetDoctor = (value: string) => {
        setDoctorIdSelected(parseInt(value));
        const selectedDoctor = doctors.find(doctor => doctor.id === parseInt(value));
        if (selectedDoctor) {
            const {id, account  } = selectedDoctor;
            console.log("id: ",id)
            console.log("account: ",account)
            setAccountIdDoctor(account.id);
            // Xử lý accountId và doctorId ở đây
        }
    };

    // const handleChangeTime = (value: {}) => {
    //     setSlotTimeToBooking(parseInt(value.do));
    // };

    const handleChangeService = (value: string) => {
        setService(value);
    };

    const handleAddBooking = async () => {
        console.log("slotChecked", slotChecked)
        console.log("selectedDate", selectedDate.toISOString())
        console.log("customerId", customerId)
        console.log("clinic_id", clinic_id)
        console.log("service", service)
        console.log("doctorIdSelected", doctorIdSelected)
        const res = await createBooking(slotChecked, 0, new Date(selectedDate.toISOString()), customerId, accountIdDoctor, parseInt(clinic_id), parseInt(service))
        console.log("handleAddBooking: ", res);
        if(res){
            message.success("Đặt lịch thành công")
        }
    }
    useEffect(() => {
        if (clinic_id) {
            getAllDoctorsOfClinicFromCustomer();
            getClinicByIdFromCustomer();
            getAllServicesOfClinicFromCustomer();
        }
    }, [clinic_id]);

    useEffect(() => {
        if (doctorIdSelected) {
            getWorkingTimeDoctorByCustomer();
        }
    }, [doctorIdSelected]);

    useEffect(() => {
        if (selectedDate && doctorIdSelected) {
            const dayOfWeek = selectedDate.day();
            setWorkingDayOfWeek(dayOfWeek);
            getWorkingTimeDoctorFromCustomer();
        }
    }, [selectedDate, doctorIdSelected]);

    const getAllServicesOfClinicFromCustomer = async () => {
        const res = await getAllServicesOfClinic(parseInt(clinic_id));
        setServices(res);
    };

    const getClinicByIdFromCustomer = async () => {
        const res = await getClinicById(parseInt(clinic_id));
        if (res) {
            setClinic(res);
        }
    };

    const getWorkingTimeDoctorByCustomer = async () => {
        const res = await getWorkingOfDoctor(doctorIdSelected);
        if (res) {
            setWorkingTimeA(res);
        }
    };

    const getWorkingTimeDoctorFromCustomer = async () => {
        if (selectedDate && doctorIdSelected) {
            const res = await getWorkingTimeDoctor(doctorIdSelected, workingDayOfWeek);
            console.log("doctorIdSelected: ", doctorIdSelected)
            console.log("workingDayOfWeek: ", workingDayOfWeek)
            if (res) {
                setWorkingTimeB(res);
            }
        }
    };

    const getAllDoctorsOfClinicFromCustomer = async () => {
        const res = await getAllDoctorByClinic(parseInt(clinic_id));
        setDoctors(res);
    };

    const handleDateChange = (date: dayjs.Dayjs | null) => {
        setSelectedDate(date);
        if (date && doctorIdSelected) {
            const dayOfWeek = date.day();
            setWorkingDayOfWeek(dayOfWeek);
            getWorkingTimeDoctorFromCustomer();
        }
    };

    const handleSetSlotTime = (workingTime: WorkingTime) => {
        if (!isPastSlotTimeToday(workingTime.slot.slotTime, workingTime.workingDayOfWeek)) {
            setSlotChecked(workingTime.slot.slotTime);
            console.log("handleSetSlotTime", workingTime)
        } else {
            message.error("Slot Time Invalid!")
        }

    };

    const disabledDate = (current: dayjs.Dayjs) => {
        // Disable dates before today
        return current && current < dayjs().startOf('day');
    };

    return (
        <div>
            <div className="grid md:grid-cols-2 gap-20 pt-20">
                <div>
                    <div className="grid md:grid-cols-2">
                        <div>
                            <Image width={200} src={clinic?.image} />
                        </div>
                        <div className="mt-10">
                            <div><p className="m-0">{clinic?.name}</p></div>
                            <div>{clinic?.address}</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-10 my-3">
                        <div>
                            <Title level={5}>Chọn chuyên khoa</Title>
                            <Select
                                defaultValue="Chọn chuyên khoa"
                                className="w-full"
                                onChange={handleChangeService}
                                options={services?.map(service => (
                                    { label: service.services.name, value: service.id }
                                ))}
                            />
                        </div>
                        <div>
                            <Title level={5}>Chọn Bác Sĩ</Title>
                            <Select
                                defaultValue="Chọn bác sĩ"
                                className="w-full"
                                onChange={handleSetDoctor}
                                options={doctors?.map(doctor => (
                                    { value: doctor.id, label: doctor.account.fullName }
                                ))}
                            />
                        </div>
                        <div>
                            <Title level={5}>Chọn ngày</Title>
                            <DatePicker
                                className="w-full"
                                onChange={handleDateChange}
                                format="DD/MM/YYYY"
                                disabledDate={disabledDate}
                                placeholder={doctorIdSelected ? "Chọn Ngày" : "Chọn bác sĩ trước"}
                                disabled={doctorIdSelected ? false : true}
                            />
                        </div>
                    </div>
                    <Row className="mt-2">
                        <Col span={1}>
                            <CalendarOutlined />
                        </Col>
                        <Col span={23}>
                            <p>LỊCH KHÁM</p>
                        </Col>
                    </Row>
                    <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-1">
                        {workingTimeB?.map(workingTime => (
                            <div key={workingTime.id}>
                                <Card
                                    key={workingTime.id}
                                    onClick={() => handleSetSlotTime(workingTime)}
                                    className={` ${isPastSlotTimeToday(workingTime.slot.slotTime, workingTime.workingDayOfWeek) ? "bg-red-500" : (slotChecked === workingTime.slot.slotTime ? "bg-yellow-500 cursor-pointer" : "bg-gray-200 cursor-pointer")}`}
                                    style={{ width: 150 }}
                                >
                                    <div className="text-center">
                                        {slotTime(workingTime.slot.slotTime)}
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                    <div className="text-center my-2">
                        <Button onClick={handleAddBooking} type="primary">Đặt Ngay</Button>
                    </div>
                </div>
            </div>
            <div>
                <p>Danh sách bác sĩ</p>
            </div>
            <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mb-2">
                {
                    doctors?.map(doctor => (
                        <div key={doctor.id}>
                            <Card style={{ width: 300 }}>
                                <Row>
                                    <Col span={12}>
                                        <Image
                                            style={{ height: "67px" }}
                                            width={100}
                                            src={doctor?.account?.image}
                                        />
                                    </Col>
                                    <Col className="mt-3" span={12}>
                                        <p>Bác Sĩ {doctor?.account?.fullName}</p>
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                    ))
                }
            </div>
            <div className="my-5">
                {clinic?.description}
            </div>
        </div>
    );
};

export default CustomerBookingPage;
