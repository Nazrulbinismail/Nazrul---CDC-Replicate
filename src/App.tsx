import React, { useState } from 'react';
import { ActiveScreen, CategoryType, VoucherItem, Transaction } from './types';
import { INITIAL_VOUCHERS, INITIAL_TRANSACTIONS } from './data/mockData';

import { GovHeader } from './components/GovHeader';
import { VoucherHeader } from './components/VoucherHeader';
import { VoucherGrid } from './components/VoucherGrid';
import { HomeScreen } from './components/HomeScreen';
import { MerchantLocator } from './components/MerchantLocator';
import { HistoryView } from './components/HistoryView';
import { RedemptionModal } from './components/RedemptionModal';
import { TermsModal } from './components/TermsModal';
import { DisqusForum } from './components/DisqusForum';

import { Smartphone, Monitor } from 'lucide-react';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('vouchers');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('heartland');
  const [selectedVoucherIds, setSelectedVoucherIds] = useState<string[]>([]);
  
  const [vouchers, setVouchers] = useState<VoucherItem[]>(INITIAL_VOUCHERS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);

  const [showRedemptionModal, setShowRedemptionModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [isMobileFrame, setIsMobileFrame] = useState(true);

  const [pendingAmount, setPendingAmount] = useState<number | null>(null);

  // Available balance for current selected category
  const currentCategoryBalance = vouchers
    .filter((v) => v.category === selectedCategory && !v.isRedeemed)
    .reduce((sum, v) => sum + v.amount, 0);

  // Toggle selection of a single voucher
  const handleToggleVoucher = (id: string) => {
    setSelectedVoucherIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Select all unredeemed vouchers in the current category
  const handleSelectAll = () => {
    const unredeemed = vouchers
      .filter((v) => v.category === selectedCategory && !v.isRedeemed)
      .map((v) => v.id);
    setSelectedVoucherIds(unredeemed);
  };

  // Clear voucher selection
  const handleClearAll = () => {
    setSelectedVoucherIds([]);
  };

  const handleOpenQRModalWithAmount = (amount: number) => {
    setPendingAmount(amount);
    setShowRedemptionModal(true);
  };

  // Confirm redemption completion (handles both exact custom amount and legacy voucher IDs)
  const handleConfirmRedeemed = (
    amountToRedeem: number,
    merchantName: string,
    voucherIds?: string[]
  ) => {
    const nowStr = new Date().toLocaleString('en-SG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    if (voucherIds && voucherIds.length > 0) {
      // Legacy voucher cards mode: mark specific voucher IDs as redeemed
      setVouchers((prev) =>
        prev.map((v) =>
          voucherIds.includes(v.id)
            ? { ...v, isRedeemed: true, redeemedAt: nowStr, merchantName }
            : v
        )
      );
    } else {
      // Keypad exact cents mode: greedily deduct amountToRedeem from unredeemed vouchers in selectedCategory
      let remainingToDeduct = amountToRedeem;

      setVouchers((prev) =>
        prev.map((v) => {
          if (v.category !== selectedCategory || v.isRedeemed || remainingToDeduct <= 0) {
            return v;
          }

          if (v.amount <= remainingToDeduct) {
            remainingToDeduct = parseFloat((remainingToDeduct - v.amount).toFixed(2));
            return {
              ...v,
              isRedeemed: true,
              redeemedAt: nowStr,
              merchantName,
            };
          } else {
            // Partial deduction from this voucher
            const nextAmount = parseFloat((v.amount - remainingToDeduct).toFixed(2));
            remainingToDeduct = 0;
            return {
              ...v,
              amount: nextAmount,
            };
          }
        })
      );
    }

    // Record new transaction
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      voucherIds: voucherIds || [],
      totalAmount: amountToRedeem,
      category: selectedCategory,
      merchantName,
      timestamp: nowStr,
      qrCodeId: `SG-CDC-2026-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    setTransactions((prev) => [newTx, ...prev]);

    // Reset selection & close modal
    setSelectedVoucherIds([]);
    setPendingAmount(null);
    setShowRedemptionModal(false);
  };

  // Reset demo data
  const handleResetVouchers = () => {
    setVouchers(INITIAL_VOUCHERS);
    setTransactions(INITIAL_TRANSACTIONS);
    setSelectedVoucherIds([]);
  };

  // Filter selected vouchers
  const currentSelectedVouchers = vouchers.filter((v) =>
    selectedVoucherIds.includes(v.id)
  );

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-800 antialiased flex flex-col items-center justify-start sm:p-4">
      {/* Viewport Frame Toggle Bar (Desktop helper) */}
      <div className="hidden sm:flex items-center justify-between w-full max-w-md mb-2 text-xs text-slate-400 px-2">
        <span className="font-semibold text-slate-300 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
          voucher.redeem.gov.sg (Live Replica)
        </span>

        <button
          onClick={() => setIsMobileFrame(!isMobileFrame)}
          className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-700 transition-colors cursor-pointer"
        >
          {isMobileFrame ? (
            <>
              <Monitor className="w-3.5 h-3.5 text-teal-400" />
              <span>Full Screen</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5 text-teal-400" />
              <span>Mobile Frame</span>
            </>
          )}
        </button>
      </div>

      {/* Main Container / Mobile Device Mockup */}
      <div
        className={`
          w-full bg-slate-50 transition-all duration-300 relative overflow-hidden shadow-2xl
          ${
            isMobileFrame
              ? 'max-w-md sm:rounded-[40px] sm:border-[8px] sm:border-slate-800 sm:ring-1 sm:ring-slate-700 min-h-[844px]'
              : 'max-w-4xl rounded-2xl min-h-screen'
          }
        `}
      >
        {/* Safari / Mobile Browser Top Bar Mockup (when in mobile frame view on desktop) */}
        <div className="bg-[#1c1c1e] text-white px-4 py-2 flex items-center justify-between text-xs font-mono border-b border-slate-800 select-none">
          <span className="text-[11px] text-slate-300 font-sans font-medium">12:52</span>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-200 font-sans font-medium bg-slate-800 px-3 py-0.5 rounded-full border border-slate-700">
            <span className="text-slate-400 font-mono text-[10px]">🔒</span>
            <span className="font-semibold">voucher.redeem.gov.sg</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-slate-300">
            <span>5G</span>
            <span>100%</span>
          </div>
        </div>

        {/* Official Singapore Government Top Bar Banner */}
        <GovHeader />

        {/* Dynamic Screen Routing */}
        {activeScreen === 'home' && (
          <HomeScreen
            vouchers={vouchers}
            transactions={transactions}
            onOpenCategory={(cat) => {
              setSelectedCategory(cat);
              setSelectedVoucherIds([]);
              setActiveScreen('vouchers');
            }}
            onOpenMerchants={() => setActiveScreen('merchants')}
            onOpenHistory={() => setActiveScreen('history')}
            onResetVouchers={handleResetVouchers}
          />
        )}

        {activeScreen === 'vouchers' && (
          <div className="min-h-full flex flex-col">
            <VoucherHeader
              title={
                selectedCategory === 'heartland'
                  ? 'CDC Vouchers'
                  : 'CDC Vouchers (Supermarket)'
              }
              onBack={() => setActiveScreen('home')}
              onWhereToUse={() => setActiveScreen('merchants')}
            />

            <VoucherGrid
              vouchers={vouchers}
              availableBalance={currentCategoryBalance}
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setSelectedVoucherIds([]);
              }}
              selectedVoucherIds={selectedVoucherIds}
              onToggleVoucher={handleToggleVoucher}
              onSelectAll={handleSelectAll}
              onClearAll={handleClearAll}
              onGenerateQRWithAmount={handleOpenQRModalWithAmount}
              onShowTerms={() => setShowTermsModal(true)}
            />
          </div>
        )}

        {activeScreen === 'merchants' && (
          <MerchantLocator
            onBack={() => setActiveScreen('vouchers')}
            defaultCategoryFilter={selectedCategory}
          />
        )}

        {activeScreen === 'history' && (
          <HistoryView
            transactions={transactions}
            onBack={() => setActiveScreen('home')}
          />
        )}

        {/* QR Code Redemption Modal */}
        {showRedemptionModal && (
          <RedemptionModal
            selectedVouchers={currentSelectedVouchers}
            exactAmount={pendingAmount !== null ? pendingAmount : undefined}
            category={selectedCategory}
            onClose={() => {
              setShowRedemptionModal(false);
              setPendingAmount(null);
            }}
            onConfirmRedeemed={handleConfirmRedeemed}
          />
        )}

        {/* Terms and Information Modal */}
        {showTermsModal && (
          <TermsModal onClose={() => setShowTermsModal(false)} />
        )}

        {/* Community Discussion Forum at the bottom of the page */}
        <div className="pb-24 px-3 sm:px-4">
          <DisqusForum />
        </div>
      </div>
    </div>
  );
}
