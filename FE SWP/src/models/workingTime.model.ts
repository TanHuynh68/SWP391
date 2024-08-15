import { User } from "./user.model";

export class Slot {
    id: number;
    status: number;
    slotTime: number;
  
    constructor(id: number = 1, status: number = 2, slotTime: number = 1) {
      this.id = id;
      this.status = status;
      this.slotTime = slotTime;
    }
  }
  
  export class Doctor {
    id: number;
    doB: string;
    account: User | null;  // Liên kết với User hoặc null nếu không có
    clinicsId: number;
  
    constructor(id: number = 1, doB: string = "", account: User | null = null, clinicsId: number = 5) {
      this.id = id;
      this.doB = doB;
      this.account = account;
      this.clinicsId = clinicsId;
    }
  }
  
  export class WorkingTime {
    id: number;
    status: number;
    doctor: Doctor;
    workingDayOfWeek: number;
    slot: Slot;
  
    constructor(
      id: number = 3,
      status: number = 2,
      doctor: Doctor = new Doctor(),
      workingDayOfWeek: number = 2,
      slot: Slot = new Slot()
    ) {
      this.id = id;
      this.status = status;
      this.doctor = doctor;
      this.workingDayOfWeek = workingDayOfWeek;
      this.slot = slot;
    }
  }
  