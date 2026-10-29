import React, { useState } from 'react';
import {
  Database,
  Layers,
  ShieldCheck,
  Smartphone,
  Code2,
  Workflow,
  X,
  Copy,
  Check,
  FileText,
  Server,
  KeyRound,
  Download,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureDocModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'flow' | 'database' | 'roles' | 'tech' | 'code'>('flow');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const sqlSchemaCode = `-- ==========================================================
-- SKEMA DATABASE RELASIONAL (PostgreSQL / MySQL)
-- SISTEM BIMBINGAN DAN KONSELING (BK) MTs AL JIHAD SALAMAN
-- GURU BK: IBU ISTIARINI, S.Pd.
-- ==========================================================

-- 1. Tabel Siswa (Target Pengguna Mobile)
CREATE TABLE siswa (
    id VARCHAR(36) PRIMARY KEY,
    nisn VARCHAR(10) UNIQUE NOT NULL,
    nama_lengkap VARCHAR(150) NOT NULL,
    jenis_kelamin VARCHAR(1) CHECK (jenis_kelamin IN ('L', 'P')),
    kelas VARCHAR(10) NOT NULL,              -- Contoh: '7A', '8B', '9C'
    no_whatsapp VARCHAR(20),
    foto_profil VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabel Guru BK (Konselor Sekolah)
CREATE TABLE guru_bk (
    id VARCHAR(36) PRIMARY KEY,
    nip VARCHAR(30) UNIQUE NOT NULL,
    nama_lengkap VARCHAR(150) NOT NULL,
    gelar VARCHAR(50),
    jabatan VARCHAR(100) DEFAULT 'Guru Bimbingan & Konseling',
    sekolah VARCHAR(100) DEFAULT 'MTs Al Jihad Salaman',
    ruang_kantor VARCHAR(100),
    is_aktif BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabel Jadwal & Sesi Konseling (Booking Online/Offline)
CREATE TABLE jadwal_konseling (
    id VARCHAR(36) PRIMARY KEY,
    siswa_id VARCHAR(36) REFERENCES siswa(id) ON DELETE CASCADE,
    guru_bk_id VARCHAR(36) REFERENCES guru_bk(id),
    tanggal_sesi DATE NOT NULL,
    jam_slot VARCHAR(50) NOT NULL,            -- e.g. '10:00 - 10:45 (Istirahat I)'
    bidang_bimbingan VARCHAR(20) CHECK (
        bidang_bimbingan IN ('belajar', 'karir', 'pribadi', 'sosial')
    ),
    tipe_layanan VARCHAR(20) CHECK (
        tipe_layanan IN ('tatap_muka', 'online_chat', 'online_call')
    ),
    status_persetujuan VARCHAR(20) DEFAULT 'menunggu' CHECK (
        status_persetujuan IN ('menunggu', 'disetujui', 'selesai', 'dibatalkan')
    ),
    deskripsi_masalah TEXT NOT NULL,
    lokasi_atau_tautan VARCHAR(255),
    konfirmasi_kehadiran BOOLEAN DEFAULT FALSE,
    catatan_guru_bk TEXT,
    tindak_lanjut TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabel Kotak Curhat & Konsultasi Anonim (Ruang Curhat Rahasia)
CREATE TABLE curhat_anonim (
    id VARCHAR(36) PRIMARY KEY,
    kode_tiket VARCHAR(20) UNIQUE NOT NULL,    -- Token unik e.g. 'CRH-8821'
    is_anonim BOOLEAN DEFAULT TRUE,
    siswa_id VARCHAR(36) REFERENCES siswa(id) ON DELETE SET NULL,
    mood_siswa VARCHAR(20) CHECK (
        mood_siswa IN ('cemas', 'sedih', 'bingung', 'marah', 'lelah', 'butuh_teman')
    ),
    isi_curhat TEXT NOT NULL,
    status_tanggapan VARCHAR(20) DEFAULT 'menunggu_tanggapan' CHECK (
        status_tanggapan IN ('menunggu_tanggapan', 'dibalas')
    ),
    balasan_guru_bk TEXT,
    is_darurat BOOLEAN DEFAULT FALSE,         -- Indikator kasus urgent/bullying
    dibalas_pada TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tabel Pesan Chat Interaktif (One-on-One Siswa & Guru BK)
CREATE TABLE pesan_chat (
    id VARCHAR(36) PRIMARY KEY,
    siswa_id VARCHAR(36) REFERENCES siswa(id) ON DELETE CASCADE,
    pengirim_role VARCHAR(10) CHECK (pengirim_role IN ('siswa', 'guru_bk')),
    isi_pesan TEXT NOT NULL,
    is_dibaca BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Tabel Rekam Kasus & Log Bimbingan Rahasia (Konselor Internal Log)
CREATE TABLE rekam_kasus_bk (
    id VARCHAR(36) PRIMARY KEY,
    siswa_id VARCHAR(36) REFERENCES siswa(id) ON DELETE CASCADE,
    guru_bk_id VARCHAR(36) REFERENCES guru_bk(id),
    tanggal_pencatatan DATE NOT NULL,
    bidang_bimbingan VARCHAR(20) NOT NULL,
    ringkasan_kasus TEXT NOT NULL,
    pendekatan_konseling VARCHAR(150),       -- e.g. 'Konseling Realitas / Asertif'
    evaluasi_hasil TEXT,
    rencana_tindak_lanjut TEXT,
    status_kasus VARCHAR(30) CHECK (
        status_kasus IN ('dalam_pantauan', 'selesai', 'alih_tangan_kasus')
    ),
    tingkat_kerahasiaan VARCHAR(20) DEFAULT 'Rahasia',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Tabel Artikel & Edukasi Motivasi
CREATE TABLE artikel_edukasi (
    id VARCHAR(36) PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    kategori VARCHAR(20) NOT NULL,
    ringkasan TEXT,
    konten_lengkap TEXT NOT NULL,
    penulis VARCHAR(100) DEFAULT 'Ibu Istiarini, S.Pd.',
    jumlah_suka INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-4xl max-h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-emerald-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-700 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <Database className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                  Blueprint Lengkap
                </span>
                <span className="text-xs text-emerald-200">MTs Al Jihad Salaman</span>
              </div>
              <h2 className="text-lg font-bold">Rancangan Arsitektur, Alur & Database BK Online</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50 px-6 py-2 gap-2 text-sm font-medium">
          <button
            onClick={() => setActiveTab('flow')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'flow'
                ? 'bg-emerald-700 text-white shadow-sm shadow-emerald-700/20'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Workflow className="w-4 h-4" />
            <span>1. User Flow & Alur</span>
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'database'
                ? 'bg-emerald-700 text-white shadow-sm shadow-emerald-700/20'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>2. Struktur Database (SQL)</span>
          </button>
          <button
            onClick={() => setActiveTab('roles')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'roles'
                ? 'bg-emerald-700 text-white shadow-sm shadow-emerald-700/20'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>3. Hak Akses & Keamanan</span>
          </button>
          <button
            onClick={() => setActiveTab('tech')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'tech'
                ? 'bg-emerald-700 text-white shadow-sm shadow-emerald-700/20'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>4. Rekomendasi Stack & PWA</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'code'
                ? 'bg-emerald-700 text-white shadow-sm shadow-emerald-700/20'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>5. Contoh Kode Frontend</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-700 text-sm">
          {/* TAB 1: USER FLOW */}
          {activeTab === 'flow' && (
            <div className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                <h3 className="font-bold text-emerald-900 text-base mb-1">
                  Konsep Alur Pengguna (User Flow)
                </h3>
                <p className="text-emerald-800 text-xs leading-relaxed">
                  Dirancang khusus untuk karakteristik siswa Madrasah Tsanawiyah (usia 12-15 tahun) yang membutuhkan antarmuka ramah jempol, tidak mengintimidasi, dan menjamin rasa aman (terutama untuk siswa pemalu).
                </p>
              </div>

              {/* Grid 2 Columns: Alur Siswa vs Alur Guru BK */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Siswa Flow */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center space-x-2 text-emerald-700 font-bold pb-2 border-b">
                    <Smartphone className="w-5 h-5" />
                    <h4>Alur Siswa (Smartphone / Mobile-First)</h4>
                  </div>
                  <ol className="space-y-3 relative border-l-2 border-emerald-200 pl-4 ml-2">
                    <li className="relative">
                      <span className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white"></span>
                      <p className="font-semibold text-slate-800">1. Masuk Praktis (NISN / Pilih Nama)</p>
                      <p className="text-xs text-slate-500">Siswa tidak perlu password rumit; cukup masukkan NISN atau scan token ringan sekolah.</p>
                    </li>
                    <li className="relative">
                      <span className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white"></span>
                      <p className="font-semibold text-slate-800">2. Beranda Sambutan Hangat</p>
                      <p className="text-xs text-slate-500">Melihat sapaan Ibu Istiarini, status ketersediaan BK, quote Islami hari ini, dan jadwal aktif.</p>
                    </li>
                    <li className="relative">
                      <span className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white"></span>
                      <p className="font-semibold text-slate-800">3. Pilih Layanan yang Dibutuhkan:</p>
                      <ul className="text-xs text-slate-600 list-disc ml-4 space-y-1 mt-1">
                        <li><strong>Booking Konseling:</strong> Pilih tanggal, jam istirahat/pulang, dan tatap muka atau online chat.</li>
                        <li><strong>Curhat Anonim:</strong> Tulis uneg-uneg tanpa nama, dapatkan kode tiket tiket unik (e.g. #CRH-8821).</li>
                        <li><strong>Chat Langsung:</strong> Kirim pertanyaan cepat ke Ibu Istiarini.</li>
                        <li><strong>Artikel Edukasi:</strong> Baca tips belajar & peminatan MA/SMA/SMK.</li>
                      </ul>
                    </li>
                    <li className="relative">
                      <span className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white"></span>
                      <p className="font-semibold text-slate-800">4. Notifikasi & Konfirmasi Kehadiran</p>
                      <p className="text-xs text-slate-500">Siswa mendapat kepastian jadwal dan tombol konfirmasi kehadiran saat sesi telah terlaksana.</p>
                    </li>
                  </ol>
                </div>

                {/* Guru BK Flow */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center space-x-2 text-teal-700 font-bold pb-2 border-b">
                    <Layers className="w-5 h-5" />
                    <h4>Alur Guru BK (Ibu Istiarini)</h4>
                  </div>
                  <ol className="space-y-3 relative border-l-2 border-teal-200 pl-4 ml-2">
                    <li className="relative">
                      <span className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-teal-600 border-2 border-white"></span>
                      <p className="font-semibold text-slate-800">1. Login Dashboard Manajemen</p>
                      <p className="text-xs text-slate-500">Login dengan NIP / Akun Guru BK untuk akses data terenkripsi dan rahasia.</p>
                    </li>
                    <li className="relative">
                      <span className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-teal-600 border-2 border-white"></span>
                      <p className="font-semibold text-slate-800">2. Review Booking Masuk</p>
                      <p className="text-xs text-slate-500">Melihat daftar permohonan konseling: Setujui (Approve), Ubah Jam, atau Tambah Catatan Ruangan.</p>
                    </li>
                    <li className="relative">
                      <span className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-teal-600 border-2 border-white"></span>
                      <p className="font-semibold text-slate-800">3. Menanggapi Curhat Anonim</p>
                      <p className="text-xs text-slate-500">Membaca pesan siswa pemalu, menandai urgensi kasus (urgent/bullying), dan memberikan balasan penuh empati ke tiket tersebut.</p>
                    </li>
                    <li className="relative">
                      <span className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-teal-600 border-2 border-white"></span>
                      <p className="font-semibold text-slate-800">4. Dokumentasi Log Kasus & Rekap Bulanan</p>
                      <p className="text-xs text-slate-500">Mencatat evaluasi bimbingan, tindak lanjut, dan mengunduh laporan rekapitulasi BK bulanan resmi untuk Kepala Madrasah.</p>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DATABASE */}
          {activeTab === 'database' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-800 text-base">Skema Relasional Database (PostgreSQL / MySQL)</h3>
                  <p className="text-xs text-slate-500">Dirancang normalized, mendukung relasi Foreign Key, index cepat untuk NISN, dan keamanan data konseling.</p>
                </div>
                <button
                  onClick={() => copyToClipboard(sqlSchemaCode, 'sql')}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                >
                  {copiedSection === 'sql' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin SQL DDL</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner">
                <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed max-h-[420px]">
                  {sqlSchemaCode}
                </pre>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-slate-50 border rounded-xl">
                  <p className="font-bold text-xs text-slate-800">🔒 Kerahasiaan Curhat</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Pada tabel <code>curhat_anonim</code>, kolom <code>siswa_id</code> dapat bernilai NULL jika opsi anonim diaktifkan, sehingga identitas siswa tidak terekam sama sekali.
                  </p>
                </div>
                <div className="p-3 bg-slate-50 border rounded-xl">
                  <p className="font-bold text-xs text-slate-800">⚡ Indeks Kinerja</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Indeks cepat pada <code>nisn</code> dan <code>kode_tiket</code> memungkinkan verifikasi kilat dari smartphone bersinyal minim.
                  </p>
                </div>
                <div className="p-3 bg-slate-50 border rounded-xl">
                  <p className="font-bold text-xs text-slate-800">📊 Rekapitulasi Otomatis</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Pengelompokan per <code>bidang_bimbingan</code> (Belajar, Karir, Pribadi, Sosial) memudahkan export laporan bulanan Madrasah.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ROLES */}
          {activeTab === 'roles' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 text-base">Matriks Hak Akses (Role-Based Access Control)</h3>
              <p className="text-xs text-slate-500">
                Pemisahan hak akses yang ketat sesuai kode etik Bimbingan & Konseling (asas kerahasiaan siswa).
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <th className="p-3">Fitur / Entitas</th>
                      <th className="p-3 text-center">Siswa MTs</th>
                      <th className="p-3 text-center">Guru BK (Ibu Istiarini)</th>
                      <th className="p-3">Keterangan Asas Kerahasiaan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">Booking Jadwal Konseling</td>
                      <td className="p-3 text-center text-emerald-600 font-bold">✓ Buat & Pantau</td>
                      <td className="p-3 text-center text-teal-600 font-bold">✓ Setujui / Ubah / Selesai</td>
                      <td className="p-3 text-slate-500">Hanya siswa bersangkutan dan Guru BK yang bisa melihat jadwalnya.</td>
                    </tr>
                    <tr className="bg-slate-50/50">
                      <td className="p-3 font-semibold text-slate-800">Kirim Curhat Anonim</td>
                      <td className="p-3 text-center text-emerald-600 font-bold">✓ Kirim & Cek Tiket</td>
                      <td className="p-3 text-center text-teal-600 font-bold">✓ Baca & Beri Balasan</td>
                      <td className="p-3 text-slate-500">Nama disamarkan, Guru BK merespon via kode tiket acak.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">Chat Pribadi</td>
                      <td className="p-3 text-center text-emerald-600 font-bold">✓ Chat dengan Guru BK</td>
                      <td className="p-3 text-center text-teal-600 font-bold">✓ Balas Chat Siswa</td>
                      <td className="p-3 text-slate-500">Kanal 1-on-1 aman untuk tanya jawab ringan.</td>
                    </tr>
                    <tr className="bg-slate-50/50">
                      <td className="p-3 font-semibold text-slate-800">Catatan Kasus Rahasia (Log BK)</td>
                      <td className="p-3 text-center text-rose-500 font-bold">✗ Tidak Ada Akses</td>
                      <td className="p-3 text-center text-teal-600 font-bold">✓ Full CRUD (Terkunci)</td>
                      <td className="p-3 text-slate-500">Dokumen internal konselor, terlindungi password khusus.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-800">Broadcast Motivasi & Pengumuman</td>
                      <td className="p-3 text-center text-emerald-600 font-bold">✓ Lihat / Baca</td>
                      <td className="p-3 text-center text-teal-600 font-bold">✓ Buat & Kirim</td>
                      <td className="p-3 text-slate-500">Disiarkan ke seluruh beranda siswa MTs Al Jihad.</td>
                    </tr>
                    <tr className="bg-slate-50/50">
                      <td className="p-3 font-semibold text-slate-800">Rekapitulasi Bulanan Madrasah</td>
                      <td className="p-3 text-center text-rose-500 font-bold">✗ Tidak Ada Akses</td>
                      <td className="p-3 text-center text-teal-600 font-bold">✓ Export PDF / Print</td>
                      <td className="p-3 text-slate-500">Laporan statistik tanpa membocorkan rahasia pribadi siswa.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: TECH STACK */}
          {activeTab === 'tech' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 text-base">Rekomendasi Teknologi Ringan (PWA & Low-Resource)</h3>
              <p className="text-xs text-slate-500">
                Siswa MTs sering menggunakan HP berkapasitas memori terbatas atau paket data hemat. Stack berikut menjamin aplikasi cepat diakses langsung dari browser tanpa wajib unduh APK besar.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 space-y-2">
                  <span className="text-xs font-bold text-emerald-800 px-2 py-0.5 rounded bg-emerald-200">Frontend PWA</span>
                  <h4 className="font-bold text-slate-800">React + Vite + Tailwind CSS</h4>
                  <ul className="text-xs text-slate-600 list-disc ml-4 space-y-1">
                    <li><strong>Ukuran Bundle Super Ringan:</strong> Loading awal di bawah 150 KB.</li>
                    <li><strong>Installable PWA:</strong> Siswa bisa klik "Tambahkan ke Layar Utama" (Add to Home Screen) sehingga muncul ikon aplikasi di HP.</li>
                    <li><strong>Desain Mobile-First:</strong> Menggunakan Tailwind utility class untuk layout responsive jempol-sentuh.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl border border-teal-200 bg-teal-50/50 space-y-2">
                  <span className="text-xs font-bold text-teal-800 px-2 py-0.5 rounded bg-teal-200">Backend API</span>
                  <h4 className="font-bold text-slate-800">Node.js (Express / Fastify) atau Laravel REST API</h4>
                  <ul className="text-xs text-slate-600 list-disc ml-4 space-y-1">
                    <li><strong>Node.js / Express:</strong> Ringan, konkurensi tinggi untuk realtime chat konseling.</li>
                    <li><strong>Laravel / PHP:</strong> Alternatif jika sekolah telah memiliki hosting cPanel bersama website madrasah.</li>
                    <li><strong>Keamanan:</strong> JWT Token berdurasi sedang dengan refresh token.</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-slate-500">Kebutuhan Server & Hosting</h4>
                <div className="grid sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border">
                    <p className="font-semibold text-slate-700">Cloud Run / VPS Murah</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">RAM 512 MB - 1 GB sudah sangat cukup untuk 300-500 siswa MTs.</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border">
                    <p className="font-semibold text-slate-700">Database</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">PostgreSQL / MySQL dengan koneksi pool efisien.</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border">
                    <p className="font-semibold text-slate-700">PWA Manifest</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">Mendukung offline cache untuk artikel bimbingan belajar.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CODE EXAMPLE */}
          {activeTab === 'code' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 text-base">Contoh Implementasi Komponen Mobile (Siswa)</h3>
              <p className="text-xs text-slate-500">
                Komponen bottom navigation dan booking dialog menggunakan React & Tailwind CSS yang ramah sentuhan layar HP:
              </p>

              <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-300 p-4 max-h-[420px] overflow-y-auto leading-relaxed">
{`// Contoh Implementasi Komponen Bottom Navigation Ala Mobile App
import React from 'react';
import { Home, Calendar, MessageCircle, HeartHandshake, BookOpen } from 'lucide-react';

export const StudentBottomNav = ({ activeTab, onSelectTab, badgeCount }) => {
  const navItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'booking', label: 'Jadwal BK', icon: Calendar, badge: badgeCount.activeBooking },
    { id: 'curhat', label: 'Curhat', icon: HeartHandshake },
    { id: 'chat', label: 'Chat Ibu', icon: MessageCircle, badge: badgeCount.unreadChat },
    { id: 'artikel', label: 'Motivasi', icon: BookOpen },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-emerald-100 shadow-lg px-2 py-2">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className="relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all"
            >
              <div className={\`p-1.5 rounded-xl transition-all \${
                isActive ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/30' : 'text-slate-500 hover:text-emerald-700'
              }\`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={\`text-[10px] mt-1 font-semibold \${
                isActive ? 'text-emerald-700' : 'text-slate-500'
              }\`}>
                {item.label}
              </span>
              {Boolean(item.badge) && (
                <span className="absolute top-0 right-2 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};`}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Aplikasi ini berjalan live secara interaktif dengan data asli tersimpan di browser.</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold transition shadow-sm"
          >
            Tutup Dokumentasi & Coba Aplikasi
          </button>
        </div>
      </div>
    </div>
  );
};
