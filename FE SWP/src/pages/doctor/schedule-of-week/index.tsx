import { getUserDataFromLocalStorage, slotTime } from "@/constants/consts";
import { WorkingTime } from "@/models/workingTime.model";
import { getAllWorkingTimeOfDoctor } from "@/services/doctor.service";
import { CheckOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { useEffect, useState } from "react";

interface SlotData {
    slot: string;
    Monday?: React.ReactNode;
    Tuesday?: React.ReactNode;
    Wednesday?: React.ReactNode;
    Thursday?: React.ReactNode;
    Friday?: React.ReactNode;
    Saturday?: React.ReactNode;
    Sunday?: React.ReactNode;
}


const ScheduleOfWeek = () => {
    const [doctorWorkingTime, setDoctorWorkingTime] = useState<WorkingTime[]>([]);

    useEffect(() => {
        getWorkingTime();
    }, []);

    const user = getUserDataFromLocalStorage();
    const doctorId = user.Id
    const getWorkingTime = async () => {
        const res = await getAllWorkingTimeOfDoctor(doctorId);
        if (res) {
            console.log("getWorkingTime: ", res)
            setDoctorWorkingTime(res);
        }
    };

    // Hàm lấy tên ngày từ số (1 = Thứ Hai, ..., 7 = Chủ Nhật)
    const getDayName = (dayNumber: number): keyof SlotData => {
        const days: { [key: number]: keyof SlotData } = {
            0: 'Monday',
            1: 'Tuesday',
            2: 'Wednesday',
            3: 'Thursday',
            4: 'Friday',
            5: 'Saturday',
            6: 'Sunday'
        };
        return days[dayNumber] || 'Monday'; // Hoặc giá trị mặc định nếu không tìm thấy
    };
    
    const dataSource: SlotData[] = Array.from({ length: 10 }, (_, i) => {
        const slotNumber = i + 1;
        const slotData: SlotData = { slot: `${slotTime(slotNumber)}` };
    
        doctorWorkingTime.forEach(workingTime => {
            if (workingTime.slot.slotTime  === slotNumber) {
                const dayName = getDayName(workingTime.workingDayOfWeek) as keyof SlotData;
                slotData[dayName] = '1'; 
            }
        });
    
        return slotData;
    });

    const columns = [
        {
            title: 'Slot',
            dataIndex: 'slot',
            key: 'slot',
        },
        {
            title: 'Thứ 2',
            dataIndex: 'Monday',
            key: 'Monday',
            render:(Monday:string)=>(
                Monday === '1' && <CheckOutlined/>
            )
        },
        {
            title: 'Thứ 3',
            dataIndex: 'Tuesday',
            key: 'Tuesday',
            render:(Tuesday:string)=>(
                Tuesday === '1' && <CheckOutlined/>
            )
        },
        {
            title: 'Thứ 4',
            dataIndex: 'Wednesday',
            key: 'Wednesday',
            render:(Wednesday:string)=>(
                Wednesday === '1' && <CheckOutlined/>
            )
        },
        {
            title: 'Thứ 5',
            dataIndex: 'Thursday',
            key: 'Thursday',
            render:(Thursday:string)=>(
                Thursday === '1' && <CheckOutlined/>
            )
        },
        {
            title: 'Thứ 6',
            dataIndex: 'Friday',
            key: 'Friday',
            render:(Friday:string)=>(
                Friday === '1' && <CheckOutlined/>
            )
        },
        {
            title: 'Thứ 7',
            dataIndex: 'Saturday',
            key: 'Saturday',
            render:(Saturday:string)=>(
                Saturday === '1' && <CheckOutlined/>
            )
        },
        {
            title: 'Chủ nhật',
            dataIndex: 'Sunday',
            key: 'Sunday',
            render:(Sunday:string)=>(
                Sunday === '1' && <CheckOutlined/>
            )
        }
    ];

    return (
      <>
      <h1 className="text-center py-3">Lịch khám trong tuần</h1>
        <Table columns={columns} dataSource={dataSource} bordered pagination={false} />
      </>
    );
};

export default ScheduleOfWeek;
