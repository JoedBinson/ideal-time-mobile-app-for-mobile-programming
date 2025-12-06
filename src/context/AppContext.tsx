import React, { createContext, ReactNode, useContext, useState } from 'react';
import { DEFAULT_LATE_THRESHOLD_PERCENT, DEMO_CREDENTIALS } from '../utils/constants';
import {
  AttendanceRecord,
  AttendanceStatus,
  Section,
  Student,
  Subject,
  Teacher,
} from '../utils/types';

// ----------------------------------------------
// CONTEXT VALUE SHAPE
// ----------------------------------------------
interface AppContextValue {
  isLoggedIn: boolean;
  teacherProfile: Teacher | null;
  sections: Section[];
  subjects: Subject[];
  students: Student[];
  attendanceRecords: AttendanceRecord[];

  login: (username: string, password: string) => boolean;
  logout: () => void;

  setTeacherProfile: (fullName: string, profileImageUri?: string) => void;

  addSection: (name: string) => void;
  updateSection: (id: string, name: string) => void;

  addSubject: (
    sectionId: string,
    data: { name: string; dayOfWeek: string; totalClassHours: number; classStartTime: string }
  ) => void;

  updateSubject: (
    id: string,
    data: Partial<
      Pick<Subject, 'name' | 'dayOfWeek' | 'totalClassHours' | 'classStartTime' | 'lateThresholdPercent'>
    >
  ) => void;

  addStudent: (
    subjectId: string,
    data: { studentNumber: string; fullName: string; barcodeValue: string }
  ) => void;

  updateStudent: (
    id: string,
    data: Partial<Pick<Student, 'studentNumber' | 'fullName' | 'barcodeValue'>>
  ) => void;

  deleteStudent: (id: string) => void;

  recordAttendanceFromBarcode: (
    subjectId: string,
    barcodeValue: string,
    now?: Date
  ) => { success: boolean; message: string; status?: AttendanceStatus };

  getAttendanceBySubject: (subjectId: string) => AttendanceRecord[];
}

// ----------------------------------------------
// CREATE CONTEXT
// ----------------------------------------------
const AppContext = createContext<AppContextValue | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

// simple ID
const generateId = () => Math.random().toString(36).slice(2);

// ----------------------------------------------
// PROVIDER
// ----------------------------------------------
export const AppContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [teacherProfile, setTeacherProfileState] = useState<Teacher | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  // ------------------------------------------------
  // AUTH
  // ------------------------------------------------
  const login = (username: string, password: string) => {
    if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsLoggedIn(false);

  // ------------------------------------------------
  // TEACHER PROFILE
  // ------------------------------------------------
  const setTeacherProfile = (fullName: string, profileImageUri?: string) => {
    setTeacherProfileState({
      id: teacherProfile?.id ?? generateId(),
      fullName,
      profileImageUri,
    });
  };

  // ------------------------------------------------
  // SECTIONS
  // ------------------------------------------------
  const addSection = (name: string) => {
    const newSection: Section = { id: generateId(), name };
    setSections(prev => [...prev, newSection]);
  };

  const updateSection = (id: string, name: string) => {
    setSections(prev =>
      prev.map(s => (s.id === id ? { ...s, name } : s))
    );
  };

  // ------------------------------------------------
  // SUBJECTS
  // ------------------------------------------------
  const addSubject = (
    sectionId,
    { name, dayOfWeek, totalClassHours, classStartTime }
  ) => {
    const newSubject: Subject = {
      id: generateId(),
      sectionId,
      name,
      dayOfWeek,
      totalClassHours,
      classStartTime,
      lateThresholdPercent: DEFAULT_LATE_THRESHOLD_PERCENT,
    };
    setSubjects(prev => [...prev, newSubject]);
  };

  const updateSubject = (id, data) => {
    setSubjects(prev =>
      prev.map(subject =>
        subject.id === id
          ? { ...subject, ...data }
          : subject
      )
    );
  };

  // ------------------------------------------------
  // STUDENTS
  // ------------------------------------------------
  const addStudent = (subjectId, data) => {
    const newStudent: Student = {
      id: generateId(),
      subjectId,
      studentNumber: data.studentNumber,
      fullName: data.fullName,
      barcodeValue: data.barcodeValue,
    };
    setStudents(prev => [...prev, newStudent]);
  };

  const updateStudent = (id, data) => {
    setStudents(prev =>
      prev.map(s => (s.id === id ? { ...s, ...data } : s))
    );
  };

  const deleteStudent = id => {
    setStudents(prev => prev.filter(s => s.id !== id));
    setAttendanceRecords(prev => prev.filter(a => a.studentId !== id));
  };

  // ------------------------------------------------
  // ATTENDANCE LOGIC
  // ------------------------------------------------

  // Compute status safely
  const computeStatus = (subject: Subject, arrival: Date): AttendanceStatus => {
    if (!subject.classStartTime) return 'PRESENT';

    const [h, m] = subject.classStartTime.split(':').map(Number);
    const start = new Date(arrival);
    start.setHours(h, m, 0, 0);

    const diffMinutes = (arrival.getTime() - start.getTime()) / 60000;
    const totalMinutes = subject.totalClassHours * 60;
    const lateThresholdMinutes = (subject.lateThresholdPercent / 100) * totalMinutes;

    return diffMinutes <= lateThresholdMinutes ? 'PRESENT' : 'LATE';
  };

  // Helper for current date
  const todayKey = (d: Date) => d.toISOString().slice(0, 10);

  const recordAttendanceFromBarcode = (subjectId, barcodeValue, now = new Date()) => {
    const student = students.find(
      s => s.subjectId === subjectId && s.barcodeValue === barcodeValue
    );

    if (!student) {
      return { success: false, message: 'Student not found for this subject.' };
    }

    const subject = subjects.find(s => s.id === subjectId);
    if (!subject) {
      return { success: false, message: 'Subject not found.' };
    }

    const status = computeStatus(subject, now);

    const record: AttendanceRecord = {
      id: generateId(),
      subjectId,
      studentId: student.id,
      dateKey: todayKey(now),
      timestamp: now.toISOString(),
      status,
    };

    setAttendanceRecords(prev => [...prev, record]);

    return { success: true, message: 'Attendance recorded.', status };
  };

  const getAttendanceBySubject = subjectId =>
    attendanceRecords.filter(a => a.subjectId === subjectId);

  // ------------------------------------------------
  // CONTEXT VALUE
  // ------------------------------------------------
  const value: AppContextValue = {
    isLoggedIn,
    teacherProfile,
    sections,
    subjects,
    students,
    attendanceRecords,

    login,
    logout,

    setTeacherProfile,

    addSection,
    updateSection,

    addSubject,
    updateSubject,

    addStudent,
    updateStudent,
    deleteStudent,

    recordAttendanceFromBarcode,
    getAttendanceBySubject,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// ----------------------------------------------
// CUSTOM HOOK
// ----------------------------------------------
export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be inside AppContextProvider');
  return ctx;
};
