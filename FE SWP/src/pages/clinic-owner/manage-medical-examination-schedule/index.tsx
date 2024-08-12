import { Button, Card, Select, Typography } from 'antd'

const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};

const ManageMedicalExaminationSchedule = () => {
    const { Title } = Typography;
    return (
        <>
            <h1 className="font-bold text-2xl text-center">
                Quản Lý Lịch Khám
            </h1>
            <div className="grid grid-cols-2 gap-10 mt-10">
                <div>
                    <Title level={5}>Chọn bác sĩ</Title>
                    <Select
                        className="w-full"
                        defaultValue="lucy"
                        onChange={handleChange}
                        options={[
                            { value: 'jack', label: 'Jack' },
                            { value: 'lucy', label: 'Lucy' },
                            { value: 'Yiminghe', label: 'yiminghe' },
                        ]}
                    />
                </div>
                <div>
                    <Title level={5}>Chọn ngày</Title>
                    <Select
                        className="w-full"
                        defaultValue="lucy"
                        onChange={handleChange}
                        options={[
                            { value: 'jack', label: '13/08/2024' },
                            { value: 'lucy', label: '14/08/2024' },
                            { value: '13/08/2024', label: '15/08/2024' },
                        ]}
                    />
                </div>
            </div>
            <div className="grid 2xl:grid-cols-8 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 mt-10">
                <Card className="bg-gray-200" style={{ width: 150 }}>
                    <div className="text-center">
                        8:00 - 8:45
                    </div>
                </Card>
                <Card className="bg-gray-200" style={{ width: 150 }}>
                    <div className="text-center">
                        8:45 - 9:30
                    </div>
                </Card>
                <Card className="bg-gray-200" style={{ width: 150 }}>
                    <div className="text-center">
                        9:30 - 10:15
                    </div>
                </Card>
                <Card className="bg-gray-200" style={{ width: 150 }}>
                    <div className="text-center">
                        10:15 - 11:00
                    </div>
                </Card>
                <Card className="bg-gray-200" style={{ width: 150 }}>
                    <div className="text-center">
                        11:00 - 11:45
                    </div>
                </Card>
                <Card className="bg-gray-200" style={{ width: 150 }}>
                    <div className="text-center">
                        12:30 - 13:45
                    </div>
                </Card>
                <Card className="bg-gray-200" style={{ width: 150 }}>
                    <div className="text-center">
                        13:45 - 14:30
                    </div>
                </Card>
                <Card className="bg-gray-200" style={{ width: 150 }}>
                    <div className="text-center">
                        14:30 - 15:15
                    </div>
                </Card>
                <Card className="bg-gray-200" style={{ width: 150 }}>
                    <div className="text-center">
                        15:15 - 16:00
                    </div>
                </Card>
                <Card className="bg-gray-200" style={{ width: 150 }}>
                    <div className="text-center">
                        16:00 - 16:45
                    </div>
                </Card>
            </div>
            <div className="text-center my-2">
                <Button type="primary">Lưu thông tin</Button>
            </div>
        </>
    )
}
export default ManageMedicalExaminationSchedule;