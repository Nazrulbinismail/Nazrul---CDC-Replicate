import React, { useState } from 'react';
import { CategoryType, VoucherItem, Transaction } from '../types';
import {
  QrCode,
  MapPin,
  Share2,
  Receipt,
  Sparkles,
  RefreshCw,
  Building2,
  ShoppingBag,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  X,
  Users,
} from 'lucide-react';

interface HomeScreenProps {
  vouchers: VoucherItem[];
  transactions: Transaction[];
  onOpenCategory: (cat: CategoryType) => void;
  onOpenMerchants: () => void;
  onOpenHistory: () => void;
  onResetVouchers: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  vouchers,
  transactions,
  onOpenCategory,
  onOpenMerchants,
  onOpenHistory,
  onResetVouchers,
}) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const heartlandVouchers = vouchers.filter((v) => v.category === 'heartland');
  const heartlandBalance = heartlandVouchers
    .filter((v) => !v.isRedeemed)
    .reduce((sum, v) => sum + v.amount, 0);

  const supermarketVouchers = vouchers.filter((v) => v.category === 'supermarket');
  const supermarketBalance = supermarketVouchers
    .filter((v) => !v.isRedeemed)
    .reduce((sum, v) => sum + v.amount, 0);

  const shareUrl = 'https://voucher.redeem.gov.sg/share/sg-cdc-2026-family-tan';

  const handleCopyShare = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#008992] via-[#00969d] to-[#1e295d] text-white p-5 pt-4 pb-8 relative overflow-hidden">
        {/* Background artwork */}
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <svg width="240" height="240" viewBox="0 0 200 200" fill="currentColor">
            <circle cx="100" cy="100" r="80" />
          </svg>
        </div>

        <div className="max-w-md mx-auto relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center font-bold text-xs">
                SG
              </div>
              <div>
                <span className="text-[11px] text-teal-100 font-semibold uppercase tracking-wider block">
                  Singpass Household Claim
                </span>
                <span className="font-bold text-sm text-white">Tan Ah Kow Household</span>
              </div>
            </div>

            <button
              onClick={onResetVouchers}
              className="text-[11px] font-semibold bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-full backdrop-blur-xs flex items-center gap-1 cursor-pointer transition-all border border-white/20"
              title="Reset Demo Balances"
            >
              <RefreshCw className="w-3 h-3" />
              Reset
            </button>
          </div>

          <h1 className="text-2xl font-black text-white tracking-tight">
            CDC Vouchers 2026
          </h1>
          <p className="text-xs text-teal-100 mt-1">
            Total remaining household balance: <strong className="text-white font-bold">${(heartlandBalance + supermarketBalance).toFixed(2)}</strong>
          </p>

          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 text-[11px] font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
            <span>Claimed on 2 Jan 2026 via Singpass</span>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="max-w-md mx-auto px-4 -mt-4 relative z-20 space-y-4">
        {/* Heartland & Hawkers Voucher Card */}
        <div
          onClick={() => onOpenCategory('heartland')}
          className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-md hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50/50 rounded-full -mr-10 -mt-10 pointer-events-none" />

          <div className="flex items-start justify-between mb-4 relative z-10">
            <div className="p-3 rounded-2xl bg-teal-50 text-teal-800 border border-teal-100">
              <Building2 className="w-6 h-6 text-[#00969d]" />
            </div>
            <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
              Heartland & Hawkers
            </span>
          </div>

          <div className="relative z-10 mb-4">
            <h2 className="text-base font-extrabold text-slate-900 group-hover:text-[#00969d] transition-colors">
              Heartland Merchants & Hawkers
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Valid at coffee shops, hawker stalls, provision shops & salons.
            </p>
          </div>

          <div className="flex items-end justify-between relative z-10 pt-2 border-t border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                Balance Remaining
              </span>
              <div className="text-3xl font-black text-[#1e295d]">
                ${heartlandBalance.toFixed(2)}
              </div>
            </div>

            <div className="flex items-center gap-1 bg-[#00969d] text-white font-bold text-xs px-4 py-2.5 rounded-2xl shadow-xs group-hover:bg-[#008187] transition-all">
              <span>Spend Vouchers</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Supermarkets Voucher Card */}
        <div
          onClick={() => onOpenCategory('supermarket')}
          className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-md hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full -mr-10 -mt-10 pointer-events-none" />

          <div className="flex items-start justify-between mb-4 relative z-10">
            <div className="p-3 rounded-2xl bg-blue-50 text-blue-800 border border-blue-100">
              <ShoppingBag className="w-6 h-6 text-[#1e295d]" />
            </div>
            <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              Supermarkets
            </span>
          </div>

          <div className="relative z-10 mb-4">
            <h2 className="text-base font-extrabold text-slate-900 group-hover:text-[#1e295d] transition-colors">
              Participating Supermarkets
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              FairPrice, Sheng Siong, Giant, Prime, Cold Storage & HAO Mart.
            </p>
          </div>

          <div className="flex items-end justify-between relative z-10 pt-2 border-t border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                Balance Remaining
              </span>
              <div className="text-3xl font-black text-[#1e295d]">
                ${supermarketBalance.toFixed(2)}
              </div>
            </div>

            <div className="flex items-center gap-1 bg-[#1e295d] text-white font-bold text-xs px-4 py-2.5 rounded-2xl shadow-xs group-hover:bg-[#151f47] transition-all">
              <span>Spend Vouchers</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Quick Action Navigation Grid */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={onOpenMerchants}
            className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs flex items-center gap-3 text-left transition-all cursor-pointer"
          >
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs text-slate-900">Where to use?</div>
              <div className="text-[10px] text-slate-500">Find nearby outlets</div>
            </div>
          </button>

          <button
            onClick={onOpenHistory}
            className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs flex items-center gap-3 text-left transition-all cursor-pointer"
          >
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-700">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs text-slate-900">Redemptions</div>
              <div className="text-[10px] text-slate-500">{transactions.length} transactions</div>
            </div>
          </button>
        </div>

        {/* Share with Family Button */}
        <div className="bg-gradient-to-r from-teal-800 to-teal-900 rounded-2xl p-4 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs">
              <Users className="w-5 h-5 text-teal-200" />
            </div>
            <div>
              <div className="font-bold text-xs text-white">Share Vouchers with Household</div>
              <div className="text-[11px] text-teal-200">Send unique redemption link to family</div>
            </div>
          </div>
          <button
            onClick={() => setShowShareModal(true)}
            className="bg-white text-teal-900 font-bold text-xs px-3 py-2 rounded-xl hover:bg-teal-50 transition-all cursor-pointer shrink-0"
          >
            Share Link
          </button>
        </div>

        {/* Recent Activity summary */}
        {transactions.length > 0 && (
          <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">Recent Redemptions</span>
              <button
                onClick={onOpenHistory}
                className="text-teal-700 font-bold hover:underline cursor-pointer"
              >
                View all
              </button>
            </div>

            <div className="space-y-2">
              {transactions.slice(0, 2).map((tx) => (
                <div
                  key={tx.id}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-800">{tx.merchantName}</div>
                    <div className="text-[10px] text-slate-500">{tx.timestamp}</div>
                  </div>
                  <div className="font-black text-[#1e295d]">-${tx.totalAmount}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Share Link Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl relative border border-slate-100">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2 mb-4">
              <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center mx-auto">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Share Household Vouchers</h3>
              <p className="text-xs text-slate-600">
                Anyone with this official CDC link can spend vouchers from your household allocation.
              </p>
            </div>

            <div className="p-3 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-mono text-slate-700 break-all mb-4 flex items-center justify-between gap-2">
              <span className="truncate">{shareUrl}</span>
              <button
                onClick={handleCopyShare}
                className="p-2 bg-white rounded-xl text-slate-800 shadow-2xs hover:bg-slate-50 shrink-0 cursor-pointer font-sans font-bold text-xs"
              >
                {copiedShare ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <button
              onClick={() => setShowShareModal(false)}
              className="w-full bg-[#00969d] hover:bg-[#008187] text-white font-bold py-3 rounded-2xl text-xs cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
