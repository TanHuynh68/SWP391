import { Button, Col, GetProps, Row, Table } from "antd";
import Input from "antd/es/input";


const ManageClinic = () => {
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Action',
            render: () => (
                <>
                    <Row>
                        <Col span={12}>
                            <Button className="bg-blue-500">
                                Accept
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button className="bg-red-500">
                                Reject
                            </Button>
                        </Col>
                    </Row>

                </>
            )
        },
    ];
    type SearchProps = GetProps<typeof Input.Search>;
    const { Search } = Input;



    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
    return (
        <div>
            <h1 className="font-bold text-2xl text-center">
                Manage Clinic
            </h1>
            <Row gutter={10} className="my-10 flex justify-between">
                <Col span={12}>
                    <Search style={{ width: 200 }} placeholder="input search text" onSearch={onSearch} enterButton />
                </Col>
                <Col span={12}>
                    <Button type="primary" className=" float-right">
                        Add new
                    </Button>
                </Col>
            </Row>

            <Table dataSource={dataSource} columns={columns} />
        </div>
    )
}
export default ManageClinic;