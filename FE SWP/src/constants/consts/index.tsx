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