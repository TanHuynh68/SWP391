import { useEffect } from "react";
import { Input, Select, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchClinics, fetchPatients } from "@redux/Slice/managePatientSlice";
import { RootState, AppDispatch } from "@redux/Store/store";

const ManagePatient = () => {
    const dispatch: AppDispatch = useDispatch();
    const { clinics, patients, loading } = useSelector((state: RootState) => state.managePatient);

    useEffect(() => {
        dispatch(fetchClinics());
    }, [dispatch]);

    const handleClinicChange = (clinicId: number) => {
        dispatch(fetchPatients(clinicId));
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
            render: (_text, _record, index) => index + 1,
        },
        {
            title: 'Tên Bệnh Nhân',
            dataIndex: ['account', 'fullName'],
            key: 'name',
        },
        {
            title: 'Ngày Tháng Năm Sinh',
            dataIndex: 'doB',
            key: 'birthday',
        },
        {
            title: 'Giới Tính',
            dataIndex: ['account', 'gender'],
            key: 'gender',
            render: gender => (gender === 1 ? 'Nam' : 'Nữ'),
        },
        {
            title: 'Số Điện Thoại',
            dataIndex: 'phone',
            key: 'phoneNumber',
        },
        {
            title: 'Địa Chỉ',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    type SearchProps = Input.Search['props'];
    const { Search } = Input;
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

    return (
        <div>
            <h1 className="font-bold text-2xl text-center">
                Quản Lý Bệnh Nhân
            </h1>
            <div className="my-10 flex justify-between">
                <div>
                    <Search style={{ width: 200 }} placeholder="Nhập từ khóa" onSearch={onSearch} enterButton />
                </div>
                <div>
                    <Select
                        style={{ width: 200 }}
                        placeholder="Chọn Phòng Khám"
                        onChange={handleClinicChange}
                        loading={loading}
                        options={clinics.map(clinic => ({
                            value: clinic.id,
                            label: clinic.name
                        }))}
                    />
                </div>
            </div>
            <Table dataSource={patients} columns={columns} rowKey="id" />
        </div>
    );
}

export default ManagePatient;
