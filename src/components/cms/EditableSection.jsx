import React from 'react';
import { Settings2, Edit3, X } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

/**
 * EditableSection
 * ─────────────────────────────────────────────────────────────
 * Transparent wrapper. When Admin Edit Mode is ON, shows a
 * golden "✏️ Edit <label>" badge on hover / focus.
 * Clicking it opens the CMSEditDrawer for this section.
 *
 * Props:
 *   cmsKey   — the site_content key (e.g. 'hero_slides')
 *   label    — human-readable name (e.g. 'Hero Carousel')
 *   children — the section's normal JSX
 *   className — optional extra class on the wrapper div
 */
export default function EditableSection({ cmsKey, label, children, className = '' }) {
  const { isAdminEditMode, setCmsDrawerOpen } = useShop();

  if (!isAdminEditMode) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={`relative group/editable outline-2 outline-transparent hover:outline-dashed hover:outline-yellow-400/60 rounded-sm transition-all ${className}`}
    >
      {children}

      {/* Edit Badge — appears on hover */}
      <button
        onClick={() => setCmsDrawerOpen({ key: cmsKey, label })}
        className="
          absolute top-2 right-2 z-50
          flex items-center gap-1.5
          px-3 py-1.5
          bg-yellow-400 hover:bg-yellow-300
          text-yellow-900 font-sans font-bold text-[10px] uppercase tracking-widest
          rounded-full shadow-lg
          opacity-0 group-hover/editable:opacity-100
          translate-y-1 group-hover/editable:translate-y-0
          transition-all duration-200 ease-out
          cursor-pointer select-none
          whitespace-nowrap
        "
        title={`Edit ${label}`}
      >
        <Edit3 className="w-3 h-3" />
        <span>Edit {label}</span>
      </button>
    </div>
  );
}
