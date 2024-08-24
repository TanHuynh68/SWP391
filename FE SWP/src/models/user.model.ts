export class User {
  id: number;
  fullName: string | null;
  password: string;
  email: string;
  gender: number | null;
  image: string;
  status: number;
  updateAt: string;
  createdAt: string;
  role: Role;
  given_name?: string;
  constructor(
    id: number = 1,
    fullName: string | null = null,
    password: string = "",
    email: string = "",
    gender: number | null = null,
    image: string | null = null,
    status: number = 2,
    updatedAt: string = "",
    given_name: string = "",
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
    this.given_name = given_name;
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
