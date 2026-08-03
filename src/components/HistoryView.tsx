import React from 'react';
import { Transaction } from '../types';
import { ChevronLeft, Receipt, Calendar, Building2, ShoppingBag, ShieldCheck } from 'lucide-react';

interface HistoryViewProps {
  transactions: Transaction[];
  onBack: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  transactions,
  onBack,
}) => {
  const totalSpent = transactions.reduce((acc, t) => acc + t.totalAmount, 0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-12">
      {/* Top Header */}
      <div className="bg-[#1e295d] text-white p-4 sticky top-0 z-30 shadow-md">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={onBack}
              className="flex items-center gap-1 text-white/90 hover:text-white font-medium text-sm cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            <div className="flex items-center gap-1 text-xs font-bold bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
              <span>SG CDC Audit Log</span>
            </div>
          </div>

          <h1 className="text-xl font-bold tracking-tight">Redemption History</h1>
          <p className="text-xs text-slate-300 mt-1">
            Total spent across all merchants: <strong className="text-white">${totalSpent.toFixed(2)}</strong>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto w-full p-4 flex-1">
        {transactions.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
            <Receipt className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-slate-600 font-semibold text-sm">No redemptions yet</p>
            <p className="text-slate-400 text-xs">
              When you spend CDC vouchers at participating hawkers or supermarkets, your receipt history will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-slate-100 shrink-0">
                      {tx.category === 'heartland' ? (
                        <Building2 className="w-5 h-5 text-teal-700" />
                      ) : (
                        <ShoppingBag className="w-5 h-5 text-blue-700" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{tx.merchantName}</h3>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{tx.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-black text-[#1e295d]">-${tx.totalAmount.toFixed(2)}</div>
                    <span
                      className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5 ${
                        tx.category === 'heartland'
                          ? 'bg-teal-50 text-teal-800 border border-teal-200'
                          : 'bg-blue-50 text-blue-800 border border-blue-200'
                      }`}
                    >
                      {tx.category === 'heartland' ? 'Heartland' : 'Supermarket'}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>QR ID: {tx.qrCodeId}</span>
                  <span className="text-emerald-600 font-semibold font-sans">✓ Verified</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
