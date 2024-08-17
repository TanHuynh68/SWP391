import React, { useEffect } from 'react';
import { Button, Card, Select, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClinics, fetchDoctors, fetchWorkingTimes } from '@redux/Slice/clinicManagementSlice';
import { RootState, AppDispatch } from '@redux/store/store';

const ManageMedicalExaminationSchedule = ({ ownerId }: { ownerId: number }) => {
    const { Title } = Typography;
    const dispatch: AppDispatch = useDispatch();

    // Truy cập state từ Redux store
    const { clinics, doctors, workingTimes, loading } = useSelector((state: RootState) => state.clinicManagement);

    // Gọi API để lấy danh sách phòng khám khi component mount
    useEffect(() => {
        if (ownerId) {
            dispatch(fetchClinics(ownerId));
        }
    }, [dispatch, ownerId]);

    const handleClinicChange = (clinicId: number) => {
        dispatch(fetchDoctors(clinicId));
    };

    const handleDoctorChange = (doctorId: number) => {
        dispatch(fetchWorkingTimes(doctorId));
    };

    const slots = [
        { value: 1, label: '8:00 - 8:45' },
        { value: 2, label: '8:45 - 9:30' },
        { value: 3, label: '9:30 - 10:15' },
        { value: 4, label: '10:15 - 11:00' },
        { value: 5, label: '11:00 - 11:45' },
        { value: 6, label: '12:30 - 13:45' },
        { value: 7, label: '13:45 - 14:30' },
        { value: 8, label: '14:30 - 15:15' },
        { value: 9, label: '15:15 - 16:00' },
        { value: 10, label: '16:00 - 16:45' },
    ];

    const daysOfWeek = [
        { value: 1, label: 'Thứ 2' },
        { value: 2, label: 'Thứ 3' },
        { value: 3, label: 'Thứ 4' },
        { value: 4, label: 'Thứ 5' },
        { value: 5, label: 'Thứ 6' },
        { value: 6, label: 'Thứ 7' },
        { value: 0, label: 'Chủ nhật' },
    ];

    return (
        <>
            <h1 className="font-bold text-2xl text-center">
                Quản Lý Lịch Khám
            </h1>
            <div className="grid grid-cols-3 gap-10 mt-10">
                <div>
                    <Title level={5}>Chọn phòng khám</Title>
                    <Select
                        className="w-full"
                        loading={loading}
                        placeholder="Chọn phòng khám"
                        onChange={handleClinicChange}
                        options={clinics.map(clinic => ({
                            value: clinic.id,
                            label: clinic.name
                        }))}
                    />
                </div>
                <div>
                    <Title level={5}>Chọn bác sĩ</Title>
                    <Select
                        className="w-full"
                        loading={loading}
                        placeholder="Chọn bác sĩ"
                        onChange={handleDoctorChange}
                        options={doctors.map(doctor => ({
                            value: doctor.id,
                            label: doctor.account.fullName
                        }))}
                    />
                </div>
                <div>
                    <Title level={5}>Chọn thứ</Title>
                    <Select
                        className="w-full"
                        placeholder="Chọn thứ"
                        options={daysOfWeek}
                    />
                </div>
            </div>
            <div className="grid 2xl:grid-cols-8 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2 mt-10">
                {slots.map(slot => (
                    <Card key={slot.value} className="bg-gray-200" style={{ width: 150 }}>
                        <div className="text-center">
                            {slot.label}
                        </div>
                    </Card>
                ))}
            </div>
            <div className="text-center my-2">
                <Button type="primary">Lưu thông tin</Button>
            </div>
        </>
    );
};

export default ManageMedicalExaminationSchedule;
