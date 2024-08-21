import { User } from "@/models/user.model";
import { filterUserbyNameAndRole, getAllUser } from "@/services/user.service";
import { Button, Col, GetProps, Image, message, Modal, Row, Select, Switch, Table, Tag } from "antd";
import Input from "antd/es/input";
import type { TableProps } from 'antd';
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { deleteUserPending, updateStatusUserActiveOrInactive, updateStatusUserPendingToActive } from "@/services/admin.service";
import { DeleteOutlined } from "@ant-design/icons";
import { role } from "@/redux/hooks/usRedirect";

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
        console.log("user: ", user)
        const res = await updateStatusUserActiveOrInactive(user.id);
        if (res) {
            console.log("res: ", res)
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
            title: 'Tên',
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
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            render: (gender: number) => (
                <Tag color={gender === 1 ? "orange" : "pink"}>
                    {gender === 1 ? "Nam" : "Nữ"}
                </Tag>
            )
        },
        {
            title: 'Vai trò',
            render:(record:User)=>(
                <Tag color={roleNameColor(record.role.name)}>
                    {record.role.name}
                </Tag>
            )
        },
        {
            title: 'Trạng thái',
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
            title: 'Hành động',
            width: "15%",
            render: (record: User) => (
                record.status === 1 ? <Row>
                    <Col span={12}>
                        <Button onClick={() => handleUpdateStatusPendingToActive(record.id)} className="bg-blue-500">Accept</Button>
                    </Col>
                    <Col span={12}>
                        <div onClick={() => showDeleteModal(record)} className="m-2 text-red-500">
                            <DeleteOutlined />
                        </div>
                    </Col>
                </Row> :
                    <>
                        Không có hành động gì với trạng thái active hoặc inactive
                    </>
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
    const roleNameColor = (roleName: string) => {
        switch (roleName) {
            case role.ADMIN:
                return "red"
            case role.CLINIC_OWNER:
                return "green"
            case role.DOCTOR:
                return "purple"
            case role.CUSTOMER:
                return "yellow"
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

    return (
        <div>
            <Modal title="Delete confirm" open={isModalOpenDeleteModal} onOk={handleOk} onCancel={handleCancel}>
                <p>Do you want to delete <span className="font-bold">{user?.fullName}</span> </p>
            </Modal>
            <Modal footer="" title="Thông tin người dùng" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <p>Tên: <span className="font-bold">{user?.fullName}</span></p>
                    <p>Email: <span className="font-bold">{user?.email}</span></p>
                    <p>Giới tính: <span className="font-bold">{user?.gender === 1 ? "Nam" : "Nữ"}</span></p>
                    {/* <p>Role: <span className="font-bold">{user?.role.name}</span></p> */}
                    <p>Trạng thái: <span className="font-bold">{statusName(user?.status)}</span></p>
                    <p>Ngày tạo: <span className="font-bold">{user?.createdAt ? format(new Date(user.createdAt), "dd/MM/yyyy") : 'N/A'}</span></p>
                    <p>Ngày chỉnh sửa: <span className="font-bold">{user?.updateAt ? format(new Date(user.updateAt), "dd/MM/yyyy") : 'N/A'}</span></p>
                    <Image src={user?.image} />
                </div>
            </Modal>
            <h1 className="font-bold text-2xl text-center">
                Quản lý người dùng
            </h1>
            {/* <Tabs defaultActiveKey="1" items={items} onChange={onChangeStatus} /> */}
            <Row gutter={10} className="my-10 float-left">
                <Col span={12}>
                    <Select
                        defaultValue="Tất cả vai trò"
                        style={{ width: 150 }}
                        onChange={handleChange}
                        options={[
                            { value: '', label: 'Tất cả vai trò' },
                            { value: 'Clinic Owner', label: 'Chủ phòng khám' },
                            { value: 'Admin', label: 'Quản trị viên' },
                            { value: 'Doctor', label: 'Bác sĩ' },
                            { value: 'Customer', label: 'Khách hàng' },
                        ]}
                    />
                </Col>
                <Col span={12}>
                    <Search style={{ width: 300 }} placeholder="Nhập tên của người dùng" onSearch={onSearch} enterButton />
                </Col>
            </Row>
            <Table dataSource={users} columns={columns} />
        </div>
    )
}
export default ManageUser;