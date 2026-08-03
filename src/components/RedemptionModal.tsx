import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { CategoryType, VoucherItem } from '../types';
import { X, ShieldCheck, Clock, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';

interface RedemptionModalProps {
  selectedVouchers?: VoucherItem[];
  exactAmount?: number;
  category: CategoryType;
  onClose: () => void;
  onConfirmRedeemed: (amount: number, merchantName: string, voucherIds?: string[]) => void;
}

export const RedemptionModal: React.FC<RedemptionModalProps> = ({
  selectedVouchers = [],
  exactAmount,
  category,
  onClose,
  onConfirmRedeemed,
}) => {
  const [timeString, setTimeString] = useState('');
  const [copied, setCopied] = useState(false);
  const [merchantNameInput, setMerchantNameInput] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const totalAmount =
    typeof exactAmount === 'number'
      ? exactAmount
      : selectedVouchers.reduce((acc, v) => acc + v.amount, 0);

  const formattedAmount = totalAmount.toFixed(2);
  const qrData = `SG-CDC-2026-VAL:${formattedAmount}-CAT:${category}-EXACT:TRUE`;

  // Live security clock ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Singapore',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTimeString(now.toLocaleString('en-SG', options).toUpperCase() + ' SGT');
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(qrData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRedeem = () => {
    const defaultMerchant =
      category === 'heartland' ? 'Maxwell Food Centre Stall' : 'NTUC FairPrice';
    const finalMerchant = merchantNameInput.trim() || defaultMerchant;

    setIsSuccess(true);
    setTimeout(() => {
      onConfirmRedeemed(
        totalAmount,
        finalMerchant,
        selectedVouchers.map((v) => v.id)
      );
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl relative border border-slate-100 overflow-hidden text-center">
        {/* Background header banner */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#00969d] via-teal-500 to-[#1e295d]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 space-y-4 animate-scale-up">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">Voucher Redeemed!</h3>
              <p className="text-sm text-slate-600 mt-1">
                Successfully spent <strong className="text-emerald-700 font-bold">${formattedAmount}</strong>
              </p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200/60 text-xs text-emerald-800 font-medium">
              Exact cents applied — Zero change lost! Thank you!
            </div>
          </div>
        ) : (
          <>
            {/* Header badges */}
            <div className="mt-2 mb-3 flex items-center justify-center gap-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200/60">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>CDC Vouchers 2026</span>
              </div>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                Zero-Waste QR
              </span>
            </div>

            {/* Total Amount Big Display */}
            <div className="mb-2">
              <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                Total QR Scan Amount
              </div>
              <div className="text-4xl sm:text-5xl font-black text-[#1e295d] flex items-baseline justify-center gap-0.5 my-1">
                <span>$</span>
                <span>{formattedAmount}</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {category === 'heartland'
                  ? 'Valid at Heartland Merchants & Hawkers'
                  : 'Valid at Participating Supermarkets'}
              </p>
            </div>

            {/* Anti-fraud live security timestamp */}
            <div className="my-3 py-1.5 px-3 bg-slate-100 rounded-xl flex items-center justify-center gap-2 text-[11px] font-mono text-slate-700 border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span className="font-semibold">{timeString || 'LOADING SGT...'}</span>
            </div>

            {/* QR Code Container */}
            <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-inner my-2 inline-block relative group">
              <QRCodeSVG
                value={qrData}
                size={180}
                level="H"
                includeMargin={true}
                fgColor="#1e295d"
              />
              <div className="mt-2 text-[10px] text-slate-400 font-mono flex items-center justify-center gap-1">
                <span>REF: SG-CDC-2026-{Math.floor(1000 + Math.random() * 9000)}</span>
                <button
                  onClick={handleCopyCode}
                  className="p-1 hover:text-slate-700 cursor-pointer"
                  title="Copy QR Data"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-3 font-medium px-2">
              Merchant scans this single QR code for <strong className="text-slate-900">${formattedAmount}</strong>.
            </p>

            {/* Optional Merchant Name simulation input */}
            <div className="mb-4 text-left">
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Merchant / Shop Name (Optional for Demo):
              </label>
              <input
                type="text"
                placeholder={
                  category === 'heartland'
                    ? 'e.g., Tian Tian Chicken Rice'
                    : 'e.g., FairPrice Bedok'
                }
                value={merchantNameInput}
                onChange={(e) => setMerchantNameInput(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-[#00969d]"
              />
            </div>

            {/* Action buttons */}
            <div className="space-y-2">
              <button
                onClick={handleRedeem}
                className="w-full bg-[#1e295d] hover:bg-[#141e43] text-white font-bold py-3 rounded-2xl shadow-md transition-all text-xs sm:text-sm cursor-pointer active:scale-98"
              >
                Simulate Merchant Scan & Pay ${formattedAmount}
              </button>
              <button
                onClick={onClose}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-2xl transition-all text-xs cursor-pointer"
              >
                Cancel / Edit Amount
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
