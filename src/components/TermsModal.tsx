import React from 'react';
import { X, Info, ShieldCheck } from 'lucide-react';

interface TermsModalProps {
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl relative border border-slate-100 max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-3 text-[#00969d]">
          <Info className="w-6 h-6" />
          <h3 className="font-bold text-lg text-slate-900">CDC Vouchers Info & Terms</h3>
        </div>

        <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
          <div className="p-3 bg-teal-50/70 rounded-2xl border border-teal-100 text-teal-900">
            <strong className="font-bold block text-slate-900 mb-0.5">Valid Until 31 December 2026</strong>
            CDC Vouchers are provided by the Community Development Councils to support Singapore households with daily expenses.
          </div>

          <div>
            <strong className="font-bold text-slate-800 block mb-1">Key Usage Guidelines:</strong>
            <ul className="list-disc pl-4 space-y-1">
              <li>Vouchers are non-refundable and cannot be exchanged for cash.</li>
              <li>No change will be given if the purchase amount is less than the voucher value.</li>
              <li>Heartland vouchers are valid only at participating hawker stalls and heartland shops.</li>
              <li>Supermarket vouchers are valid only at participating supermarkets in Singapore.</li>
            </ul>
          </div>

          <div>
            <strong className="font-bold text-slate-800 block mb-1">Security & Verification:</strong>
            <p>
              Always check that your voucher URL begins with <span className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-800">voucher.redeem.gov.sg</span>. Official government agency communications will never ask for your banking passwords or OTPs over WhatsApp or SMS.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full bg-[#00969d] hover:bg-[#008187] text-white font-bold py-3 rounded-2xl transition-all text-xs cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};
