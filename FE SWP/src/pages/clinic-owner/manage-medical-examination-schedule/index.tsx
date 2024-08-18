import React, { useEffect } from 'react';
import { Button, Card, Select, Typography, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { fetchClinics, fetchDoctors, fetchWorkingTimes, setSelectedDoctorId } from '@redux/Slice/clinicManagementSlice';
import { RootState, AppDispatch } from '@redux/store/store';
import { User } from '@/models/user.model';

const ManageMedicalExaminationSchedule = () => {
    const { Title } = Typography;
    const dispatch: AppDispatch = useDispatch();
    const { clinics, doctors, workingTimes, loading } = useSelector((state: RootState) => state.clinicManagement);
    const user = localStorage.getItem("user");
    const userData: User = user ? JSON.parse(user) : null;
    const customerId = userData?.Id;

    const { handleSubmit, control, setValue } = useForm();
    const [selectedSlots, setSelectedSlots] = React.useState<number[]>([]);

    useEffect(() => {
        if (customerId) {
            dispatch(fetchClinics());
        }
    }, [dispatch, customerId]);

    const handleClinicChange = (clinicId: number) => {
        dispatch(fetchDoctors(clinicId));
        const clinicName = clinics.find(clinic => clinic.id === clinicId)?.name;
        setValue('clinicName', clinicName); // Lưu tên phòng khám
    };

    const handleDoctorChange = (doctorId: number) => {
        dispatch(setSelectedDoctorId(doctorId));
        dispatch(fetchWorkingTimes(doctorId));
        const doctorName = doctors.find(doctor => doctor.id === doctorId)?.account.fullName;
        setValue('doctorName', doctorName); // Lưu tên bác sĩ
    };

    const onSlotSelect = (slotTime: number) => {
        setSelectedSlots((prevSelectedSlots) => {
            if (prevSelectedSlots.includes(slotTime)) {
                return prevSelectedSlots.filter((slot) => slot !== slotTime); // Bỏ chọn nếu đã chọn trước đó
            } else {
                return [...prevSelectedSlots, slotTime]; // Thêm vào nếu chưa chọn
            }
        });
    };

    const onSubmit = (data: any) => {
        if (selectedSlots.length === 0) {
            message.warning('Vui lòng chọn ít nhất một khung thời gian trước khi lưu!');
            return;
        }

        const formData = {
            ...data,
            selectedSlots,
        };

        console.log("Form data:", formData);

        message.success('Thông tin đã được lưu thành công!');
    };

    const daysOfWeek = [
        { value: 1, label: 'Thứ 2' },
        { value: 2, label: 'Thứ 3' },
        { value: 3, label: 'Thứ 4' },
        { value: 4, label: 'Thứ 5' },
        { value: 5, label: 'Thứ 6' },
        { value: 6, label: 'Thứ 7' },
        { value: 0, label: 'Chủ nhật' },
    ];

    const defaultSlotTimes = {
        1: '8:00 - 8:45',
        2: '8:45 - 9:30',
        3: '9:30 - 10:15',
        4: '10:15 - 11:00',
        5: '11:00 - 11:45',
        6: '12:30 - 13:45',
        7: '13:45 - 14:30',
        8: '14:30 - 15:15',
        9: '15:15 - 16:00',
        10: '16:00 - 16:45',
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="font-bold text-2xl text-center">
                Quản Lý Lịch Khám
            </h1>
            <div className="grid grid-cols-3 gap-10 mt-10">
                <div>
                    <Title level={5}>Chọn phòng khám</Title>
                    <Controller
                        name="clinicId"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                className="w-full"
                                loading={loading}
                                placeholder="Chọn phòng khám"
                                onChange={(value) => {
                                    field.onChange(value);
                                    handleClinicChange(value);
                                }}
                                options={clinics.map(clinic => ({
                                    value: clinic.id,
                                    label: clinic.name
                                }))}
                            />
                        )}
                    />
                </div>
                <div>
                    <Title level={5}>Chọn bác sĩ</Title>
                    <Controller
                        name="doctorId"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                className="w-full"
                                loading={loading}
                                placeholder="Chọn bác sĩ"
                                onChange={(value) => {
                                    field.onChange(value);
                                    handleDoctorChange(value);
                                }}
                                options={doctors.map(doctor => ({
                                    value: doctor.id,
                                    label: doctor.account.fullName
                                }))}
                            />
                        )}
                    />
                </div>
                <div>
                    <Title level={5}>Chọn thứ</Title>
                    <Controller
                        name="dayOfWeek"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                className="w-full"
                                placeholder="Chọn thứ"
                                options={daysOfWeek}
                            />
                        )}
                    />
                </div>
            </div>
            <div className="grid 2xl:grid-cols-8 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2 mt-10">
                {workingTimes?.map((slot: any) => (
                    <Card
                        key={slot.id}
                        className={`bg-gray-200 hover:border-blue-500 cursor-pointer ${selectedSlots.includes(slot.slot.slotTime) ? 'border-blue-500' : ''}`}
                        style={{ width: 150 }}
                        onClick={() => onSlotSelect(slot.slot.slotTime)}
                    >
                        <div className="text-center">
                            {defaultSlotTimes[slot.slot.slotTime] || 'Thời gian không xác định'}
                        </div>
                    </Card>
                ))}
            </div>
            <div className="text-center my-2">
                <Button type="primary" htmlType="submit">Lưu thông tin</Button>
            </div>
        </form>
    );
};

export default ManageMedicalExaminationSchedule;
