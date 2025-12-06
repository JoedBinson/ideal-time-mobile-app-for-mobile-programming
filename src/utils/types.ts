// Status for each attendance record
export type AttendanceStatus = 'PRESENT' | 'LATE' | 'ABSENT';

export interface Teacher {
  id: string;
  fullName: string;
  profileImageUri?: string;
}

export interface Section {
  id: string;
  name: string; // e.g. "BSIT-2A"
}

export interface Subject {
  id: string;
  sectionId: string;
  name: string;
  dayOfWeek: string; // e.g. "Monday"
  totalClassHours: number; // e.g. 3
  lateThresholdPercent: number; // e.g. 15
  classStartTime: string; // e.g. "08:00" in 24h format
}

export interface Student {
  id: string;
  subjectId: string;
  studentNumber: string; // 2021301334
  fullName: string; // "LastName, FirstName MI"
  barcodeValue: string; // raw barcode string
}

export interface AttendanceRecord {
  id: string;
  subjectId: string;
  studentId: string;
  dateKey: string; // "YYYY-MM-DD"
  timestamp: string; // ISO string
  status: AttendanceStatus;
}
