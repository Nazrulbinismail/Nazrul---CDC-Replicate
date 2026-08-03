import React from 'react';
import { CategoryType } from '../types';
import { Delete, RotateCcw, AlertTriangle, Zap } from 'lucide-react';

interface CentsAmountKeypadProps {
  category: CategoryType;
  availableBalance: number;
  amountStr: string;
  onChangeAmountStr: (str: string) => void;
  onGenerateQR: (amount: number) => void;
  onShowTerms: () => void;
}

export const CentsAmountKeypad: React.FC<CentsAmountKeypadProps> = ({
  category,
  availableBalance,
  amountStr,
  onChangeAmountStr,
  onGenerateQR,
  onShowTerms,
}) => {
  const numericAmount = parseFloat(amountStr) || 0;
  const isExceeding = numericAmount > availableBalance;
  const isValid = numericAmount > 0 && !isExceeding;
  const remainingAfter = Math.max(0, availableBalance - numericAmount);

  // Keypad press handlers
  const handleDigit = (digit: string) => {
    if (amountStr === '0' || amountStr === '0.00') {
      onChangeAmountStr(digit);
      return;
    }

    // Check decimal constraint (max 2 decimal places)
    if (amountStr.includes('.')) {
      const parts = amountStr.split('.');
      if (parts[1] && parts[1].length >= 2) return;
    }

    // Prevent excessively long numbers
    if (amountStr.replace('.', '').length >= 6) return;

    onChangeAmountStr(amountStr + digit);
  };

  const handleDot = () => {
    if (!amountStr.includes('.')) {
      onChangeAmountStr(amountStr + '.');
    }
  };

  const handleBackspace = () => {
    if (amountStr.length <= 1) {
      onChangeAmountStr('0');
    } else {
      onChangeAmountStr(amountStr.slice(0, -1));
    }
  };

  const handleClear = () => {
    onChangeAmountStr('0');
  };

  const handleQuickAdd = (addVal: number) => {
    const nextVal = (numericAmount + addVal).toFixed(2);
    if (parseFloat(nextVal) <= availableBalance) {
      onChangeAmountStr(nextVal);
    } else {
      onChangeAmountStr(availableBalance.toFixed(2));
    }
  };

  const handleMaxBalance = () => {
    onChangeAmountStr(availableBalance.toFixed(2));
  };

  return (
    <div className="space-y-4">
      {/* Solution Banner Addressing Pain Points */}
      <div className="bg-gradient-to-r from-teal-50 via-emerald-50 to-cyan-50 border border-teal-200/80 rounded-2xl p-3.5 shadow-2xs">
        <div className="flex items-start gap-2.5">
          <div className="p-2 bg-teal-600 text-white rounded-xl shrink-0 shadow-xs mt-0.5">
            <Zap className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <div className="font-bold text-teal-900 flex items-center gap-1">
              <span>Exact Cents Keyin (Zero-Waste Checkout)</span>
              <span className="text-[10px] bg-teal-200 text-teal-900 px-1.5 py-0.5 rounded-full font-semibold">
                NEW
              </span>
            </div>
            <p className="text-teal-800 text-[11px] mt-0.5 leading-snug">
              Key in your exact bill to the cents (e.g. <strong className="font-bold text-teal-950">$14.85</strong>). No leftover change lost and no mental math needed!
            </p>
          </div>
        </div>
      </div>

      {/* Main Keypad Card Display */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-md space-y-4">
        {/* Category & Available Balance Pill */}
        <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100">
          <span className="text-slate-500 font-semibold">
            Category Balance:
          </span>
          <span className="font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            ${availableBalance.toFixed(2)} Available
          </span>
        </div>

        {/* Big Amount Screen Input */}
        <div className="text-center py-2 px-4 bg-slate-50 rounded-2xl border border-slate-200 shadow-inner relative">
          <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block mb-1">
            Amount to Redeem
          </span>

          <div className="flex items-baseline justify-center gap-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#1e295d]">$</span>
            <span
              className={`text-4xl sm:text-5xl font-black tracking-tight transition-colors ${
                isExceeding ? 'text-red-600' : 'text-[#1e295d]'
              }`}
            >
              {amountStr || '0'}
            </span>
          </div>

          {/* Real-time Calculation Breakdown */}
          <div className="mt-2 text-[11px] font-medium flex items-center justify-between text-slate-500 pt-2 border-t border-slate-200/80">
            <span>Remaining after:</span>
            <span className={`font-bold ${isExceeding ? 'text-red-500' : 'text-emerald-700'}`}>
              ${remainingAfter.toFixed(2)}
            </span>
          </div>

          {isExceeding && (
            <div className="mt-2 text-xs font-bold text-red-600 flex items-center justify-center gap-1 bg-red-50 py-1.5 px-3 rounded-xl border border-red-200">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              Exceeds available balance (${availableBalance.toFixed(2)})
            </div>
          )}
        </div>

        {/* Quick Addition Chips */}
        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex justify-between items-center">
            <span>Quick Presets</span>
            <button
              onClick={handleClear}
              className="text-slate-500 hover:text-slate-800 font-bold flex items-center gap-0.5 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Clear
            </button>
          </div>

          <div className="grid grid-cols-5 gap-1.5 text-xs font-bold">
            <button
              onClick={() => handleQuickAdd(1)}
              className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-200 transition-colors cursor-pointer active:scale-95"
            >
              +$1
            </button>
            <button
              onClick={() => handleQuickAdd(2)}
              className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-200 transition-colors cursor-pointer active:scale-95"
            >
              +$2
            </button>
            <button
              onClick={() => handleQuickAdd(5)}
              className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-200 transition-colors cursor-pointer active:scale-95"
            >
              +$5
            </button>
            <button
              onClick={() => handleQuickAdd(10)}
              className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-200 transition-colors cursor-pointer active:scale-95"
            >
              +$10
            </button>
            <button
              onClick={handleMaxBalance}
              className="py-2 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-xl border border-teal-200 transition-colors cursor-pointer active:scale-95 text-[11px]"
            >
              Max
            </button>
          </div>
        </div>

        {/* Digital Numeric Keypad */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              onClick={() => handleDigit(digit)}
              className="py-3 sm:py-3.5 bg-slate-100/80 hover:bg-slate-200 text-[#1e295d] font-black text-xl sm:text-2xl rounded-2xl border border-slate-200/80 transition-all cursor-pointer active:bg-slate-300 active:scale-98 shadow-2xs"
            >
              {digit}
            </button>
          ))}
          <button
            onClick={handleDot}
            className="py-3 sm:py-3.5 bg-slate-100/80 hover:bg-slate-200 text-[#1e295d] font-black text-2xl rounded-2xl border border-slate-200/80 transition-all cursor-pointer active:scale-98 shadow-2xs"
          >
            .
          </button>
          <button
            onClick={() => handleDigit('0')}
            className="py-3 sm:py-3.5 bg-slate-100/80 hover:bg-slate-200 text-[#1e295d] font-black text-xl sm:text-2xl rounded-2xl border border-slate-200/80 transition-all cursor-pointer active:scale-98 shadow-2xs"
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            className="py-3 sm:py-3.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold flex items-center justify-center rounded-2xl border border-slate-300 transition-all cursor-pointer active:scale-98 shadow-2xs"
            title="Backspace"
          >
            <Delete className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Generate Exact Cents QR Code Button */}
      <button
        disabled={!isValid}
        onClick={() => onGenerateQR(numericAmount)}
        className={`
          w-full py-4 rounded-2xl font-black text-base shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98
          ${
            isValid
              ? 'bg-[#00969d] hover:bg-[#008187] text-white shadow-teal-700/20'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
          }
        `}
      >
        <span>Generate QR for ${numericAmount.toFixed(2)}</span>
      </button>

      {/* Footer Info Link */}
      <div className="text-center pt-1">
        <button
          onClick={onShowTerms}
          className="text-slate-500 hover:text-slate-800 text-xs font-medium cursor-pointer underline underline-offset-2"
        >
          Tap here for CDC Vouchers terms & zero-waste info
        </button>
      </div>
    </div>
  );
};
