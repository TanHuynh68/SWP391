export class Role {
    id: number;
    name: string;

    constructor(id: number = 0, name: string = "") {
        this.id = id;
        this.name = name;
    }
}

export class Account {
    id: number;
    fullName: string;
    password: string;
    email: string;
    gender: number; // Assuming gender is represented by a number
    image: string | null;
    status: number;
    updateAt: string;
    createdAt: string;
    role: Role | null;

    constructor(
        id: number = 0,
        fullName: string = "",
        password: string = "",
        email: string = "",
        gender: number = 0,
        image: string | null = null,
        status: number = 2,
        updateAt: string = "",
        createdAt: string = "",
        role: Role | null = null
    ) {
        this.id = id;
        this.fullName = fullName;
        this.password = password;
        this.email = email;
        this.gender = gender;
        this.image = image;
        this.status = status;
        this.updateAt = updateAt;
        this.createdAt = createdAt;
        this.role = role;
    }
}

export class Slot {
    id: number;
    status: number;
    slotTime: number;

    constructor(id: number = 0, status: number = 0, slotTime: number = 0) {
        this.id = id;
        this.status = status;
        this.slotTime = slotTime;
    }
}

export class Clinic {
    id: number;
    name: string;
    description: string | null;
    address: string;
    image: string | null;
    status: number;
    owner: Account;
    doctors: Doctor[];
    createAt: string;
    updateAt: string;

    constructor(
        id: number = 0,
        name: string = "",
        description: string | null = null,
        address: string = "",
        image: string | null = null,
        status: number = 2,
        owner: Account = new Account(),
        doctors: Doctor[] = [],
        createAt: string = "",
        updateAt: string = ""
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.address = address;
        this.image = image;
        this.status = status;
        this.owner = owner;
        this.doctors = doctors;
        this.createAt = createAt;
        this.updateAt = updateAt;
    }
}

export class Doctor {
    id: number;
    description: string | null;
    account: Account;
    clinicsId: number;

    constructor(
        id: number = 0,
        description: string | null = null,
        account: Account = new Account(),
        clinicsId: number = 0
    ) {
        this.id = id;
        this.description = description;
        this.account = account;
        this.clinicsId = clinicsId;
    }
}

export class ClinicsService {
    id: number;
    clinics: Clinic | null;
    services: Service;

    constructor(
        id: number = 0,
        clinics: Clinic | null = null,
        services: Service = new Service()
    ) {
        this.id = id;
        this.clinics = clinics;
        this.services = services;
    }
}

export class Service {
    id: number;
    status: number;
    name: string;

    constructor(id: number = 0, status: number = 2, name: string = "") {
        this.id = id;
        this.status = status;
        this.name = name;
    }
}

export class Customer {
    id: number;
    phone: string;
    doB: string;
    address: string;
    account: Account;

    constructor(
        id: number = 0,
        phone: string = "",
        doB: string = "",
        address: string = "",
        account: Account = new Account()
    ) {
        this.id = id;
        this.phone = phone;
        this.doB = doB;
        this.address = address;
        this.account = account;
    }
}

export interface Medicine {
    id: number;
    name: string;
    quatity: number;
    detail: string;
}

export class Booking {
    id: number;
    status: number;
    slot: Slot;
    type: number;
    createAt: string;
    updateAt: string;
    bookingDate: string;
    customer: Customer;
    doctor: Doctor | null;
    clinicsService: ClinicsService;
    bookingAddress: string;
    bookingName: string;
    result: string | null;
    medicines: Medicine[];
    reason: string | null;
    constructor(
        id: number = 0,
        status: number = 0,
        slot: Slot = new Slot(),
        type: number = 0,
        createAt: string = "",
        updateAt: string = "",
        bookingDate: string = "",
        customer: Customer = new Customer(),
        doctor: Doctor | null = null,
        clinicsService: ClinicsService = new ClinicsService(),
        bookingAddress: string = "",
        bookingName: string = "",
        result: string | null = null,
        medicines: Medicine[] = [],
        reason: string | null = null,
    ) {
        this.id = id;
        this.status = status;
        this.slot = slot;
        this.type = type;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.bookingDate = bookingDate;
        this.customer = customer;
        this.doctor = doctor;
        this.clinicsService = clinicsService;
        this.bookingAddress = bookingAddress;
        this.bookingName = bookingName;
        this.result = result;
        this.reason = reason;
        this.medicines = medicines;
    }
}
