export class User {
  id: number;
  fullName: string | null;
  password: string;
  email: string;
  gender: string | null;
  image: string;
  status: number;
  updateAt: string;
  createdAt: string;
  role: Role;

  constructor(
    id: number = 1,
    fullName: string | null = null,
    password: string = "",
    email: string = "",
    gender: string | null = null,
    image: string | null = null,
    status: number = 2,
    updatedAt: string = "",
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
    this.updateAt = updatedAt;
    this.createdAt = createdAt;
    this.role = role;
  }
}

export class Role {
  id: number;
  name: string;

  constructor(id: number = 1, name: string = "ADMIN") {
    this.id = id;
    this.name = name;
  }
}
