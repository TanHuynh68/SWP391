import { User } from '@/models/user.model';
import dayjs from 'dayjs';

export const getUserDataFromLocalStorage = () => {
    const user = localStorage.getItem("user");
    const userData: User = JSON.parse(user)
    return userData;
}
export const statusColor = (status: number) => {
    switch (status) {
        case 1:
            return "red"
        case 2:
            return "green"
        case 3:
            return "purple"
    }
}

export const statusName = (status: number) => {
    switch (status) {
        case 1:
            return "Pending"
        case 2:
            return "Active"
        case 3:
            return "Inactive"
    }
}

export const bookingStatus = (status: number) => {
    switch (status) {
        case 1:
            return "Booking"
        case 2:
            return "Completed"
        case 3:
            return "Canceled"
    }
}

export const colorBookingStatus = (status: number) => {
    switch (status) {
        case 1:
            return "red"
        case 2:
            return "green"
        case 3:
            return "purple"
    }
}
export const isPastSlotTimeToday = (slot: number, workingDayOfWeek: number, selectedDate: dayjs.Dayjs) => {
    const today = dayjs();
    if (today.format('YYYY-MM-DD') !== selectedDate?.format('YYYY-MM-DD') ) {
        return false;
    }

    let slotHour, slotMinute;

    switch (slot) {
        case 1:
            slotHour = 8;
            slotMinute = 0;
            break;
        case 2:
            slotHour = 8;
            slotMinute = 45;
            break;
        case 3:
            slotHour = 9;
            slotMinute = 30;
            break;
        case 4:
            slotHour = 10;
            slotMinute = 15;
            break;
        case 5:
            slotHour = 11;
            slotMinute = 0;
            break;
        case 6:
            slotHour = 13;
            slotMinute = 0;
            break;
        case 7:
            slotHour = 13;
            slotMinute = 45;
            break;
        case 8:
            slotHour = 14;
            slotMinute = 30;
            break;
        case 9:
            slotHour = 15;
            slotMinute = 15;
            break;
        case 10:
            slotHour = 16;
            slotMinute = 0;
            break;
        default:
            return false;
    }

    const slotTime = dayjs().hour(slotHour).minute(slotMinute);
    return today.isAfter(slotTime);
};

export const slotTime = (slot: number) => {
    switch (slot) {
        case 1:
            return "8h-8h45"
        case 2:
            return "8h45-9h30"
        case 3:
            return "9h30-10h15"
        case 4:
            return "10h15-11h"
        case 5:
            return "11h-11h45"
        case 6:
            return "1h-1h45"
        case 7:
            return "1h45-2h30"
        case 8:
            return "2h30-3h15"
        case 9:
            return "3h15-4h"
        case 10:
            return "4h-4h45"
    }
}