import React, { useState } from 'react';
import { VoucherItem, CategoryType, SelectionMode } from '../types';
import { VoucherCard } from './VoucherCard';
import { CentsAmountKeypad } from './CentsAmountKeypad';
import { QrCode, CheckSquare, Square, Info, Calculator, LayoutGrid, Zap } from 'lucide-react';

interface VoucherGridProps {
  vouchers: VoucherItem[];
  availableBalance: number;
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  selectedVoucherIds: string[];
  onToggleVoucher: (id: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
  onGenerateQRWithAmount: (amount: number) => void;
  onShowTerms: () => void;
}

export const VoucherGrid: React.FC<VoucherGridProps> = ({
  vouchers,
  availableBalance,
  selectedCategory,
  onSelectCategory,
  selectedVoucherIds,
  onToggleVoucher,
  onSelectAll,
  onClearAll,
  onGenerateQRWithAmount,
  onShowTerms,
}) => {
  const [mode, setMode] = useState<SelectionMode>('keypad');
  const [keypadAmountStr, setKeypadAmountStr] = useState('0');

  const filteredVouchers = vouchers.filter((v) => v.category === selectedCategory);
  const availableVouchers = filteredVouchers.filter((v) => !v.isRedeemed);

  const selectedVouchers = vouchers.filter((v) => selectedVoucherIds.includes(v.id));
  const legacyTotalAmount = selectedVouchers.reduce((acc, curr) => acc + curr.amount, 0);

  const isAllSelected =
    availableVouchers.length > 0 &&
    availableVouchers.every((v) => selectedVoucherIds.includes(v.id));

  return (
    <div className="-mt-5 bg-slate-50/90 rounded-t-3xl border-t border-slate-100 px-3 sm:px-4 pt-4 pb-28 min-h-[calc(100vh-180px)] relative z-20">
      <div className="max-w-md mx-auto">
        {/* Category Selector Tabs */}
        <div className="flex bg-slate-200/80 p-1 rounded-xl mb-3 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => {
              onSelectCategory('heartland');
              setKeypadAmountStr('0');
            }}
            className={`flex-1 py-2 rounded-lg transition-all text-center cursor-pointer ${
              selectedCategory === 'heartland'
                ? 'bg-white text-[#1e295d] shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Heartland & Hawkers
          </button>
          <button
            onClick={() => {
              onSelectCategory('supermarket');
              setKeypadAmountStr('0');
            }}
            className={`flex-1 py-2 rounded-lg transition-all text-center cursor-pointer ${
              selectedCategory === 'supermarket'
                ? 'bg-white text-[#1e295d] shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Supermarkets
          </button>
        </div>

        {/* Mode Selector (Keyin to Cents vs Fixed Cards) */}
        <div className="flex items-center bg-teal-900/10 p-1 rounded-2xl mb-4 border border-teal-700/20 text-xs">
          <button
            onClick={() => setMode('keypad')}
            className={`flex-1 py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              mode === 'keypad'
                ? 'bg-[#00969d] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Key In Amount (To Cents)</span>
            <span className="text-[9px] bg-white text-teal-900 font-extrabold px-1.5 py-0.5 rounded-full ml-1">
              ZERO WASTE
            </span>
          </button>

          <button
            onClick={() => setMode('legacy')}
            className={`py-2 px-3 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              mode === 'legacy'
                ? 'bg-white text-[#1e295d] shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Fixed Cards</span>
          </button>
        </div>

        {/* Keypad View */}
        {mode === 'keypad' ? (
          <CentsAmountKeypad
            category={selectedCategory}
            availableBalance={availableBalance}
            amountStr={keypadAmountStr}
            onChangeAmountStr={setKeypadAmountStr}
            onGenerateQR={(amt) => onGenerateQRWithAmount(amt)}
            onShowTerms={onShowTerms}
          />
        ) : (
          /* Legacy Cards View */
          <div>
            <div className="flex items-center justify-between mb-3 px-1 text-xs">
              <div className="text-slate-600 font-medium">
                Available Vouchers ({availableVouchers.length})
              </div>
              <div className="flex items-center gap-2">
                {isAllSelected ? (
                  <button
                    onClick={onClearAll}
                    className="text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 cursor-pointer bg-white px-2 py-1 rounded-md border border-slate-200 shadow-2xs"
                  >
                    <Square className="w-3.5 h-3.5" />
                    Clear
                  </button>
                ) : (
                  <button
                    onClick={onSelectAll}
                    className="text-teal-700 hover:text-teal-900 font-semibold flex items-center gap-1 cursor-pointer bg-teal-50 px-2 py-1 rounded-md border border-teal-200/60"
                  >
                    <CheckSquare className="w-3.5 h-3.5 text-teal-700" />
                    Select All
                  </button>
                )}
              </div>
            </div>

            {filteredVouchers.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-slate-500 text-sm">No vouchers remaining in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-6">
                {filteredVouchers.map((voucher) => (
                  <VoucherCard
                    key={voucher.id}
                    voucher={voucher}
                    isSelected={selectedVoucherIds.includes(voucher.id)}
                    onToggle={onToggleVoucher}
                  />
                ))}
              </div>
            )}

            <div className="text-center pt-2 pb-24">
              <button
                onClick={onShowTerms}
                className="text-slate-500 hover:text-slate-800 text-xs font-medium inline-flex items-center gap-1 cursor-pointer underline underline-offset-2"
              >
                <Info className="w-3.5 h-3.5" />
                Tap here for CDC Vouchers terms & info
              </button>
            </div>

            {/* Floating Bottom Bar for Legacy Mode */}
            <div className="fixed bottom-0 left-0 right-0 z-30 p-3 sm:p-4 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-2xl">
              <div className="max-w-md mx-auto flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-semibold uppercase text-slate-500 tracking-wider">
                    Total Selected
                  </div>
                  <div className="text-2xl font-black text-[#1e295d] flex items-baseline gap-0.5">
                    <span>$</span>
                    <span>{legacyTotalAmount}</span>
                    {selectedVoucherIds.length > 0 && (
                      <span className="text-xs font-normal text-slate-500 ml-1.5">
                        ({selectedVoucherIds.length} {selectedVoucherIds.length === 1 ? 'card' : 'cards'})
                      </span>
                    )}
                  </div>
                </div>

                <button
                  disabled={legacyTotalAmount === 0}
                  onClick={() => onGenerateQRWithAmount(legacyTotalAmount)}
                  className={`
                    flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base shadow-md transition-all cursor-pointer active:scale-98
                    ${
                      legacyTotalAmount > 0
                        ? 'bg-[#00969d] hover:bg-[#008187] text-white shadow-teal-700/20'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                    }
                  `}
                >
                  <QrCode className="w-5 h-5" />
                  <span>Show QR Code</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
