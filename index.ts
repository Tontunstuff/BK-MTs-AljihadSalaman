export type Role = 'siswa' | 'guru_bk';

export type CounselingCategory = 'belajar' | 'karir' | 'pribadi' | 'sosial';

export type CounselingType = 'tatap_muka' | 'online_chat' | 'online_call';

export type SessionStatus = 'menunggu' | 'disetujui' | 'selesai' | 'dibatalkan';

export type StudentMood = 'cemas' | 'sedih' | 'bingung' | 'marah' | 'lelah' | 'butuh_teman';

export interface Student {
  id: string;
  nisn: string;
  name: string;
  gender: 'L' | 'P';
  classGroup: string; // e.g. "7A", "8B", "9C"
  phone: string;
  avatar: string;
}

export interface Counselor {
  id: string;
  nip: string;
  name: string;
  title: string;
  school: string;
  photo: string;
  phone: string;
  bio: string;
  isAvailableToday: boolean;
  officeRoom: string;
}

export interface CounselingSession {
  id: string;
  studentId: string;
  studentName: string;
  classGroup: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "08:30 - 09:15"
  category: CounselingCategory;
  type: CounselingType;
  status: SessionStatus;
  issueSummary: string;
  counselorNotes?: string;
  attendanceConfirmed: boolean;
  followUpAction?: string;
  createdAt: string;
  roomOrLink?: string;
}

export interface CurhatItem {
  id: string;
  ticketCode: string; // e.g. "CRH-7821"
  isAnonymous: boolean;
  studentId?: string;
  studentName: string;
  classGroup?: string;
  mood: StudentMood;
  content: string;
  replyStatus: 'menunggu_tanggapan' | 'dibalas';
  counselorReply?: string;
  repliedAt?: string;
  createdAt: string;
  isUrgent?: boolean;
}

export interface ChatMessage {
  id: string;
  studentId: string;
  senderRole: Role;
  senderName: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface Article {
  id: string;
  title: string;
  category: CounselingCategory;
  excerpt: string;
  content: string;
  readTimeMinutes: number;
  author: string;
  coverImage: string;
  tags: string[];
  likes: number;
  date: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  isImportant: boolean;
  sender: string;
}

export interface CaseRecord {
  id: string;
  studentId: string;
  studentName: string;
  classGroup: string;
  date: string;
  category: CounselingCategory;
  problemSummary: string;
  counselingApproach: string; // e.g. "Konseling Realitas", "Behavioristik", "Bimbingan Karir"
  resultEvaluation: string;
  followUpPlan: string;
  status: 'dalam_pantauan' | 'selesai' | 'alih_tangan_kasus';
  confidentialityLevel: 'Rahasia' | 'Sangat Rahasia';
}
