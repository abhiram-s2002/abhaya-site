import React from 'react';
import { Sparkles, Info, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Toast() {
  const { toasts } = useShop();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 left-4 sm:left-auto z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-center gap-3 px-4 py-3.5 rounded-lg shadow-xl backdrop-blur-md text-xs font-medium border animate-fade-in ${
            t.type === 'error'
              ? 'bg-rose-900/90 text-white border-rose-700'
              : t.type === 'info'
              ? 'bg-stone-900/90 text-stone-200 border-stone-700'
              : 'bg-primary/95 text-white border-royal-violet/50 shadow-glow'
          }`}
        >
          {t.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-rose-300 shrink-0" />
          ) : t.type === 'info' ? (
            <Info className="w-4 h-4 text-stone-300 shrink-0" />
          ) : (
            <Sparkles className="w-4 h-4 text-gold-accent shrink-0" />
          )}
          <span className="flex-1 leading-snug">{t.message}</span>
        </div>
      ))}
    </div>
  );
}
