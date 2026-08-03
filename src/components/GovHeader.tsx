import React, { useState } from 'react';
import { ChevronDown, ShieldCheck, Lock, Building, X } from 'lucide-react';

export const GovHeader: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-[#f0f0f0] text-slate-700 text-[11px] sm:text-xs py-1.5 px-3 sm:px-4 flex items-center justify-between border-b border-slate-200 select-none">
        <div className="flex items-center gap-1.5 overflow-hidden">
          {/* Singapore Crest / Lion Red Emblem */}
          <div className="w-4 h-4 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-[9px] shrink-0 shadow-xs">
            SG
          </div>
          <span className="truncate font-medium text-slate-800">A Singapore Government Agency Website</span>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="text-[#007078] hover:underline font-semibold flex items-center gap-0.5 ml-2 cursor-pointer whitespace-nowrap text-[11px]"
        >
          How to identify
          <ChevronDown className="w-3.5 h-3.5 inline-block" />
        </button>
      </div>

      {/* Official Gov website explanation modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl relative border border-slate-100">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3 text-[#007078]">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <h3 className="font-bold text-lg text-slate-900">How to identify official SG Government websites</h3>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Official Singapore Government websites end with <strong className="text-slate-900">.gov.sg</strong>.
            </p>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <Building className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800">Official government website</div>
                  <div className="text-slate-600 text-[11px] mt-0.5">
                    Secure domains end with <span className="bg-teal-100 text-teal-900 px-1 py-0.5 rounded font-mono font-semibold">.gov.sg</span> (e.g. voucher.redeem.gov.sg).
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <Lock className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800">Secure connection (HTTPS)</div>
                  <div className="text-slate-600 text-[11px] mt-0.5">
                    Look for the lock icon or <span className="font-mono">https://</span> in your browser search bar.
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-5 w-full bg-[#009ca6] hover:bg-[#008992] text-white font-semibold py-2.5 rounded-xl transition-all shadow-xs text-xs"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
