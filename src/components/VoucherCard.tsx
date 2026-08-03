import React from 'react';
import { VoucherItem } from '../types';
import { Check } from 'lucide-react';

interface VoucherCardProps {
  voucher: VoucherItem;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export const VoucherCard: React.FC<VoucherCardProps> = ({
  voucher,
  isSelected,
  onToggle,
}) => {
  const isRedeemed = voucher.isRedeemed;

  return (
    <div
      onClick={() => !isRedeemed && onToggle(voucher.id)}
      className={`
        relative flex items-center justify-between bg-white rounded-xl border transition-all cursor-pointer select-none h-[72px] sm:h-[78px] overflow-hidden
        ${
          isRedeemed
            ? 'opacity-50 bg-slate-100 border-slate-200 cursor-not-allowed'
            : isSelected
            ? 'border-[#1e295d] ring-2 ring-[#1e295d]/10 shadow-sm bg-blue-50/20'
            : 'border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-xs'
        }
      `}
    >
      {/* Left side: Dollar amount */}
      <div className="flex-1 pl-4 pr-3 py-2 flex items-baseline gap-0.5">
        <span className="text-sm font-bold text-[#1e295d] select-none">$</span>
        <span className="text-3xl font-black tracking-tight text-[#1e295d]">
          {voucher.amount}
        </span>
      </div>

      {/* Perforated Vertical Dotted Divider Line */}
      <div className="h-full border-r-2 border-dashed border-slate-200 my-1" />

      {/* Right side: Radio Selection Circle */}
      <div className="w-14 h-full flex items-center justify-center pr-1">
        {isRedeemed ? (
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-tight">
            Used
          </span>
        ) : (
          <div
            className={`
              w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
              ${
                isSelected
                  ? 'border-[#1e295d] bg-[#1e295d] text-white scale-105'
                  : 'border-[#1e295d] bg-white'
              }
            `}
          >
            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </div>
        )}
      </div>
    </div>
  );
};
