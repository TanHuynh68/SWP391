import { CalendarOutlined } from "@ant-design/icons";
import { Card, Col, Button, Image, Row, Select } from "antd";

const CustomerBookingPage = () => {
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    return (
        <div>
            <div className="grid md:grid-cols-2 gap-20 pt-20">
                <div>
                    <div className="grid md:grid-cols-2">
                        <div>
                            <Image
                                width={200}
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            />
                        </div>

                        <div className="mt-10">
                            <div><p className="m-0">Nha Khoa ABC</p></div>
                            <div>Nha khoa này có lịch sử lâu đời</div>
                            <div>TP.Hồ Chí Minh</div>
                            <div></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-10">
                        <Select
                            defaultValue="Chọn chuyên khoa"
                            className="w-full"
                            onChange={handleChange}
                            options={[
                                { value: 'dentistry', label: 'Nha khoa' },
                                { value: 'cardiology', label: 'Tim mạch' },
                                { value: 'neurology', label: 'Thần kinh' },
                                { value: 'orthopedics', label: 'Chấn thương chỉnh hình' },
                            ]}
                        />

                        <Select
                            defaultValue="Chọn Bác Sĩ"
                            className="w-full"
                            onChange={handleChange}
                            options={[
                                { value: 'jack', label: 'Jack' },
                                { value: 'lucy', label: 'Lucy' },
                                { value: 'lee', label: 'Lee' },
                            ]}
                        />

                        <Select
                            defaultValue="Hôm nay - 10/8"
                            className="w-full"
                            onChange={handleChange}
                            options={[
                                { value: 'today', label: 'Hôm nay - 10/8' },
                                { value: 'tomorrow', label: 'Ngày mai - 11/8' },
                                { value: 'yesterday', label: 'Hôm qua - 09/8' },
                            ]}
                        />

                    </div>
                    <Row className="mt-2">
                        <Col span={1} >
                            <CalendarOutlined />
                        </Col>
                        <Col span={23}>
                            <p>LỊCH KHÁM</p>
                        </Col>
                    </Row>
                    <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-1">

                        <Card className="bg-gray-200" style={{ width: 150 }}>
                            <div className="text-center">
                                9:00 - 9:30
                            </div>
                        </Card>
                        <Card className="bg-gray-200" style={{ width: 150 }}>
                            <div className="text-center">
                                9:00 - 9:30
                            </div>
                        </Card>
                        <Card className="bg-gray-200" style={{ width: 150 }}>
                            <div className="text-center">
                                9:00 - 9:30
                            </div>
                        </Card>
                        <Card className="bg-gray-200" style={{ width: 150 }}>
                            <div className="text-center">
                                9:00 - 9:30
                            </div>
                        </Card>
                    </div>
                    <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-1">
                        <Card className="bg-gray-200" style={{ width: 150 }}>
                            <div className="text-center">
                                9:00 - 9:30
                            </div>
                        </Card>
                        <Card className="bg-gray-200" style={{ width: 150 }}>
                            <div className="text-center">
                                9:00 - 9:30
                            </div>
                        </Card>
                        <Card className="bg-gray-200" style={{ width: 150 }}>
                            <div className="text-center">
                                9:00 - 9:30
                            </div>
                        </Card><Card className="bg-gray-200" style={{ width: 150 }}>
                            <div className="text-center">
                                9:00 - 9:30
                            </div>
                        </Card>
                    </div>
                    <div className="text-center my-2">
                        <Button type="primary">Đặt Ngay</Button>
                    </div>

                </div>
                <div className="mt-10">
                    <p className="m-0">Địa chỉ khám</p>
                    <p className="m-0">Nha Khoa Hồng Phương - Cơ sở Quận 1</p>
                    <p className="m-0">Đường Lâm Quang Ky, Khu Phố 5, Q1 -Tp. Hồ Chí Minh</p>
                </div>


            </div>
            <div>
                <p>Danh sách bác sĩ</p>
            </div>
            <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mb-2">
                <Card style={{ width: 300 }}>
                    <Row >
                        <Col span={12}>
                            <Image
                                className="w-32 h-32 rounded-full"
                                width={100}
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            />
                        </Col>
                        <Col className="mt-3" span={12}>
                            <p>Bác Sĩ Kim</p>
                            <p>Bệnh viện Bình An</p>
                        </Col>
                    </Row>
                </Card>
                <Card style={{ width: 300 }}>
                    <Row >
                        <Col span={12}>
                            <Image
                                className="w-32 h-32 rounded-full"
                                width={100}
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            />
                        </Col>
                        <Col className="mt-3" span={12}>
                            <p>Bác Sĩ Kim</p>
                            <p>Bệnh viện Bình An</p>
                        </Col>
                    </Row>
                </Card>
                <Card style={{ width: 300 }}>
                    <Row >
                        <Col span={12}>
                            <Image
                                className="w-32 h-32 rounded-full"
                                width={100}
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            />
                        </Col>
                        <Col className="mt-3" span={12}>
                            <p>Bác Sĩ Kim</p>
                            <p>Bệnh viện Bình An</p>
                        </Col>
                    </Row>
                </Card>
                <Card style={{ width: 300 }}>
                    <Row >
                        <Col span={12}>
                            <Image
                                className="w-32 h-32 rounded-full"
                                width={100}
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            />
                        </Col>
                        <Col className="mt-3" span={12}>
                            <p>Bác Sĩ Kim</p>
                            <p>Bệnh viện Bình An</p>
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>
    )
}

export default CustomerBookingPage;