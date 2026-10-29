import React, { useState } from 'react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { Download, Smartphone, Share, PlusSquare, X } from 'lucide-react';

export const PWAInstallButton: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [showAndroidGuide, setShowAndroidGuide] = useState(false);

  // If already installed in standalone mode, hide
  if (isInstalled) {
    return null;
  }

  // Chromium / Android prompt available
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className={`flex items-center space-x-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold transition shadow-sm active:scale-95 ${
          compact ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-2 text-xs'
        }`}
        title="Pasang Aplikasi BK MTs di Layar HP"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Install App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className={`flex items-center space-x-1.5 rounded-xl bg-amber-400/90 hover:bg-amber-300 text-slate-900 font-bold transition shadow-sm active:scale-95 ${
            compact ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-2 text-xs'
          }`}
          title="Pasang di iPhone / iPad"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Pasang di iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in text-slate-800">
            <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 border border-emerald-100">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-bold text-base text-slate-900">Pasang di iPhone / iPad</h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs leading-relaxed text-slate-600">
                <p>Ikuti 2 langkah mudah berikut di browser Safari:</p>
                <div className="p-3 bg-slate-50 rounded-2xl border space-y-2">
                  <div className="flex items-start space-x-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <p>
                      Tekan tombol <strong>Bagikan / Share</strong> (<Share className="w-3.5 h-3.5 inline mx-0.5 text-blue-600" />) di bilah bawah Safari.
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <p>
                      Gulir ke bawah lalu pilih <strong>"Tambahkan ke Layar Utama"</strong> (<PlusSquare className="w-3.5 h-3.5 inline mx-0.5 text-slate-700" />).
                    </p>
                  </div>
                </div>
                <p className="text-[11px] text-emerald-800 font-medium">
                  Aplikasi BK Online akan langsung muncul di beranda HP seperti aplikasi App Store!
                </p>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition"
              >
                Saya Mengerti
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback for desktop / general browser without prompt event triggered yet
  return (
    <>
      <button
        onClick={() => setShowAndroidGuide(true)}
        className={`flex items-center space-x-1.5 rounded-xl bg-amber-400/90 hover:bg-amber-300 text-slate-900 font-bold transition shadow-sm active:scale-95 ${
          compact ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-2 text-xs'
        }`}
        title="Pasang Aplikasi di Layar Utama HP"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Pasang App</span>
      </button>

      {showAndroidGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in text-slate-800">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 border border-emerald-100">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-2">
                <Smartphone className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-base text-slate-900">Pasang di Smartphone</h3>
              </div>
              <button
                onClick={() => setShowAndroidGuide(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-600">
              <p>Untuk memasang aplikasi <strong>bk-online-mts-al-jihad-salaman.ai</strong> di HP:</p>
              <div className="p-3 bg-slate-50 rounded-2xl border space-y-2">
                <p>
                  1. Buka menu browser (ikon titik tiga <strong>⋮</strong> di Chrome Android).
                </p>
                <p>
                  2. Pilih <strong>"Pasang aplikasi"</strong> atau <strong>"Tambahkan ke Layar Utama"</strong>.
                </p>
              </div>
              <p className="text-[11px] text-emerald-800 font-medium">
                Aplikasi ringan ini dapat diakses langsung dari beranda HP tanpa perlu download file APK besar!
              </p>
            </div>

            <button
              onClick={() => setShowAndroidGuide(false)}
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition"
            >
              Tutup Panduan
            </button>
          </div>
        </div>
      )}
    </>
  );
};
