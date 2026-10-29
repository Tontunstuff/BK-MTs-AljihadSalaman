import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Role,
  Student,
  Counselor,
  CounselingSession,
  CurhatItem,
  ChatMessage,
  Article,
  Announcement,
  CaseRecord,
  CounselingCategory,
  CounselingType,
  StudentMood,
} from '../types';
import {
  INITIAL_COUNSELOR,
  INITIAL_STUDENTS,
  INITIAL_SESSIONS,
  INITIAL_CURHAT,
  INITIAL_CHATS,
  INITIAL_ARTICLES,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_CASE_RECORDS,
} from '../data/mockData';

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  activeStudent: Student;
  setActiveStudent: (student: Student) => void;
  students: Student[];
  counselor: Counselor;
  sessions: CounselingSession[];
  curhatList: CurhatItem[];
  chatMessages: ChatMessage[];
  articles: Article[];
  announcements: Announcement[];
  caseRecords: CaseRecord[];
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
  showDocModal: boolean;
  setShowDocModal: (val: boolean) => void;

  // Actions
  bookSession: (data: {
    category: CounselingCategory;
    type: CounselingType;
    date: string;
    timeSlot: string;
    issueSummary: string;
  }) => CounselingSession;
  updateSessionStatus: (
    sessionId: string,
    status: 'disetujui' | 'selesai' | 'dibatalkan',
    counselorNotes?: string,
    followUpAction?: string
  ) => void;
  confirmAttendance: (sessionId: string) => void;

  submitCurhat: (data: {
    isAnonymous: boolean;
    mood: StudentMood;
    content: string;
    isUrgent?: boolean;
  }) => { item: CurhatItem; ticketCode: string };
  replyCurhat: (curhatId: string, replyText: string) => void;

  sendChatMessage: (text: string, overrideRole?: Role) => void;
  addAnnouncement: (title: string, content: string, isImportant: boolean) => void;
  addCaseRecord: (record: Omit<CaseRecord, 'id'>) => void;
  likeArticle: (articleId: string) => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SESSIONS: 'bk_mts_sessions_v1',
  CURHAT: 'bk_mts_curhat_v1',
  CHATS: 'bk_mts_chats_v1',
  ARTICLES: 'bk_mts_articles_v1',
  ANNOUNCEMENTS: 'bk_mts_announcements_v1',
  CASES: 'bk_mts_cases_v1',
  ROLE: 'bk_mts_role_v1',
  STUDENT_ID: 'bk_mts_student_id_v1',
  VIEW_MODE: 'bk_mts_view_mode_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<Role>(() => {
    return (localStorage.getItem(STORAGE_KEYS.ROLE) as Role) || 'siswa';
  });

  const [students] = useState<Student[]>(INITIAL_STUDENTS);
  const [counselor] = useState<Counselor>(INITIAL_COUNSELOR);

  const [activeStudent, setActiveStudentState] = useState<Student>(() => {
    const savedId = localStorage.getItem(STORAGE_KEYS.STUDENT_ID);
    const found = INITIAL_STUDENTS.find((s) => s.id === savedId);
    return found || INITIAL_STUDENTS[0];
  });

  const [sessions, setSessions] = useState<CounselingSession[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    return saved ? JSON.parse(saved) : INITIAL_SESSIONS;
  });

  const [curhatList, setCurhatList] = useState<CurhatItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURHAT);
    return saved ? JSON.parse(saved) : INITIAL_CURHAT;
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CHATS);
    return saved ? JSON.parse(saved) : INITIAL_CHATS;
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ARTICLES);
    return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [caseRecords, setCaseRecords] = useState<CaseRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CASES);
    return saved ? JSON.parse(saved) : INITIAL_CASE_RECORDS;
  });

  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.VIEW_MODE);
    return saved !== null ? saved === 'true' : false;
  });

  const [showDocModal, setShowDocModal] = useState<boolean>(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STUDENT_ID, activeStudent.id);
  }, [activeStudent]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURHAT, JSON.stringify(curhatList));
  }, [curhatList]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(caseRecords));
  }, [caseRecords]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VIEW_MODE, String(isMobileFrame));
  }, [isMobileFrame]);

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
  };

  const setActiveStudent = (student: Student) => {
    setActiveStudentState(student);
  };

  // Booking action
  const bookSession = (data: {
    category: CounselingCategory;
    type: CounselingType;
    date: string;
    timeSlot: string;
    issueSummary: string;
  }): CounselingSession => {
    const newSession: CounselingSession = {
      id: `ses_${Date.now()}`,
      studentId: activeStudent.id,
      studentName: activeStudent.name,
      classGroup: activeStudent.classGroup,
      date: data.date,
      timeSlot: data.timeSlot,
      category: data.category,
      type: data.type,
      status: 'menunggu',
      issueSummary: data.issueSummary,
      attendanceConfirmed: false,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      roomOrLink: data.type === 'tatap_muka' ? 'Ruang BK Lantai 1 MTs Al Jihad' : 'Chat & Video Call BK Online',
    };

    setSessions((prev) => [newSession, ...prev]);
    return newSession;
  };

  const updateSessionStatus = (
    sessionId: string,
    status: 'disetujui' | 'selesai' | 'dibatalkan',
    counselorNotes?: string,
    followUpAction?: string
  ) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === sessionId) {
          return {
            ...s,
            status,
            counselorNotes: counselorNotes !== undefined ? counselorNotes : s.counselorNotes,
            followUpAction: followUpAction !== undefined ? followUpAction : s.followUpAction,
          };
        }
        return s;
      })
    );
  };

  const confirmAttendance = (sessionId: string) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === sessionId) {
          return {
            ...s,
            attendanceConfirmed: true,
            status: 'selesai',
          };
        }
        return s;
      })
    );
  };

  // Curhat action
  const submitCurhat = (data: {
    isAnonymous: boolean;
    mood: StudentMood;
    content: string;
    isUrgent?: boolean;
  }) => {
    const randomTicket = `CRH-${Math.floor(1000 + Math.random() * 9000)}`;
    const newItem: CurhatItem = {
      id: `crh_${Date.now()}`,
      ticketCode: randomTicket,
      isAnonymous: data.isAnonymous,
      studentId: data.isAnonymous ? undefined : activeStudent.id,
      studentName: data.isAnonymous ? 'Siswa Anonim (Dirahasiakan)' : activeStudent.name,
      classGroup: data.isAnonymous ? undefined : activeStudent.classGroup,
      mood: data.mood,
      content: data.content,
      replyStatus: 'menunggu_tanggapan',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      isUrgent: data.isUrgent || false,
    };

    setCurhatList((prev) => [newItem, ...prev]);
    return { item: newItem, ticketCode: randomTicket };
  };

  const replyCurhat = (curhatId: string, replyText: string) => {
    setCurhatList((prev) =>
      prev.map((item) => {
        if (item.id === curhatId) {
          return {
            ...item,
            replyStatus: 'dibalas',
            counselorReply: replyText,
            repliedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
          };
        }
        return item;
      })
    );
  };

  // Chat action
  const sendChatMessage = (text: string, overrideRole?: Role) => {
    const senderRole = overrideRole || role;
    const senderName = senderRole === 'guru_bk' ? counselor.name : activeStudent.name;

    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      studentId: activeStudent.id,
      senderRole,
      senderName,
      text,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      isRead: senderRole === 'guru_bk',
    };

    setChatMessages((prev) => [...prev, newMsg]);

    // Simulated gentle auto-reply from Ibu Istiarini if student chats and currently in student role
    if (senderRole === 'siswa') {
      setTimeout(() => {
        const autoReplies = [
          `Wa'alaikumsalam ananda ${activeStudent.name}. Pesan ananda sudah Ibu terima dengan baik. Ibu senang ananda mau bercerita. Jika mendesak, silakan langsung pesan jadwal konseling ya.`,
          `Terima kasih sudah menghubungi Ibu ya nak. Catatan ini sudah masuk ke agenda BK Ibu. Tetap tenang dan jangan lupa berdoa ya.`,
          `Assalamu'alaikum ananda. Jangan khawatir, apapun yang ananda rasakan, Ruang BK selalu menjaga kerahasiaan. Mari kita cari solusinya bersama.`,
        ];
        const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];

        const counselorReplyMsg: ChatMessage = {
          id: `msg_reply_${Date.now()}`,
          studentId: activeStudent.id,
          senderRole: 'guru_bk',
          senderName: counselor.name,
          text: randomReply,
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          isRead: false,
        };
        setChatMessages((p) => [...p, counselorReplyMsg]);
      }, 1400);
    }
  };

  const addAnnouncement = (title: string, content: string, isImportant: boolean) => {
    const newAnn: Announcement = {
      id: `ann_${Date.now()}`,
      title,
      content,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      isImportant,
      sender: counselor.name,
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
  };

  const addCaseRecord = (record: Omit<CaseRecord, 'id'>) => {
    const newCase: CaseRecord = {
      ...record,
      id: `case_${Date.now()}`,
    };
    setCaseRecords((prev) => [newCase, ...prev]);
  };

  const likeArticle = (articleId: string) => {
    setArticles((prev) =>
      prev.map((art) => (art.id === articleId ? { ...art, likes: art.likes + 1 } : art))
    );
  };

  const resetAllData = () => {
    localStorage.removeItem(STORAGE_KEYS.SESSIONS);
    localStorage.removeItem(STORAGE_KEYS.CURHAT);
    localStorage.removeItem(STORAGE_KEYS.CHATS);
    localStorage.removeItem(STORAGE_KEYS.ARTICLES);
    localStorage.removeItem(STORAGE_KEYS.ANNOUNCEMENTS);
    localStorage.removeItem(STORAGE_KEYS.CASES);
    setSessions(INITIAL_SESSIONS);
    setCurhatList(INITIAL_CURHAT);
    setChatMessages(INITIAL_CHATS);
    setArticles(INITIAL_ARTICLES);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setCaseRecords(INITIAL_CASE_RECORDS);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        activeStudent,
        setActiveStudent,
        students,
        counselor,
        sessions,
        curhatList,
        chatMessages,
        articles,
        announcements,
        caseRecords,
        isMobileFrame,
        setIsMobileFrame,
        showDocModal,
        setShowDocModal,
        bookSession,
        updateSessionStatus,
        confirmAttendance,
        submitCurhat,
        replyCurhat,
        sendChatMessage,
        addAnnouncement,
        addCaseRecord,
        likeArticle,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
