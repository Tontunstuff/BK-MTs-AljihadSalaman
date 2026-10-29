import {
  Student,
  Counselor,
  CounselingSession,
  CurhatItem,
  ChatMessage,
  Article,
  Announcement,
  CaseRecord,
} from '../types';

import ibuIstiariniPhoto from '../assets/images/regenerated_image_1793012184569.jpg';

export const INITIAL_COUNSELOR: Counselor = {
  id: 'counselor_istiarini',
  nip: '19830512 200901 2 008',
  name: 'Ibu Istiarini, S.Pd.',
  title: 'Guru Bimbingan & Konseling (BK)',
  school: 'MTs Al Jihad Salaman',
  photo: ibuIstiariniPhoto,
  phone: '0812-3456-7890',
  bio: 'Ruang BK bukan tempat siswa bermasalah, melainkan sahabat bertumbuh, curhat aman, dan menemukan masa depan terbaik dunia & akhirat. Pintu BK selalu terbuka untuk kalian!',
  isAvailableToday: true,
  officeRoom: 'Ruang BK Lantai 1 (Sebelah Lab Komputer)',
};

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'std_01',
    nisn: '0098234121',
    name: 'Ahmad Fauzi',
    gender: 'L',
    classGroup: '7A',
    phone: '0857-1122-3344',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'std_02',
    nisn: '0089123445',
    name: 'Siti Nurhaliza',
    gender: 'P',
    classGroup: '8B',
    phone: '0858-9988-7766',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'std_03',
    nisn: '0078129988',
    name: 'Muhammad Rizky Pratama',
    gender: 'L',
    classGroup: '9C',
    phone: '0813-4455-6677',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'std_04',
    nisn: '0087456123',
    name: 'Dewi Anggraini',
    gender: 'P',
    classGroup: '8A',
    phone: '0821-3322-1100',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'std_05',
    nisn: '0099887766',
    name: 'Fajar Maulana',
    gender: 'L',
    classGroup: '7B',
    phone: '0878-5566-7788',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
];

export const TIME_SLOTS = [
  '08:00 - 08:45 (Jam Ke-1)',
  '08:45 - 09:30 (Jam Ke-2)',
  '10:00 - 10:45 (Setelah Istirahat I)',
  '10:45 - 11:30 (Jam Ke-5)',
  '12:30 - 13:15 (Setelah Salat Dzuhur)',
  '13:15 - 14:00 (Jam Pulang/Sore)',
];

export const INITIAL_SESSIONS: CounselingSession[] = [
  {
    id: 'ses_01',
    studentId: 'std_01',
    studentName: 'Ahmad Fauzi',
    classGroup: '7A',
    date: '2026-10-27',
    timeSlot: '10:00 - 10:45 (Setelah Istirahat I)',
    category: 'belajar',
    type: 'tatap_muka',
    status: 'menunggu',
    issueSummary: 'Sulit fokus belajar matematika dan sering tertidur saat menghafal juz amma di pondok/rumah.',
    attendanceConfirmed: false,
    createdAt: '2026-10-25 14:20',
    roomOrLink: 'Ruang BK Lantai 1',
  },
  {
    id: 'ses_02',
    studentId: 'std_03',
    studentName: 'Muhammad Rizky Pratama',
    classGroup: '9C',
    date: '2026-10-27',
    timeSlot: '12:30 - 13:15 (Setelah Salat Dzuhur)',
    category: 'karir',
    type: 'tatap_muka',
    status: 'disetujui',
    issueSummary: 'Bingung memilih antara lanjut ke MAN 1 Magelang atau SMK Jurusan RPL/Teknik Komputer.',
    attendanceConfirmed: false,
    followUpAction: 'Siapkan hasil asesmen minat bakat dan nilai rapor semester 1-4.',
    createdAt: '2026-10-24 09:15',
    roomOrLink: 'Ruang BK Lantai 1',
  },
  {
    id: 'ses_03',
    studentId: 'std_02',
    studentName: 'Siti Nurhaliza',
    classGroup: '8B',
    date: '2026-10-22',
    timeSlot: '08:45 - 09:30 (Jam Ke-2)',
    category: 'sosial',
    type: 'online_chat',
    status: 'selesai',
    issueSummary: 'Merasa dijauhi teman sebangku setelah pemilihan ketua kelas kemarin.',
    counselorNotes: 'Siswa diajak mengidentifikasi miskomunikasi dengan teman. Telah dilakukan mediasi damai.',
    attendanceConfirmed: true,
    followUpAction: 'Cek kondisi pertemanan dalam 1 minggu ke depan.',
    createdAt: '2026-10-21 16:00',
    roomOrLink: 'Chat BK Online',
  },
  {
    id: 'ses_04',
    studentId: 'std_04',
    studentName: 'Dewi Anggraini',
    classGroup: '8A',
    date: '2026-10-28',
    timeSlot: '10:45 - 11:30 (Jam Ke-5)',
    category: 'pribadi',
    type: 'tatap_muka',
    status: 'disetujui',
    issueSummary: 'Sering merasa cemas dan gemetar berlebihan jika ditunjuk guru untuk maju presentasi.',
    attendanceConfirmed: false,
    createdAt: '2026-10-25 11:10',
    roomOrLink: 'Ruang BK Lantai 1',
  },
];

export const INITIAL_CURHAT: CurhatItem[] = [
  {
    id: 'crh_01',
    ticketCode: 'CRH-8821',
    isAnonymous: true,
    studentName: 'Siswa Anonim (Dirahasiakan)',
    mood: 'cemas',
    content: 'Assalamu\'alaikum Bu Istiarini. Saya merasa tertekan karena orang tua menuntut saya harus selalu ranking 1 di kelas. Kalau ulangan dapat 85 saja saya takut pulang ke rumah. Saya tidak tahu harus cerita ke siapa lagi.',
    replyStatus: 'dibalas',
    counselorReply: 'Wa\'alaikumsalam ananda tersayang. Terima kasih sudah memberanikan diri berbagi rasa dengan Ibu di sini. Ketakutanmu sangat wajar dirasakan, tetapi ingatlah bahwa prestasimu bukan satu-satunya tolok ukur nilai dirimu di mata Allah dan orang tuamu. Ibu sangat terbuka untuk mendampingi atau memfasilitasi komunikasi yang santun dengan orang tua bila ananda berkenan. Tetap semangat ya nak, Ibu selalu ada di sini.',
    repliedAt: '2026-10-25 16:30',
    createdAt: '2026-10-24 20:15',
    isUrgent: false,
  },
  {
    id: 'crh_02',
    ticketCode: 'CRH-4192',
    isAnonymous: false,
    studentId: 'std_01',
    studentName: 'Ahmad Fauzi',
    classGroup: '7A',
    mood: 'bingung',
    content: 'Bu Istiarini, saya siswa baru kelas 7 dari SD luar Salaman. Saya merasa susah beradaptasi dengan teman-teman di MTs Al Jihad yang sudah banyak kenal sejak MI. Kadang waktu istirahat saya cuma diam di pojokan musholla.',
    replyStatus: 'menunggu_tanggapan',
    createdAt: '2026-10-26 07:15',
    isUrgent: false,
  },
  {
    id: 'crh_03',
    ticketCode: 'CRH-1034',
    isAnonymous: true,
    studentName: 'Siswa Anonim (Dirahasiakan)',
    mood: 'marah',
    content: 'Bu, ada beberapa anak di grup WA kelas yang suka membuat stiker foto teman lain tanpa izin dan diejek-ejek. Korbannya tidak berani lapor ke wali kelas karena takut makin dikucilkan.',
    replyStatus: 'menunggu_tanggapan',
    createdAt: '2026-10-26 09:30',
    isUrgent: true,
  },
];

export const INITIAL_CHATS: ChatMessage[] = [
  {
    id: 'msg_01',
    studentId: 'std_01',
    senderRole: 'guru_bk',
    senderName: 'Ibu Istiarini, S.Pd.',
    text: 'Assalamu\'alaikum Fauzi. Bagaimana kabarmu hari ini? Jika ada hal yang mengganjal dalam belajar atau ibadah, jangan sungkan sampaikan ke Ibu ya.',
    timestamp: '2026-10-25 10:00',
    isRead: true,
  },
  {
    id: 'msg_02',
    studentId: 'std_01',
    senderRole: 'siswa',
    senderName: 'Ahmad Fauzi',
    text: 'Wa\'alaikumsalam Bu Istiarini. Iya Bu, saya kemarin ada buat janji konseling untuk besok Selasa. Apa jam 10:00 Ibu tidak ada jam mengajar di kelas lain?',
    timestamp: '2026-10-25 14:22',
    isRead: true,
  },
  {
    id: 'msg_03',
    studentId: 'std_01',
    senderRole: 'guru_bk',
    senderName: 'Ibu Istiarini, S.Pd.',
    text: 'Alhamdulillah jam 10:00 Ibu di Ruang BK. Nanti setelah bel istirahat berbunyi, langsung saja mampir ke Ruang BK ya ananda Fauzi.',
    timestamp: '2026-10-25 14:35',
    isRead: true,
  },
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art_01',
    title: 'Bingung Pilih MA, SMA, atau SMK? Panduan Khusus Siswa MTs Al Jihad',
    category: 'karir',
    excerpt: 'Untuk adik-adik kelas 9 yang mulai galau menentukan langkah setelah lulus MTs, kenali perbedaan kurikulum dan potensi masa depanmu.',
    content: `Memasuki semester akhir di Madrasah Tsanawiyah seringkali memicu kegalauan: "Setelah lulus MTs Al Jihad Salaman, aku harus ke mana ya?"

Apakah sebaiknya memilih Madrasah Aliyah (MA), Sekolah Menengah Atas (SMA), Sekolah Menengah Kejuruan (SMK), atau melanjutkan mondok di Pondok Pesantren?

Berikut pertimbangan utama dari Ibu Istiarini:

1. **Madrasah Aliyah (MA / MAN):**
Sangat tepat bagi kamu yang ingin memperdalam ilmu agama Islam secara seimbang dengan sains & humaniora. Di MA, kamu tetap bisa masuk perguruan tinggi umum (Kedokteran, Teknik, IT, Hukum) maupun UIN/PTKIN ternama di dalam dan luar negeri (Al-Azhar Mesir, dll).

2. **Sekolah Menengah Kejuruan (SMK):**
Pilihan emas jika kamu memiliki minat spesifik pada ketrampilan terapan (misal: Rekayasa Perangkat Lunak, Teknik Kendaraan, Tata Busana, Animasi) dan ingin siap langsung berwirausaha atau bekerja setelah lulus, sambil tetap bisa melanjutkan kuliah.

3. **Sekolah Menengah Atas (SMA):**
Fokus pada teori akademis yang mendalam bagi ananda yang mantap ingin melanjutkan ke universitas umum.

4. **Pondok Pesantren Salaf/Modern:**
Menggembleng kemandirian, karakter akhlakul karimah, dan hafalan Al-Qur'an.

*Tips Ibu Istiarini:* Diskusikan dengan orang tua, kenali bakatmu, dan manfaatkan layanan konsultasi karir BK di sekolah kita!`,
    readTimeMinutes: 4,
    author: 'Ibu Istiarini, S.Pd.',
    coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
    tags: ['Karir', 'Studi Lanjut', 'Kelas 9', 'Masa Depan'],
    likes: 42,
    date: '24 Okt 2026',
  },
  {
    id: 'art_02',
    title: 'Manajemen Waktu: Seimbangkan Belajar MTs, Hafalan Quran & Hobi',
    category: 'belajar',
    excerpt: 'Sering merasa kehabisan waktu dan tugas menumpuk? Yuk terapkan teknik Pomodoro bernuansa Islami.',
    content: `Sebagai santri dan siswa MTs Al Jihad Salaman, ananda memiliki rutinitas yang luar biasa: pelajaran umum, mapel agama (Aqidah Akhlak, Fikih, SKI, Quran Hadis, Bahasa Arab), hingga target hafalan tahfidz.

Bagaimana agar tidak kewalahan?

1. **Jadikan Waktu Sholat Sebagai Anchor (Jangkar Waktu):**
Bagi harimu berdasarkan 5 waktu sholat. Misalnya: Ba'da Subuh untuk muroja'ah hafalan, Ba'da Ashar untuk olahraga/ekstrakurikuler, Ba'da Maghrib untuk mengulang materi sekolah.

2. **Gunakan Metode 25 Menit (Teknik Pomodoro):**
Belajarlah selama 25 menit penuh fokus tanpa memegang HP/gadget, lalu istirahat 5 menit untuk minum air putih atau peregangan. Ulangi 3 kali.

3. **Singkirkan Godaan Notifikasi Game & TikTok:**
Ketika waktu belajar tiba, simpan HP di luar kamar atau aktifkan mode fokus.

Ingat firman Allah: *"Maka apabila engkau telah selesai (dari suatu urusan), tetaplah bekerja keras (untuk urusan yang lain)"* (QS. Al-Insyirah: 7).`,
    readTimeMinutes: 3,
    author: 'Ibu Istiarini, S.Pd.',
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
    tags: ['Tips Belajar', 'Tahfidz', 'Fokus', 'Produktivitas'],
    likes: 58,
    date: '20 Okt 2026',
  },
  {
    id: 'art_03',
    title: 'Mengatasi Rasa Cemas, Overthinking, dan "Insecure" Pada Remaja',
    category: 'pribadi',
    excerpt: 'Perasaan tidak percaya diri sering menghantui usia MTs. Pahami bahwa dirimu berharga dan unik di mata Sang Pencipta.',
    content: `Pernahkah ananda merasa minder melihat teman yang lebih pintar, lebih rupawan, atau lebih populer di madrasah?

Rasa cemas dan overthinking di usia 12-15 tahun adalah fase peralihan hormon dan identitas diri yang wajar dialami. Namun jika dibiarkan, bisa membuatmu menarik diri dan enggan bergaul.

Cara mengatasinya:
- **Kurangi scrolling media sosial:** Rumput tetangga selalu terlihat lebih hijau karena orang hanya mengunggah hal terbaik mereka.
- **Tulis 3 hal yang kamu syukuri setiap malam:** Nikmat sehat, teman yang setia, dan kesempatan menuntut ilmu di MTs.
- **Berani berbicara:** Jika hatimu sesak, Ruang Curhat BK selalu ada untukmu tanpa menghakimi.`,
    readTimeMinutes: 4,
    author: 'Ibu Istiarini, S.Pd.',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
    tags: ['Kesehatan Mental', 'Percaya Diri', 'Self-Love', 'Remaja'],
    likes: 73,
    date: '15 Okt 2026',
  },
  {
    id: 'art_04',
    title: 'Stop Bullying & Cyberbullying di Lingkungan Madrasah Kita',
    category: 'sosial',
    excerpt: 'Candaan yang membuat orang lain menangis atau takut bukan lagi lelucon, melainkan perundungan. Jadilah pelindung temanmu!',
    content: `MTs Al Jihad Salaman menjunjung tinggi nilai Ukhuwah Islamiyah (Persaudaraan Islam). Seringkali ejekan julukan fisik atau membuat meme foto teman di grup WhatsApp dianggap "hanya bercanda", padahal menyisakan luka psikis mendalam bagi korbannya.

Mari jadi siswa MTs yang hebat:
- Berani mengingatkan teman yang bercanda kelewat batas.
- Rangkul teman yang tampak menyendiri.
- Laporkan secara rahasia via fitur Curhat Anonim BK Online jika kamu melihat perundungan.`,
    readTimeMinutes: 3,
    author: 'Ibu Istiarini, S.Pd.',
    coverImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80',
    tags: ['Anti Bullying', 'Ukhuwah', 'Pertemanan', 'Adab'],
    likes: 89,
    date: '10 Okt 2026',
  },
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann_01',
    title: 'Jadwal Layanan Konseling Pekan Ini & Ruang Curhat Dibuka',
    content: 'Assalamu\'alaikum anak-anakku. Selama pekan asesmen madrasah, Ruang BK tetap melayani konsultasi tatap muka dan konseling daring. Jangan memendam masalah sendirian ya!',
    date: '26 Okt 2026',
    isImportant: true,
    sender: 'Ibu Istiarini, Guru BK',
  },
  {
    id: 'ann_02',
    title: 'Pendaftaran Tes Minat Bakat Siswa Kelas 9',
    content: 'Bagi seluruh siswa kelas 9 MTs Al Jihad Salaman, pengisian instrumen peminatan studi lanjut MA/SMA/SMK akan dimulai awal bulan depan. Siapkan diri kalian!',
    date: '22 Okt 2026',
    isImportant: false,
    sender: 'Ibu Istiarini, Guru BK',
  },
];

export const INITIAL_CASE_RECORDS: CaseRecord[] = [
  {
    id: 'case_01',
    studentId: 'std_01',
    studentName: 'Ahmad Fauzi',
    classGroup: '7A',
    date: '2026-10-21',
    category: 'belajar',
    problemSummary: 'Kesulitan konsentrasi pada jam-jam pelajaran siang dan belum terbiasa dengan ritme tugas hafalan.',
    counselingApproach: 'Konseling Individual dengan Teknik Restrukturisasi Kognitif dan Kontrak Belajar Mandiri.',
    resultEvaluation: 'Siswa kooperatif, bersedia membuat jadwal harian tertulis dan menempelkannya di meja belajar.',
    followUpPlan: 'Evaluasi jadwal belajar pada pertemuan lanjutan tanggal 27 Oktober 2026.',
    status: 'dalam_pantauan',
    confidentialityLevel: 'Rahasia',
  },
  {
    id: 'case_02',
    studentId: 'std_02',
    studentName: 'Siti Nurhaliza',
    classGroup: '8B',
    date: '2026-10-22',
    category: 'sosial',
    problemSummary: 'Miskomunikasi dengan teman sebangku terkait pemilihan kepengurusan kelas yang sempat memicu saling diam.',
    counselingApproach: 'Mediasi Teman Sebaya & Bimbingan Komunikasi Asertif.',
    resultEvaluation: 'Kedua belah pihak saling meminta maaf dan sepakat untuk fokus kembali pada tugas kelompok.',
    followUpPlan: 'Pantau keharmonisan kelas melalui laporan berkala wali kelas 8B.',
    status: 'selesai',
    confidentialityLevel: 'Rahasia',
  },
  {
    id: 'case_03',
    studentId: 'std_03',
    studentName: 'Muhammad Rizky Pratama',
    classGroup: '9C',
    date: '2026-10-24',
    category: 'karir',
    problemSummary: 'Perbedaan keinginan antara siswa (ingin masuk SMK RPL) dengan orang tua (menginginkan masuk Pesantren Tahfidz).',
    counselingApproach: 'Konseling Karir Kolaboratif & Pendekatan Parenting Konseling.',
    resultEvaluation: 'Siswa memahami sudut pandang orang tua. Ditemukan alternatif: MA Kejuruan dengan program tahfidz & IT terpadu.',
    followUpPlan: 'Rencana pertemuan konseling keluarga bersama orang tua pada hari Sabtu depan.',
    status: 'dalam_pantauan',
    confidentialityLevel: 'Sangat Rahasia',
  },
];
