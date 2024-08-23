import { isPastSlotTimeToday, slotTime } from "@/constants/consts";
import { Clinic } from "@/models/clinic.model";
import { Doctor } from "@/models/doctor.model";
import { WorkingTime } from "@/models/workingTime.model";
import { createBooking, getAllDoctorByClinic, getAllServicesOfClinic, getClinicById } from "@/services/customer.service";
import { getWorkingOfDoctor, getWorkingTimeDoctor } from "@/services/workingTime.service";
import { CalendarOutlined } from "@ant-design/icons";
import { Card, Col, Button, Image, Row, Select, Typography, DatePicker, message, Checkbox, CheckboxProps } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from 'dayjs';
import { ServiceDetail } from "@/models/service.model";
import { User } from "@/models/user.model";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
const { Title } = Typography;

dayjs.extend(utc);
dayjs.extend(timezone);
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
    const [slotChecked, setSlotChecked] = useState<number>(-1);
    const [dayChecked, setDayChecked] = useState<dayjs.Dayjs | null>(null);
    const [slotTimeToBooking, setSlotTimeToBooking] = useState<number>(0);
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
    const [type ,setType] =  useState<number>(1);
    const user = localStorage.getItem("user");
    const userData: User = JSON.parse(user)
    const customerId = userData.Id;
    const handleSetDoctor = (value: string) => {
        setDoctorIdSelected(parseInt(value));
        const selectedDoctor = doctors.find(doctor => doctor.id === parseInt(value));
        if (selectedDoctor) {
            const { id, account } = selectedDoctor;
            console.log("id: ", id)
            console.log("account: ", account)
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
        console.log("selectedDate", selectedDate?.toISOString())
        console.log("customerId", customerId)
        console.log("clinic_id", clinic_id)
        console.log("service", service)
        console.log("doctorIdSelected", doctorIdSelected)
        console.log("type", type)
        if (!service) {
            return message.error("Hãy chọn chuyên khoa")
        }
        else if (!doctorIdSelected) {
            return message.error("Hãy chọn bác sĩ")
        }
        else if (!selectedDate) {
            return message.error("Hãy chọn ngày")
        }
        else if (slotChecked === -1) {
            return message.error("Hãy chọn slot")
        }
        const vnTimePlusOneDay = selectedDate.tz("Asia/Ho_Chi_Minh").add(1, 'day').format('YYYY-MM-DDTHH:mm:ss');

        const res = await createBooking(slotChecked, type, new Date(vnTimePlusOneDay), customerId, accountIdDoctor, parseInt(clinic_id), parseInt(service))
        if (res.length >0) {
            console.log("handleAddBooking: ", res )
            message.success("Đặt lịch thành công")
        } else {
            message.error(""+ res.response.data)
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
        console.log("getAllServicesOfClinicFromCustomer: ", res);
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
            console.log("getWorkingTimeDoctorByCustomer: ", res)
            setWorkingTimeA(res);
        }
    };

    const getWorkingTimeDoctorFromCustomer = async () => {
        if (selectedDate && doctorIdSelected) {
            const res = await getWorkingTimeDoctor(doctorIdSelected, workingDayOfWeek);
            // console.log("doctorIdSelected: ", doctorIdSelected)
            // console.log("workingDayOfWeek: ", workingDayOfWeek)
            console.log("getWorkingTimeDoctorFromCustomer: ", res)
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
            // getWorkingTimeDoctorFromCustomer();
        }
    };

    const handleSetSlotTime = (workingTime: WorkingTime, selectedDate: dayjs.Dayjs) => {
        if (!isPastSlotTimeToday(workingTime.slot.slotTime, workingTime.workingDayOfWeek, selectedDate)) {
            setSlotChecked(workingTime.slot.slotTime);
            setDayChecked(selectedDate)
            console.log("handleSetSlotTime", workingTime)
        } else {
            message.error("Slot Time Invalid!")
        }

    };

    const disabledDate = (current: dayjs.Dayjs) => {
        // Disable dates before today
        return current && current < dayjs().startOf('day');
    };
    const onChangeCheck: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
        if(e.target.checked === true){
            setType(2);
        }else{
            setType(1); 
        }
      };
    return (
        <div>
            <div className="pt-20">
                <div>
                    <Row gutter={10} className="">
                        <Col span={6}>
                            <Image width={200} src={clinic?.image} />
                        </Col>
                        <Col span={6} className="mt-10">
                            <div><h3 className="m-0">{clinic?.name}</h3></div>
                            <div>{clinic?.address}</div>
                        </Col>
                        <Col span={12} className="mt-10">
                            <div><p className="m-0">{clinic?.description}</p></div>
                        </Col>
                    </Row>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 my-3">
                        <div>
                            <Title level={5}>Chọn chuyên khoa<span className="text-red-500"> *</span></Title>
                            <Select
                                defaultValue="Chọn chuyên khoa"
                                className="w-full"
                                onChange={handleChangeService}
                                options={services?.map(service => (
                                    { label: service.services.name, value: service.services.id }
                                ))}
                            />
                        </div>
                        <div>
                            <Title level={5}>Chọn Bác Sĩ<span className="text-red-500"> *</span></Title>
                            <Select
                                defaultValue="Chọn bác sĩ"
                                className="w-full"
                                onChange={handleSetDoctor}
                                options={doctors?.map(doctor => (
                                    { value: doctor.id, label: doctor.account.fullName }
                                ))}
                            />
                        </div>
                        <div >
                            <Title level={5}>Chọn ngày<span className="text-red-500"> *</span></Title>
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
                    <div>
                    <Checkbox onChange={onChangeCheck}>Checkbox</Checkbox>
                    </div>
                    <Row className="mt-2">
                        <Col span={1}>
                            <CalendarOutlined />
                        </Col>
                        <Col span={23}>
                            <p>LỊCH KHÁM <span className="text-red-500"> *</span> <span className="text-gray-300">(chọn bác sĩ và ngày trước)</span></p>
                        </Col>
                    </Row>
                    <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-1">
                        {workingTimeB?.map(workingTime => (
                            <div key={workingTime.id}>
                                <Card
                                    key={workingTime.id}
                                    onClick={() => handleSetSlotTime(workingTime, selectedDate)}
                                    className={`${isPastSlotTimeToday(workingTime.slot.slotTime, workingTime.workingDayOfWeek, selectedDate) ? "bg-red-500" : (slotChecked === workingTime.slot.slotTime && dayChecked === selectedDate ? "bg-yellow-500 cursor-pointer" : "bg-gray-200 cursor-pointer")}`}
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
                        <Button htmlType="submit" onClick={handleAddBooking} type="primary">Đặt Ngay</Button>
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
        </div>
    );
};

export default CustomerBookingPage;
