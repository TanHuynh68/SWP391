export class Clinic {
    id: number;
    name: string;
    description: string;
    address: string;
    image: string | null;
    status: number;
    owner: string | null;
    doctors: string | null;
    createAt: string;
    updateAt: string;
  
    constructor(
      id: number = 1,
      name: string = "",
      description: string = "",
      address: string = "",
      image: string | null = null,
      status: number = 2,
      owner: string | null = null,
      doctors: string | null = null,
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
  
  export class Service {
    id: number;
    status: number;
    name: string;
  
    constructor(
      id: number = 6,
      status: number = 2,
      name: string = "Nhổ răng khôn"
    ) {
      this.id = id;
      this.status = status;
      this.name = name;
    }
  }
  
  export class Role {
    // Define properties for the Role class as needed
  }
  
  export class ServiceDetail {
    id: number;
    clinics: Clinic;
    services: Service;
    role: Role;
  
    constructor(
      id: number = 1,
      clinics: Clinic = new Clinic(),
      services: Service = new Service(),
      role: Role = new Role()
    ) {
      this.id = id;
      this.clinics = clinics;
      this.services = services;
      this.role = role;
    }
  }
  