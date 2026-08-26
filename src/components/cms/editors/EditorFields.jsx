import React from 'react';

/** Reusable form field components */
export function Field({ label, hint, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
        {label}
      </label>
      {hint && <p className="text-[11px] text-stone-400">{hint}</p>}
      {children}
    </div>
  );
}

export function Input({ value, onChange, placeholder, type = 'text', ...props }) {
  return (
    <input
      type={type}
      value={value ?? ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-400 transition-all"
      {...props}
    />
  );
}

export function Textarea({ value, onChange, placeholder, rows = 4 }) {
  return (
    <textarea
      value={value ?? ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-400 transition-all resize-y"
    />
  );
}

export function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${checked ? 'bg-purple-600' : 'bg-stone-300'}`}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${checked ? 'translate-x-5' : ''}`}
        />
      </div>
      <span className="text-xs font-medium text-stone-700">{label}</span>
    </label>
  );
}

export function SectionTitle({ children }) {
  return (
    <h3 className="font-serif text-base font-medium text-stone-800 border-b border-stone-100 pb-2 mb-4 mt-6 first:mt-0">
      {children}
    </h3>
  );
}

export function AddButton({ onClick, label = 'Add Item' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full py-2.5 rounded-xl border-2 border-dashed border-purple-300 text-purple-600 text-xs font-semibold hover:bg-purple-50 transition-colors flex items-center justify-center gap-1.5"
    >
      <span>＋</span>
      <span>{label}</span>
    </button>
  );
}

export function RemoveButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-100 text-red-500 hover:bg-red-200 flex items-center justify-center text-xs transition-colors"
      title="Remove"
    >
      ✕
    </button>
  );
}

export function CardWrap({ children }) {
  return (
    <div className="relative bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-3">
      {children}
    </div>
  );
}
