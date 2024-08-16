import { User } from "@/models/user.model";
import { filterUserbyNameAndRole, getAllUser, getPendingUser, getUserActiveAndInactive } from "@/services/user.service";
import { Button, Col, GetProps, Image, message, Modal, Row, Select, Switch, Table, Tabs, Tag } from "antd";
import Input from "antd/es/input";
import type { TabsProps } from 'antd';
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { deleteUserPending, updateStatusUserActiveOrInactive, updateStatusUserPendingToActive } from "@/services/admin.service";
import { DeleteOutlined } from "@ant-design/icons";

const ManageUser = () => {
    const [user, setUser] = useState<User>();
    const [users, setUsers] = useState<User[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenDeleteModal, setIsModalOpenDeleteModal] = useState(false);
    const [roleUser, setRoleUser] = useState<string>("");
    const [keywordUser, setKeywordUser] = useState<string>('');
    const [userIdNeedToDelete, setUserIdNeedToDelete] = useState<number>(0);
    useEffect(() => {
        if (roleUser || keywordUser) {
            handleSearchAndFilter();
        } else {
            getAllUserFormAdmin();
        }
    }, [roleUser, keywordUser])

    const showModal = (user: User) => {
        setUser(user);
        setIsModalOpen(true);
    };

    const showDeleteModal = (user: User) => {
        setUserIdNeedToDelete(user.id);
        if (user) {
            setIsModalOpenDeleteModal(true);
        }
    };

    const handleOk = async () => {
        console.log("handleOk userIdNeedToDelete: ", userIdNeedToDelete)
        await deleteUserPending(userIdNeedToDelete);
        setUsers(users.filter(user => user.id != userIdNeedToDelete))
        setIsModalOpen(false);
        setIsModalOpenDeleteModal(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsModalOpenDeleteModal(false);
    };
    const onChange = (checked: boolean) => {
        console.log(`switch to ${checked}`);

    };

    const handleUpDateStatusUser = async (user: User) => {
        const res = await updateStatusUserActiveOrInactive(user.id);
        if (res) {
            if (roleUser || keywordUser) {
                handleSearchAndFilter();
            } else {
                getAllUserFormAdmin();
            }
            message.success("Change Status Successfully!")
        }
    }

    const getAllUserFormAdmin = async () => {
        const res = await getAllUser();
        if (res) {
            setUsers(res); // Extract data from AxiosResponse and set it to users
        }
        console.log("user", users)
    };

    const handleUpdateStatusPendingToActive = async (id: number) => {
        console.log("handleUpdateStatusPendingToActive: ", id);
        const res = await updateStatusUserPendingToActive(id);
        if (res) {
            if (roleUser || keywordUser) {
                handleSearchAndFilter();
            } else {
                getAllUserFormAdmin();
            }
            message.success("Update Status Successfully")
        }
        setUsers(users);
    }
    const columns: TableProps["columns"] = [
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
            render: (fullName: string, record: User) => (
                <div onClick={() => showModal(record)} className="cursor-pointer text-blue-500">
                    {fullName}
                </div>
            )
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            render: (gender: number) => (
                <Tag color={gender === 1 ? "orange" : "pink"}>
                    {gender === 1 ? "Male" : "female"}
                </Tag>
            )
        },
        {
            title: 'Role',
            dataIndex: ['role', 'name'], // Assuming role is an object with a name property
            key: 'role',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: number, record: User) => (
                <div className="flex justify-between">
                    <Tag color={statusColor(status)}>
                        {statusName(status)}
                    </Tag>
                    {(record.email != "tan@gmail.com" && record.status != 1) &&
                        <Switch onClick={() => handleUpDateStatusUser(record)} checked={status === 2} onChange={() => onChange} />
                    }
                </div>
            )
        },
        {
            title: 'Action',
            render: (record: User) => (
                record.status === 1 && <Row>
                    <Col span={12}>
                        <Button onClick={() => handleUpdateStatusPendingToActive(record.id)} className="bg-blue-500">Accept</Button>
                    </Col>
                    <Col span={12}>
                        <div onClick={() => showDeleteModal(record)} className="m-2 text-red-500">
                            <DeleteOutlined />
                        </div>
                    </Col>
                </Row>
            )
        },
    ];

    type SearchProps = GetProps<typeof Input.Search>;
    const { Search } = Input;

    const handleChange = async (value: string) => {
        console.log(`selected ${value}`);
        setRoleUser(value);
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
    const onSearch: SearchProps['onSearch'] = async (value) => {
        setKeywordUser(value);
    }

    const handleSearchAndFilter = async () => {
        console.log("keywordUser: ", keywordUser)
        console.log("roleUser: ", roleUser)
        const res = await filterUserbyNameAndRole(keywordUser, roleUser);
        console.log("handleSearchAndFilter: ", res)
        setUsers(res);
    }

    const onChangeStatus = async (key: string) => {
        console.log(key);
        if (key === "2") {
            const res = await getUserActiveAndInactive();
            console.log('onChangeStatus: ', res)
            if (res) {
                setUsers(res);
            }
        }else{
            const res = await getPendingUser();
            console.log('onChangeStatus: ', res)
            if (res) {
                setUsers(res);
            }
        }
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Pending',
        },
        {
            key: '2',
            label: 'Active And Inactive',
        },
    ];

    return (
        <div>
            <Modal title="Delete confirm" open={isModalOpenDeleteModal} onOk={handleOk} onCancel={handleCancel}>
                <p>Do you want to delete <span className="font-bold">{user?.fullName}</span> </p>
            </Modal>
            <Modal footer="" title="User Detail" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <p>Full name: <span className="font-bold">{user?.fullName}</span></p>
                    <p>Email: <span className="font-bold">{user?.email}</span></p>
                    <p>Gender: <span className="font-bold">{user?.gender}</span></p>
                    {/* <p>Role: <span className="font-bold">{user?.role.name}</span></p> */}
                    <p>Status: <span className="font-bold">{statusName(user?.status)}</span></p>
                    <p>Created At: <span className="font-bold">{user?.createdAt ? format(new Date(user.createdAt), "dd/MM/yyyy") : 'N/A'}</span></p>
                    <p>Created At: <span className="font-bold">{user?.updateAt ? format(new Date(user.updateAt), "dd/MM/yyyy") : 'N/A'}</span></p>
                    <Image src={user?.image} />
                </div>
            </Modal>
            <h1 className="font-bold text-2xl text-center">
                Manage Users
            </h1>
            <Tabs defaultActiveKey="1" items={items} onChange={onChangeStatus} />
            <Row gutter={10} className="my-10 float-left">
                <Col span={12}>
                    <Select
                        defaultValue="All Role"
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={[
                            { value: '', label: 'All Role' },
                            { value: 'CLINICOWNER', label: 'Clinic Owner' },
                            { value: 'ADMIN', label: 'Admin' },
                            { value: 'DOCTOR', label: 'Doctor' },
                            { value: 'CUSTOMER', label: 'Customer' },
                        ]}
                    />
                </Col>
                <Col span={12}>
                    <Search style={{ width: 200 }} placeholder="input search text" onSearch={onSearch} enterButton />
                </Col>
            </Row>
            <Table dataSource={users} columns={columns} />
        </div>
    )
}
export default ManageUser;