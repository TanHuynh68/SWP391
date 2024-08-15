export class Clinic {
    id: number;
    name: string;
    description: string;
    address: string;
    image: string;
    status: number;
    owner: Owner;
    doctors: Doctor[];
    createAt: string;
    updateAt: string;
  
    constructor(
      id: number = 0,
      name: string = "",
      description: string = "",
      address: string = "",
      image: string = "",
      status: number = 0,
      owner: Owner = new Owner(),
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
  
  export class Owner {
    id: number;
    fullName: string;
    password: string;
    email: string;
    gender: number;
    image: string;
    status: number;
    updateAt: string;
    createdAt: string;
    role: Role;
  
    constructor(
      id: number = 0,
      fullName: string = "",
      password: string = "",
      email: string = "",
      gender: number = 0,
      image: string = "",
      status: number = 0,
      updateAt: string = "",
      createdAt: string = "",
      role: Role = new Role()
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
  
  export class Doctor {
    id: number;
    doB: string;
    account: Owner; // Assuming account has the same structure as Owner
  
    constructor(
      id: number = 0,
      doB: string = "",
      account: Owner = new Owner()
    ) {
      this.id = id;
      this.doB = doB;
      this.account = account;
    }
  }
  
  export class Role {
    id: number;
    name: string;
  
    constructor(id: number = 0, name: string = "string") {
      this.id = id;
      this.name = name;
    }
  }
  