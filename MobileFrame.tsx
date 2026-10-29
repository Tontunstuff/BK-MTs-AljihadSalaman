import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  isFrameActive: boolean;
}

export const MobileFrame: React.FC<Props> = ({ children, isFrameActive }) => {
  if (!isFrameActive) {
    return <div className="w-full">{children}</div>;
  }

  return (
    <div className="py-6 px-2 flex justify-center items-center min-h-[calc(100vh-65px)] bg-slate-900/10">
      {/* Phone outer container */}
      <div className="w-full max-w-[410px] bg-white rounded-[44px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border-[10px] border-slate-900 overflow-hidden relative flex flex-col h-[820px] ring-1 ring-slate-800">
        {/* Dynamic Island / Notch */}
        <div className="bg-slate-900 text-white pt-2 pb-1 px-6 flex items-center justify-between z-40 select-none">
          <span className="text-[11px] font-bold tracking-tight">09:41</span>
          {/* Notch center pill */}
          <div className="w-20 h-4 bg-black rounded-full flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-slate-800"></div>
          </div>
          <div className="flex items-center space-x-1.5 text-[10px]">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Inner Scrollable Screen Content */}
        <div className="flex-1 overflow-y-auto bg-slate-50 relative p-3">
          {children}
        </div>

        {/* Bottom Home Indicator Bar */}
        <div className="bg-white/80 backdrop-blur-md pt-1 pb-2 flex justify-center select-none z-40">
          <div className="w-32 h-1 bg-slate-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
