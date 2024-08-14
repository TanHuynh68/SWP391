import { Clinic } from "@/models/clinic.model";
import { getAllClinic, getClinicByName, searchUser } from "@/services/admin.service";
import { Button, Col, GetProps, Image, Modal, Row, Table } from "antd";
import Input from "antd/es/input";
import { format } from "date-fns";
import { useEffect, useState } from "react";


const ManageClinic = () => {
    const [clinics, setClinics] = useState<Clinic[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clinic, setClinic] = useState<Clinic>();
    const showModal = (clinic: Clinic) => {
        setClinic(clinic);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        getAllClinicFromAdmin();
    }, [])

    const getAllClinicFromAdmin = async () => {
        const res = await getAllClinic();
        if (res) {
            console.log("res: ", res)
            setClinics(res);
        }
    }
    const status = (status: number) => {
        switch (status) {
            case 1:
                return "Pending"
            case 2:
                return "Active"
            case 3:
             return "Inactive"
        }
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (name: string, record: Clinic) => (
                <div onClick={()=>showModal(record)} className="cursor-pointer text-blue-500">
                    {name}
                </div>
            )
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Owner',
            dataIndex: ['owner', 'fullName'], // Assuming owner is an object with a fullName property
            key: 'owner',
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
            ),
        },
    ];

    type SearchProps = GetProps<typeof Input.Search>;
    const { Search } = Input;



    const onSearch: SearchProps['onSearch'] = async(value) => {
        console.log("value: ", value)
        const res =  await getClinicByName(value)
        console.log("res: ",res)
    };
    return (
        <div>
            <Modal footer="" title="Clinic Detail" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <p>Name: <span className="font-bold">{clinic?.name}</span></p>
                    <p>Description: <span className="font-bold">{clinic?.description}</span></p>
                    <p>Address: <span className="font-bold">{clinic?.address}</span></p>
                    <p>Status: <span className="font-bold">{status(clinic?.status)}</span></p>
                    <p>Owner: <span className="font-bold">{clinic?.owner?.fullName}</span></p>
                    <p>Created At: <span className="font-bold">{clinic?.createAt ? format(new Date(clinic.createAt), "dd/MM/yyyy") : 'N/A'}</span></p>
                    <p>Updated At: <span className="font-bold">{clinic?.updateAt ? format(new Date(clinic.updateAt), "dd/MM/yyyy") : 'N/A'}</span></p>
                    <Image src={clinic?.image} />
                </div>
            </Modal>

            <h1 className="font-bold text-2xl text-center">
                Manage Clinic
            </h1>
            <Row gutter={10} className="my-10 flex justify-between">
                <Col span={12}>
                    <Search style={{ width: 200 }} placeholder="input search text" onSearch={onSearch} enterButton />
                </Col>
                <Col span={12}>

                </Col>
            </Row>

            <Table dataSource={clinics} columns={columns} />
        </div>
    )
}
export default ManageClinic;