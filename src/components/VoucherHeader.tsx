import React from 'react';
import { ArrowLeft, MapPin } from 'lucide-react';

interface VoucherHeaderProps {
  title?: string;
  onBack: () => void;
  onWhereToUse: () => void;
}

export const VoucherHeader: React.FC<VoucherHeaderProps> = ({
  title = 'CDC Vouchers',
  onBack,
  onWhereToUse,
}) => {
  return (
    <div className="bg-gradient-to-b from-[#00969d] to-[#00a39f] text-white pt-3 pb-8 px-4 relative overflow-hidden select-none">
      {/* Decorative SG / Puzzle vector watermark background */}
      <div className="absolute right-[-20px] top-[-10px] opacity-15 pointer-events-none">
        <svg width="220" height="180" viewBox="0 0 200 200" fill="currentColor" className="text-white">
          <path d="M40,20 Q90,10 120,50 T180,90 Q200,150 130,180 T30,130 Z" />
          <path d="M80,0 Q140,20 160,80 T100,170 Z" opacity="0.5" />
        </svg>
      </div>

      <div className="max-w-md mx-auto relative z-10">
        {/* Top bar with back button */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-white hover:opacity-80 font-medium text-base transition-opacity cursor-pointer active:scale-95 py-1 px-1 -ml-1"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            <span>Back</span>
          </button>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
          {title}
        </h1>

        {/* "Where to use?" pill button */}
        <div>
          <button
            onClick={onWhereToUse}
            className="inline-flex items-center gap-2 bg-[#004e54] hover:bg-[#003b40] text-white font-medium text-sm px-4 py-2.5 rounded-full shadow-md transition-all cursor-pointer active:scale-95"
          >
            <MapPin className="w-4 h-4 text-emerald-300" />
            <span>Where to use?</span>
          </button>
        </div>
      </div>
    </div>
  );
};
