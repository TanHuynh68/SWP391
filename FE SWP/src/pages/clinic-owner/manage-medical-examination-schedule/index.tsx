import { useEffect, useState } from 'react';
import { Button, Card, Select, Typography } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@redux/store/store';
import { fetchClinicsByOwnerId, fetchDoctorsByClinicId, fetchWorkingTimesByDoctorId, updateWorkingTimeForDoctor } from '@redux/Slice/clinicManagementtSlice';

const ManageMedicalExaminationSchedule = () => {
    const { Title } = Typography;
    const dispatch: AppDispatch = useDispatch();
    const { handleSubmit, control, setValue, watch } = useForm();
    const clinics = useSelector((state: RootState) => state.clinicManagement.clinics);
    const doctors = useSelector((state: RootState) => state.clinicManagement.doctors);
    const workingTimes = useSelector((state: RootState) => state.clinicManagement.workingTimes);
    const [selectedSlots, setSelectedSlots] = useState<{ [day: number]: number[] }>({});
    const selectedDay = watch('dayOfWeek');  // Track the selected day
    const selectedDoctor = watch('doctorId');  // Track the selected doctor

    useEffect(() => {
        dispatch(fetchClinicsByOwnerId());
    }, [dispatch]);

    useEffect(() => {
        if (selectedDoctor) {
            dispatch(fetchWorkingTimesByDoctorId(selectedDoctor));
        }
    }, [selectedDoctor, dispatch]);

    useEffect(() => {
        if (workingTimes.length && selectedDay !== undefined) {
            const daySlots = workingTimes
                .filter((wt) => wt.workingDayOfWeek === selectedDay)
                .map((wt) => wt.slot.slotTime);
            setSelectedSlots((prev) => ({
                ...prev,
                [selectedDay]: daySlots,
            }));
        }
    }, [workingTimes, selectedDay]);

    const handleClinicChange = (clinicId: number) => {
        setValue('clinicName', `Clinic ${clinicId}`);
        dispatch(fetchDoctorsByClinicId(clinicId));
    };

    const handleDoctorChange = (doctorId: number) => {
        setValue('doctorName', `Doctor ${doctorId}`);
        dispatch(fetchWorkingTimesByDoctorId(doctorId));
    };

    const onSlotSelect = (slotId: number) => {
        setSelectedSlots((prevSelectedSlots) => {
            const daySlots = prevSelectedSlots[selectedDay] || [];
            if (daySlots.includes(slotId)) {
                return {
                    ...prevSelectedSlots,
                    [selectedDay]: daySlots.filter((slot) => slot !== slotId), // Deselect slot
                };
            } else {
                return {
                    ...prevSelectedSlots,
                    [selectedDay]: [...daySlots, slotId], // Select slot
                };
            }
        });
    };

    const onSubmit = (data: any) => {
        const daySlots = selectedSlots[selectedDay];
        if (!daySlots || daySlots.length === 0) {
            alert('Vui lòng chọn ít nhất một khung thời gian trước khi lưu!');
            return;
        }

        const workingTimeData = {
            doctorId: data.doctorId,
            workingDayOfWeek: data.dayOfWeek,
            slotId: daySlots,
        };

        dispatch(updateWorkingTimeForDoctor(workingTimeData))
            .unwrap()
            .then(() => {
                alert('Thông tin đã được lưu thành công!');
            })
            .catch(() => {
                alert('Đã xảy ra lỗi khi lưu thông tin.');
            });
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

    const slotTimes = {
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

    const slotColumns = [
        [1, 5, 9], // First Column: 8:00 - 8:45, 11:00 - 11:45, 15:15 - 16:00
        [2, 6, 10], // Second Column: 8:45 - 9:30, 12:30 - 13:45, 16:00 - 16:45
        [3, 7], // Third Column: 9:30 - 10:15, 13:45 - 14:30
        [4, 8], // Fourth Column: 10:15 - 11:00, 14:30 - 15:15
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="font-bold text-2xl text-center">Quản Lý Lịch Khám</h1>
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
                                placeholder="Chọn phòng khám"
                                onChange={(value) => {
                                    field.onChange(value);
                                    handleClinicChange(value);
                                }}
                                options={clinics.map(clinic => ({ value: clinic.id, label: clinic.name }))}
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
                                placeholder="Chọn bác sĩ"
                                onChange={(value) => {
                                    field.onChange(value);
                                    handleDoctorChange(value);
                                }}
                                options={doctors.map(doctor => ({ value: doctor.id, label: doctor.account.fullName }))}
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
            <div className="flex justify-center gap-5 mt-10">
                {slotColumns.map((column, colIndex) => (
                    <div key={colIndex} className="flex flex-col gap-2">
                        {column.map((slotId) => (
                            <Card
                                key={slotId}
                                className={`bg-gray-200 hover:border-blue-500 cursor-pointer ${selectedSlots[selectedDay]?.includes(slotId) ? 'border-blue-500' : ''}`}
                                style={{ width: 150 }}
                                onClick={() => onSlotSelect(slotId)}
                            >
                                <div className="text-center">
                                    {slotTimes[slotId]}
                                </div>
                            </Card>
                        ))}
                    </div>
                ))}
            </div>
            <div className="text-center my-2">
                <Button type="primary" htmlType="submit">Lưu thông tin</Button>
            </div>
        </form>
    );
};

export default ManageMedicalExaminationSchedule;
