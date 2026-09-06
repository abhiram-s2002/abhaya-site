import React from 'react';
import { Sparkles, Info, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Toast() {
  const { toasts } = useShop();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 left-4 sm:left-auto z-[9999] flex flex-col gap-2.5 max-w-md pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-center gap-3 px-4 py-3.5 rounded-xl shadow-2xl backdrop-blur-md text-xs sm:text-sm font-semibold border animate-slide-up transition-all ${
            t.type === 'error'
              ? 'bg-rose-950/95 text-white border-rose-600/80 shadow-rose-950/50'
              : t.type === 'info'
              ? 'bg-stone-900/95 text-stone-100 border-stone-700 shadow-stone-950/50'
              : 'bg-[#7A0648]/95 text-white border-amber-300/40 shadow-xl'
          }`}
        >
          <div className="shrink-0 p-1.5 rounded-lg bg-white/10">
            {t.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-300" />
            ) : t.type === 'info' ? (
              <Info className="w-4 h-4 text-stone-300" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-[#FFD700]" />
            )}
          </div>
          <span className="flex-1 leading-snug font-medium text-white">{t.message}</span>
        </div>
      ))}
    </div>
  );
}

