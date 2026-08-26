import React, { useState } from 'react';
import { Edit3, Package, Settings, LogOut, ChevronDown, ChevronUp, Crown, Sparkles, Eye, EyeOff } from 'lucide-react';
import { useShop } from '../context/ShopContext';

/**
 * AdminFloatingDock
 * ─────────────────────────────────────────────────────────────
 * A fixed, bottom-right floating toolbar visible only to logged-in admins.
 * Provides:
 *  - Toggle for on-page edit mode
 *  - Quick nav: Admin Panel, Add Product
 *  - Sign-out shortcut
 *  - Minimizable
 */
export default function AdminFloatingDock() {
  const {
    isAdminLoggedIn,
    logoutAdmin,
    isAdminEditMode,
    setIsAdminEditMode,
    navigateTo,
    setCmsDrawerOpen,
  } = useShop();

  const [collapsed, setCollapsed] = useState(false);

  if (!isAdminLoggedIn) return null;

  return (
    <div
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-[900] flex flex-col items-end gap-2"
      role="toolbar"
      aria-label="Admin Dock"
    >
      {/* Main Dock Panel */}
      {!collapsed && (
        <div className="bg-[#1A0F0E] border border-yellow-500/30 rounded-2xl shadow-2xl overflow-hidden animate-fade-in min-w-[220px]">
          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-[#2E1C1A] to-[#3D1F4A] border-b border-white/10">
            <Crown className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-300/90">
              Admin Controls
            </span>
            <span className="ml-auto flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[9px] text-green-400 font-semibold">LIVE</span>
            </span>
          </div>

          {/* Controls */}
          <div className="p-2.5 space-y-1.5">
            {/* Edit Mode Toggle */}
            <button
              onClick={() => setIsAdminEditMode(!isAdminEditMode)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isAdminEditMode
                  ? 'bg-yellow-400 text-yellow-900 shadow-md'
                  : 'bg-white/10 text-white/80 hover:bg-white/15'
              }`}
            >
              {isAdminEditMode ? (
                <Edit3 className="w-3.5 h-3.5 shrink-0" />
              ) : (
                <EyeOff className="w-3.5 h-3.5 shrink-0 opacity-60" />
              )}
              <span className="flex-1 text-left">
                {isAdminEditMode ? '✏️ Edit Mode: ON' : 'Edit Mode: OFF'}
              </span>
              <span className={`w-6 h-3 rounded-full transition-colors flex items-center px-0.5 ${isAdminEditMode ? 'bg-yellow-600' : 'bg-white/20'}`}>
                <span className={`w-2 h-2 rounded-full bg-white shadow transition-transform ${isAdminEditMode ? 'translate-x-3' : ''}`} />
              </span>
            </button>

            {/* Quick CMS shortcuts when edit mode on */}
            {isAdminEditMode && (
              <div className="space-y-1 pt-1 border-t border-white/10">
                <p className="text-[9px] uppercase tracking-widest text-white/30 px-3 pt-1">Quick Edit</p>
                {[
                  { key: 'announcement', label: '📢 Announcement Bar' },
                  { key: 'hero_slides', label: '🖼️ Hero Carousel' },
                  { key: 'offers_page', label: '🎟️ Promo Codes' },
                  { key: 'contact_info', label: '📞 Contact & FAQs' },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setCmsDrawerOpen({ key, label: label.split(' ').slice(1).join(' ') })}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] text-white/70 hover:bg-white/10 hover:text-white transition-all text-left cursor-pointer"
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}

            <div className="border-t border-white/10 pt-1.5 space-y-1">
              <button
                onClick={() => navigateTo('admin')}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-white/70 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Full Admin Panel</span>
              </button>

              <button
                onClick={() => {
                  navigateTo('admin');
                  // small timeout to let admin panel load, then open add product
                  setTimeout(() => {}, 300);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-white/70 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              >
                <Package className="w-3.5 h-3.5" />
                <span>Go to Products</span>
              </button>

              <button
                onClick={logoutAdmin}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Collapse / Expand Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-full shadow-2xl font-sans font-bold text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
          isAdminEditMode
            ? 'bg-yellow-400 text-yellow-900 hover:bg-yellow-300'
            : 'bg-[#2E1C1A] text-white/90 hover:bg-[#3D1F4A] border border-yellow-500/20'
        }`}
        title={collapsed ? 'Expand Admin Dock' : 'Minimize Admin Dock'}
        aria-expanded={!collapsed}
      >
        <Crown className="w-3.5 h-3.5" />
        <span>{collapsed ? 'Admin' : 'Minimize'}</span>
        {collapsed ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>
    </div>
  );
}
