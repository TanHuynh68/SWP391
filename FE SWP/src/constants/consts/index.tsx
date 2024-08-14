export const  statusColor = (status: number) => {
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