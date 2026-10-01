import React, { useState } from 'react';
import { Share, PlusSquare, QrCode, Check, Copy, X, Download } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { playHapticSound } from '../utils/audio';

export const PWAInstallBanner: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);

  // If already running inside installed standalone app, suppress the prompt
  if (isInstalled) {
    return null;
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://lingua30-app.run.app';
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(currentUrl)}`;

  const handleCopyLink = () => {
    playHapticSound('tap');
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      {/* Top Banner inside App Header or Container */}
      <div className="mx-4 mt-2 mb-1 p-2.5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-blue-500/5 border border-[#007AFF]/30 flex items-center justify-between gap-2 shadow-2xs select-none">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-8 h-8 rounded-xl bg-[#007AFF] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
            📱
          </div>
          <div className="truncate">
            <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight flex items-center gap-1">
              Install on iPhone or Tablet
              <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold px-1.5 py-0.2 rounded-full">
                Free PWA
              </span>
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              {isIOS ? 'Add to Home Screen for fullscreen offline practice' : 'Access on iOS iPhone or iPad tablet'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {isInstallable ? (
            <button
              id="pwa-install-app-btn"
              onClick={() => {
                playHapticSound('tap');
                install();
              }}
              className="px-3 py-1.5 rounded-xl bg-[#007AFF] hover:bg-blue-600 text-white font-bold text-xs shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install</span>
            </button>
          ) : (
            <button
              id="pwa-view-steps-btn"
              onClick={() => {
                playHapticSound('tap');
                setShowGuide(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-[#007AFF] hover:bg-blue-600 text-white font-bold text-xs shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>How To</span>
            </button>
          )}

          <button
            id="pwa-show-qr-btn"
            onClick={() => {
              playHapticSound('tap');
              setShowQR(true);
            }}
            className="p-1.5 rounded-xl bg-white dark:bg-[#1c1c1e] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#007AFF] transition-colors cursor-pointer"
            title="Scan with phone camera"
            aria-label="Scan with phone camera"
          >
            <QrCode className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* iOS Installation Instructions Modal */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm rounded-t-[32px] sm:rounded-3xl bg-[#F2F2F7] dark:bg-[#1c1c1e] p-6 border-t sm:border border-white/20 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">📲</span>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Add to iPhone or iPad
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    No App Store needed • Works offline with fast speech audio
                  </p>
                </div>
              </div>
              <button
                id="close-pwa-guide-btn"
                onClick={() => setShowGuide(false)}
                className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 bg-white dark:bg-[#2c2c2e] p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
                <div className="w-7 h-7 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#007AFF] flex items-center justify-center font-bold text-xs shrink-0">
                  1
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">
                    Open in Safari
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                    Navigate to this link using Apple Safari on your iPhone or iPad.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white dark:bg-[#2c2c2e] p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
                <div className="w-7 h-7 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#007AFF] flex items-center justify-center font-bold text-xs shrink-0">
                  <Share className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">
                    Tap the Share Button
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                    Tap the square icon with an upward arrow in Safari's bottom toolbar.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white dark:bg-[#2c2c2e] p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
                <div className="w-7 h-7 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#007AFF] flex items-center justify-center font-bold text-xs shrink-0">
                  <PlusSquare className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">
                    Select "Add to Home Screen"
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                    Scroll down the share sheet and choose "Add to Home Screen".
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 text-[11px]">
              ✨ <strong>Done!</strong> The app will appear on your Home Screen as an authentic standalone app without Safari address bars.
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                id="pwa-switch-to-qr-btn"
                onClick={() => {
                  setShowGuide(false);
                  setShowQR(true);
                }}
                className="py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Scan QR</span>
              </button>

              <button
                id="pwa-dismiss-guide-btn"
                onClick={() => setShowGuide(false)}
                className="py-2.5 rounded-xl bg-[#007AFF] text-white font-bold text-xs hover:bg-blue-600 transition-colors cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code / Share Link Modal */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-[#F2F2F7] dark:bg-[#1c1c1e] p-6 border border-white/20 shadow-2xl space-y-4 text-center">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Open on iPhone or iPad
              </h3>
              <button
                id="close-pwa-qr-btn"
                onClick={() => setShowQR(false)}
                className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Point your <strong>iPhone or iPad Camera</strong> at this QR code to open the app directly:
            </p>

            {/* QR Code Image Container */}
            <div className="p-4 bg-white rounded-2xl shadow-xs border border-slate-200 dark:border-slate-700 inline-block mx-auto">
              <img
                src={qrApiUrl}
                alt="QR Code for iPhone or iPad"
                className="w-48 h-48 mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Direct Copy Link */}
            <div className="space-y-1.5 text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Direct URL:
              </span>
              <div className="flex items-center gap-1.5 p-1.5 bg-white dark:bg-[#2c2c2e] rounded-xl border border-slate-200 dark:border-slate-700">
                <input
                  id="direct-share-url-input"
                  type="text"
                  readOnly
                  value={currentUrl}
                  className="flex-1 bg-transparent text-xs text-slate-700 dark:text-slate-300 font-mono truncate px-2 outline-hidden"
                />
                <button
                  id="copy-share-url-btn"
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-lg bg-[#007AFF] text-white text-xs font-bold shrink-0 flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <button
              id="close-qr-modal-btn"
              onClick={() => setShowQR(false)}
              className="w-full py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-300 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
