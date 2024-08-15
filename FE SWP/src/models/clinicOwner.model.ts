export class ClinicOwner {
    id: number;
    fullName: string | null;
    password: string;
    email: string;
    gender: number;
    image: string | null;
    status: number;
    updateAt: string;
    createdAt: string;
  
    constructor(
      id: number = 1,
      fullName: string | null = null,
      password: string = "",
      email: string = "",
      gender: string | null = null,
      image: string | null = null,
      status: number = 2,
      updateAt: string = "",
      createdAt: string = ""
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
    }
  }
  