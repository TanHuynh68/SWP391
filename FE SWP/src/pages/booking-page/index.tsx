import { slotTime } from "@/constants/consts";
import { Clinic } from "@/models/clinic.model";
import { Doctor } from "@/models/doctor.model";
import { WorkingTime } from "@/models/workingTime.model";
import { createBooking, getAllDoctorByClinic, getAllServicesOfClinic, getClinicById } from "@/services/customer.service";
import { getWorkingOfDoctor, getWorkingTimeDoctor } from "@/services/workingTime.service";
import { CalendarOutlined } from "@ant-design/icons";
import { Card, Col, Button, Image, Row, Select, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from 'dayjs';

const { Title } = Typography;

const getDateForDayOfWeek = (dayOfWeek: number) => {
    const today = dayjs();
    const currentDayOfWeek = today.day(); // Sunday = 0, Monday = 1, etc.
    const targetDayOfWeek = (dayOfWeek === 8 ? 0 : dayOfWeek - 1); // Adjust for Sunday
    const daysDiff = targetDayOfWeek - currentDayOfWeek;

    return today.add(daysDiff, 'day').format('DD/MM/YYYY');
};

const CustomerBookingPage = () => {
    const { clinic_id } = useParams<{ clinic_id: string }>();
    const [clinic, setClinic] = useState<Clinic>();
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [doctorIdSelected, setDoctorIdSelected] = useState<number>(0);
    const [workingTimeA, setWorkingTimeA] = useState<WorkingTime[]>([]);
    const [workingTimeB, setWorkingTimeB] = useState<WorkingTime[]>([]);
    const [workingDayOfWeek, setWorkingDayOfWeek] = useState<number>(0);
    const [service, setService] = useState<string>('');
    const [services, setServices] = useState<string[]>([]);
    const [slotChecked, setSlotChecked] = useState<boolean>(false);
    const [slotTimeToBooking, setSlotTimeToBooking] = useState<number>(0);

    const handleSetDoctor = (value: string) => {
        console.log(`selected ${value}`);
        setDoctorIdSelected(parseInt(value));
    };

    const handleChangeTime = (value: string) => {
        console.log(`selected ${value}`);
        setWorkingDayOfWeek(parseInt(value));
    };

    const handleChangeService = (value: string) => {
        console.log(`selected ${value}`);
        setService(value);

    };

    useEffect(() => {
        if (clinic_id) {
            getAllDoctorsOfClinicFromCustomer();
            getClinicByIdFromCustomer();
            getAllServicesOfClinicFromCustomer();
        }
        if (doctorIdSelected) {
            getWorkingTimeDoctorByCustomer();
            if (workingTimeA.length > 0) {
                setWorkingTimeA(workingTimeA.filter(workingTime => workingTime.slot.slotTime))
            }
        }
        if (doctorIdSelected && workingDayOfWeek) {
            getWorkingTimeDoctorFromCustomer();
        }
    }, [clinic_id, doctorIdSelected, workingDayOfWeek]);

    const getAllServicesOfClinicFromCustomer = async () => {
        const res = await getAllServicesOfClinic(parseInt(clinic_id));
        setServices(res);
    }
    const getClinicByIdFromCustomer = async () => {
        const res = await getClinicById(parseInt(clinic_id));
        if (res) {
            setClinic(res);
        }
        console.log("clinic: ", clinic);
    };

    const getWorkingTimeDoctorByCustomer = async () => {
        console.log("doctorIdSelected: ", doctorIdSelected);
        const res = await getWorkingOfDoctor(doctorIdSelected);
        console.log("getWorkingTimeDoctorByCustomer: ", res);
        if (res) {
            setWorkingTimeA(res);
        }
    };

    const getWorkingTimeDoctorFromCustomer = async () => {
        const res = await getWorkingTimeDoctor(doctorIdSelected, workingDayOfWeek);
        console.log("getWorkingTimeDoctorFromCustomer: ", res);
        if (res) {
            setWorkingTimeB(res);
        }
    };

    const getAllDoctorsOfClinicFromCustomer = async () => {
        const res = await getAllDoctorByClinic(parseInt(clinic_id));
        console.log("getAllDoctorsOfClinicFromCustomer: ", res);
        setDoctors(res);
    };

    const handleSetSlotTime = (slotTime: number) => {
        setSlotTimeToBooking(slotTime);
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
                                options={services.map(service => (
                                    { label: service, value: service }
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
                                    { value: doctor.id.toString(), label: doctor.account.fullName }
                                ))}
                            />
                        </div>
                        <div>
                            <Title level={5}>Chọn thời gian</Title>
                            <Select
                                defaultValue={"Chọn thời gian"}
                                className="w-full"
                                onChange={handleChangeTime}
                                options={workingTimeA.map(workingTime => (
                                    { value: workingTime.workingDayOfWeek.toString(), label: getDateForDayOfWeek(workingTime.workingDayOfWeek) }
                                ))}
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
                        {workingTimeB.map(workingTime =>
                        (
                            <Card
                                onClick={() => handleSetSlotTime(workingTime.slot.slotTime)}
                                className={slotChecked ? "bg-yellow-500" : "bg-gray-200"}
                                style={{ width: 150 }}
                            >
                                <div className="text-center">
                                    {slotTime(workingTime.slot.slotTime)}
                                </div>
                            </Card>
                        )
                        )}
                    </div>
                    <div className="text-center my-2">
                        <Button type="primary">Đặt Ngay</Button>
                    </div>
                </div>
            </div>
            <div>
                <p>Danh sách bác sĩ</p>
            </div>
            <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mb-2">
                {
                    doctors.map(doctor => (
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
