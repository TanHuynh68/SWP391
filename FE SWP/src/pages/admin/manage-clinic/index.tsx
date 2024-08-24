// @ts-nocheck
import { Clinic } from "@/models/clinic.model";
import { deleteClinicPending, getAllClinic, getAllClinicPending, getClinicByName, updateClinicStatusActiveOrInactive, updateClinicStatusPendingToActive } from "@/services/admin.service";
import { Button, Col, GetProps, Image, message, Modal, Row, Switch, Table, Tabs, TabsProps, Tag } from "antd";
import Input from "antd/es/input";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const ManageClinic = () => {
    const [clinics, setClinics] = useState<Clinic[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [statusToFilter, setStatusToFilter] = useState<number>(1);
    const [clinic, setClinic] = useState<Clinic>();

    useEffect(() => {
        if (statusToFilter === 1) {
            getAllClinicActiveAndInactiveFromAdmin();
        } else {
            getAllClinicPendingFromAdmin();
        }
    }, [statusToFilter])
    
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

  

    const statusName = (status: number) => {
        switch (status) {
            case 1:
                return "Pending"
            case 2:
                return "Active"
            case 3:
                return "Inactive"
        }
    }
    const getAllClinicActiveAndInactiveFromAdmin = async () => {
        const res = await getAllClinic();
        const sortedBookings = res.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        if (res) {
            console.log("res: ", res)
            setClinics(sortedBookings);
        }
    }

    const getAllClinicPendingFromAdmin = async () => {
        const res = await getAllClinicPending();
        if (res) {
            console.log("res: ", res)
            const sortedBookings = res.sort((a, b) => {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });
            setClinics(sortedBookings);
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
    const statusColor = (status: number) => {
        switch (status) {
            case 1:
                return "red"
            case 2:
                return "green"
            case 3:
                return "purple"
        }
    }

    const onChangeStatus = async (record: Clinic) => {
        console.log("record: ", record)
        const res = await updateClinicStatusActiveOrInactive(record.id);
        console.log("onChangeStatus: ", res)
        message.success("Cập nhật trạng thái thành công!")
        getAllClinicActiveAndInactiveFromAdmin();
    };

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (name: string, record: Clinic) => (
                <div onClick={() => showModal(record)} className="cursor-pointer text-blue-500">
                    {name}
                </div>
            )
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: number, record: Clinic) => (
                <div className="flex justify-between">
                    <Tag color={statusColor(status)}>
                        {statusName(status)}
                    </Tag>
                    <Switch checked={status === 2 ? true : false} onChange={() => onChangeStatus(record)} />
                </div>
            )
        },
        {
            title: 'Chủ phòng khám',
            dataIndex: ['owner', 'fullName'], // Assuming owner is an object with a fullName property
            key: 'owner',
        },
        {
            title: 'Create At',
            render: (record: Clinic) => (
                <>
                     {format(new Date(record?.createAt), "dd/MM/yyyy")}
                </>
            ),
        },
    ];

    const columnsClinicPending = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (name: string, record: Clinic) => (
                <div onClick={() => showModal(record)} className="cursor-pointer text-blue-500">
                    {name}
                </div>
            )
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: number) => (
                <div className="flex justify-between">
                    <Tag color={statusColor(status)}>
                        {statusName(status)}
                    </Tag>
                </div>
            )
        },
        {
            title: 'Chủ phòng khám',
            dataIndex: ['owner', 'fullName'], // Assuming owner is an object with a fullName property
            key: 'owner',
        },
        
        {
            title: 'Hành động',
            width: "15%",
            render: (record: Clinic) => (
                <>
                    <Button onClick={() => handleAcceptClinic(record.id)} className="m-2" type="primary">
                        Chấp nhận
                    </Button>
                    <Button onClick={() => handleRejectClinic(record.id)} className="m-2 bg-red-500">
                        Từ chối
                    </Button>
                </>
            )
        },
    ];

    type SearchProps = GetProps<typeof Input.Search>;
    const { Search } = Input;

    const onChange = (key: string) => {
        setStatusToFilter(parseInt(key));
        if (key === '1') {
            getAllClinicActiveAndInactiveFromAdmin();
        } else {
            getAllClinicPendingFromAdmin();
        }
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Active and Inactive',
        },
        {
            key: '2',
            label: 'Pending',
        },
    ];

    const handleAcceptClinic = async (id: number) => {
        await updateClinicStatusPendingToActive(id);
        message.success("Đã chấp nhận");
        if (statusToFilter === 2) {
            console.log("statusToFilter: ", statusToFilter)
            getAllClinicPendingFromAdmin();
        }
    }

    const handleRejectClinic = async (id: number) => {
         await deleteClinicPending(id);
         message.success("Đã xóa");
         if (statusToFilter === 2) {
            console.log("statusToFilter: ", statusToFilter)
            getAllClinicPendingFromAdmin();
        }
    }

    // const updateStatusActiveOrInactive = async (record: Clinic) => {
    //     const res = await updateClinicStatusActiveOrInactive(record.id);
    //     if (res) {
    //         message.success(`Cập nhật trạng thái thành công!`)
    //     } else {
    //         message.error(`Cập nhật trạng thái thất bại!`)
    //     }
    // }

    const onSearch: SearchProps['onSearch'] = async (value) => {
        console.log("value: ", value)
        const res = await getClinicByName(value)
        if (value != "") {
            setClinics(res);
        } else {
            if (statusToFilter === 2) {
                getAllClinicPending();
            } else {
                getAllClinicActiveAndInactiveFromAdmin();
            }
        }

        console.log("res: ", res)
    };
    return (
        <div>
            <Modal footer="" title="Thông tin phòng khám" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <p>Tên: <span className="font-bold">{clinic?.name}</span></p>
                    <p>Mô tả: <span className="font-bold">{clinic?.description}</span></p>
                    <p>Địa chỉ: <span className="font-bold">{clinic?.address}</span></p>
                    <p>Trạng thái: <span className="font-bold">{status(clinic?.status)}</span></p>
                    <p>Chủ phòng khám: <span className="font-bold">{clinic?.owner?.fullName}</span></p>
                    <p>Ngày tạo: <span className="font-bold">{clinic?.createAt ? format(new Date(clinic.createAt), "dd/MM/yyyy") : 'N/A'}</span></p>
                    <p>Ngày chỉnh sửa: <span className="font-bold">{clinic?.updateAt ? format(new Date(clinic.updateAt), "dd/MM/yyyy") : 'N/A'}</span></p>
                    <Image src={clinic?.image} />
                </div>
            </Modal>

            <h1 className="font-bold text-2xl text-center">
                Quản lý phòng khám
            </h1>
            <Row gutter={10} className="my-10 flex justify-between">
                <Col span={12}>
                    <Search style={{ width: 300 }} placeholder="Nhập tên phòng khám" onSearch={onSearch} enterButton />
                </Col>
                <Col span={12}>

                </Col>
            </Row>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            {
                statusToFilter === 1 && <Table dataSource={clinics} columns={columns} />
            }
            {
                statusToFilter === 2 && <Table dataSource={clinics} columns={columnsClinicPending} />
            }
        </div>
    )
}
export default ManageClinic;