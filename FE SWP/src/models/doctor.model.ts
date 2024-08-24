export class Role {
    id: number;
    name: string;
  
    constructor(id: number = 0, name: string = "string") {
      this.id = id;
      this.name = name;
    }
  }
  
  export class Account {
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
      fullName: string = "string",
      password: string = "string",
      email: string = "string",
      gender: number = 0,
      image: string = "string",
      status: number = 0,
      updateAt: string = "2024-08-14T15:04:20.158Z",
      createdAt: string = "2024-08-14T15:04:20.158Z",
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
    description: string;
    account: Account;
    clinicsId: number;
  
    constructor(
      id: number = 0,
      description: string = "2024-08-14T15:04:20.158Z",
      account: Account = new Account(),
      clinicsId: number = 0
    ) {
      this.id = id;
      this.description = description;
      this.account = account;
      this.clinicsId = clinicsId;
    }
  }
  