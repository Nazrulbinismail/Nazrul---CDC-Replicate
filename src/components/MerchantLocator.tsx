import React, { useState, useMemo } from 'react';
import { Merchant, CategoryType } from '../types';
import { MOCK_MERCHANTS } from '../data/mockData';
import {
  Search,
  MapPin,
  Building2,
  Utensils,
  ShoppingBag,
  Store,
  Cross,
  ChevronLeft,
  X,
  Navigation,
  Star,
  Map,
  List,
  Filter,
} from 'lucide-react';

interface MerchantLocatorProps {
  onBack: () => void;
  defaultCategoryFilter?: CategoryType;
}

export const MerchantLocator: React.FC<MerchantLocatorProps> = ({
  onBack,
  defaultCategoryFilter,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const categories = [
    'All',
    'Hawker & Coffee Shop',
    'Supermarket',
    'Heartland Shop',
    'Beauty & Wellness',
    'Medical & Clinic',
  ];

  const regions = ['All', 'Central', 'East', 'West', 'North'];

  const filteredMerchants = useMemo(() => {
    return MOCK_MERCHANTS.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.postalCode.includes(searchQuery) ||
        m.mrt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCat === 'All' || m.category === selectedCat;
      const matchesRegion = selectedRegion === 'All' || m.region === selectedRegion;

      const matchesDefaultCategory =
        !defaultCategoryFilter ||
        m.acceptsCategory.includes(defaultCategoryFilter);

      return matchesSearch && matchesCat && matchesRegion && matchesDefaultCategory;
    });
  }, [searchQuery, selectedCat, selectedRegion, defaultCategoryFilter]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Hawker & Coffee Shop':
        return <Utensils className="w-4 h-4 text-amber-600" />;
      case 'Supermarket':
        return <ShoppingBag className="w-4 h-4 text-blue-600" />;
      case 'Heartland Shop':
        return <Store className="w-4 h-4 text-emerald-600" />;
      default:
        return <Building2 className="w-4 h-4 text-teal-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Header */}
      <div className="bg-[#00969d] text-white p-4 sticky top-0 z-30 shadow-md">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={onBack}
              className="flex items-center gap-1 text-white hover:opacity-80 font-medium text-sm cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Vouchers</span>
            </button>

            {/* Toggle View Mode */}
            <div className="flex bg-black/20 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                  viewMode === 'list' ? 'bg-white text-teal-900 shadow-xs' : 'text-white/80'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                List
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                  viewMode === 'map' ? 'bg-white text-teal-900 shadow-xs' : 'text-white/80'
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                Map
              </button>
            </div>
          </div>

          <h1 className="text-xl font-bold tracking-tight mb-2">Where to use CDC Vouchers</h1>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search hawker, shop, postal code or MRT..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm rounded-2xl focus:outline-none shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-md mx-auto w-full p-4 flex-1">
        {/* Category horizontal scrolling pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap font-medium transition-all cursor-pointer ${
                selectedCat === cat
                  ? 'bg-[#1e295d] text-white shadow-2xs font-semibold'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Region filter */}
        <div className="flex items-center gap-2 mb-4 text-xs">
          <span className="text-slate-500 font-medium flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Region:
          </span>
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  selectedRegion === reg
                    ? 'bg-teal-100 text-teal-900 font-bold border border-teal-300'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        {viewMode === 'map' ? (
          /* Simulated Singapore Interactive Map View */
          <div className="bg-emerald-50/50 rounded-2xl border border-slate-200 h-80 relative overflow-hidden flex flex-col justify-between p-4 shadow-inner">
            {/* Map background mockup */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#00969d_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Map Pin Mockups */}
            <div className="relative z-10 grid grid-cols-2 gap-3 h-full overflow-y-auto pr-1">
              {filteredMerchants.slice(0, 4).map((m, idx) => (
                <div
                  key={m.id}
                  className="bg-white p-3 rounded-xl shadow-md border border-teal-200 flex flex-col justify-between text-left transition-all hover:scale-102"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-teal-700 text-white font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                      Accepted
                    </span>
                  </div>
                  <div className="my-1">
                    <div className="font-bold text-xs text-slate-900 line-clamp-1">{m.name}</div>
                    <div className="text-[10px] text-slate-500 line-clamp-1">{m.mrt} MRT</div>
                  </div>
                  <div className="text-[10px] font-semibold text-teal-700 flex items-center gap-0.5">
                    <Navigation className="w-3 h-3" />
                    <span>{m.distance} away</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative z-10 bg-white/90 backdrop-blur-xs p-2.5 rounded-xl text-center text-xs font-semibold text-slate-700 border border-slate-200 mt-2">
              Showing {filteredMerchants.length} participating merchants on map
            </div>
          </div>
        ) : (
          /* List View */
          <div className="space-y-3">
            <div className="text-xs text-slate-500 font-medium flex justify-between items-center px-1">
              <span>{filteredMerchants.length} Merchants Found</span>
              <span className="text-teal-700 font-bold">100% Verified CDC Outlets</span>
            </div>

            {filteredMerchants.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-slate-500 text-sm font-medium">
                  No merchants found matching your filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCat('All');
                    setSelectedRegion('All');
                  }}
                  className="mt-3 text-xs text-teal-700 font-semibold underline cursor-pointer"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              filteredMerchants.map((merchant) => (
                <div
                  key={merchant.id}
                  className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <div className="p-2 rounded-xl bg-slate-100 shrink-0 mt-0.5">
                        {getCategoryIcon(merchant.category)}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                          {merchant.name}
                        </h3>
                        <span className="inline-block mt-0.5 text-[11px] font-semibold text-slate-500">
                          {merchant.category}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="inline-flex items-center gap-0.5 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                        <Star className="w-3 h-3 fill-amber-400 stroke-amber-500" />
                        {merchant.rating}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-slate-600 pl-9">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{merchant.address} (S{merchant.postalCode})</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                      <span>🚆 {merchant.mrt}</span>
                      <span className="font-medium text-teal-700">🕒 {merchant.openHours}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex gap-1">
                      {merchant.acceptsCategory.map((c) => (
                        <span
                          key={c}
                          className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200"
                        >
                          {c === 'heartland' ? 'Heartland & Hawkers' : 'Supermarkets'}
                        </span>
                      ))}
                    </div>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        merchant.name + ' ' + merchant.postalCode
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-teal-700 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <Navigation className="w-3 h-3" />
                      Directions
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
