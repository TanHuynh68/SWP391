import { GetProps, Input, Select, Table } from "antd";
const ManagePatient = () => {
    const dataSource = [
        {
            key: '1',
            no: '1',
            name: "Trương Mỹ Lan",
            birthday: '10/9/1978',
            gender: "Nữ",
            phoneNumber: "0900011333",
            address: "159/12 Nguyễn Bá Ngọc, Q2, Tp.HCM"
        },
        {
            key: '2',
            no: '1',
            name: "Lê Thị Hồng Gấm",
            birthday: '9/10/1975',
            gender: "Nữ",
            phoneNumber: "0900011332",
            address: "152/22 Nguyễn Văn Tăng, Q9 Tp.HCM"
        },
    ];

    const columns = [
        {
            title: 'STT',
            dataIndex: 'no',
            key: 'no',
        },
        {
            title: 'Tên Bệnh Nhân',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ngày Tháng Năm Sinh',
            dataIndex: 'birthday',
            key: 'birthday',
        },
        {
            title: 'Giới Tính',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Số Điện Thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Địa Chỉ',
            dataIndex: 'address',
            key: 'address',
        },

    ];
    type SearchProps = GetProps<typeof Input.Search>;
    const { Search } = Input;
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
    return (
        <div>
            <h1 className="font-bold text-2xl text-center">
                Quản Lý Bệnh Nhân
            </h1>
            <div  className="my-10 flex justify-between">
                <div >
                    <Search style={{ width: 200 }} placeholder="Nhập từ khóa" onSearch={onSearch} enterButton />
                </div>
                <div>
                        {/* <Title level={5}>Chọn phòng khám</Title> */}
                        <Select
                            style={{ width: 200 }}
                            defaultValue="Chọn Phòng Khám"
                            onChange={handleChange}
                            options={[
                                { value: 'jack', label: 'Jack' },
                                { value: 'lucy', label: 'Lucy' },
                                { value: 'Yiminghe', label: 'yiminghe' },
                            ]}
                        />
                    </div>
            </div>

            <Table dataSource={dataSource} columns={columns} />
        </div>
    )

}

export default ManagePatient;