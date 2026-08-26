import React, { useState, useEffect, useRef } from 'react';

import { X, Save, Loader2, ChevronLeft } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

// Lazy-load editors per key to keep bundle small
import AnnouncementEditor from './editors/AnnouncementEditor';
import HeroSlidesEditor from './editors/HeroSlidesEditor';
import TestimonialsEditor from './editors/TestimonialsEditor';
import NewsletterEditor from './editors/NewsletterEditor';
import StoryEditor from './editors/StoryEditor';
import ContactEditor from './editors/ContactEditor';
import OffersEditor from './editors/OffersEditor';
import FooterEditor from './editors/FooterEditor';

const EDITOR_MAP = {
  announcement: AnnouncementEditor,
  hero_slides: HeroSlidesEditor,
  testimonials: TestimonialsEditor,
  newsletter: NewsletterEditor,
  story_page: StoryEditor,
  contact_info: ContactEditor,
  offers_page: OffersEditor,
  footer_content: FooterEditor,
};

/**
 * CMSEditDrawer
 * ─────────────────────────────────────────────────────────────
 * Global slide-over panel. Opened by setCmsDrawerOpen({ key, label }).
 * Renders the matching section editor, saves to Supabase on submit.
 */
export default function CMSEditDrawer() {
  const { cmsDrawerOpen, setCmsDrawerOpen, siteContent, updateSiteContent, showToast } = useShop();

  const [localDraft, setLocalDraft] = useState(null);
  const [saving, setSaving] = useState(false);
  const drawerRef = useRef(null);

  const isOpen = Boolean(cmsDrawerOpen);
  const { key, label } = cmsDrawerOpen || {};

  // Sync draft when a section is opened
  useEffect(() => {
    if (key && siteContent[key] !== undefined) {
      setLocalDraft(JSON.parse(JSON.stringify(siteContent[key]))); // deep clone
    } else {
      setLocalDraft(null);
    }
  }, [key, siteContent]);

  // Trap focus / close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleClose = () => {
    setCmsDrawerOpen(null);
    setLocalDraft(null);
  };

  const handleSave = async () => {
    if (!key || localDraft === null) return;
    setSaving(true);
    try {
      await updateSiteContent(key, localDraft);
      showToast(`✅ "${label}" updated and saved to Supabase!`);
      handleClose();
    } catch (err) {
      showToast(`Failed to save: ${err.message}`, 'error');
    } finally {
      setSaving(false);
    }
  };

  const EditorComponent = key ? EDITOR_MAP[key] : null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Edit ${label || 'Section'}`}
        className={`
          fixed top-0 right-0 z-[1000] h-full
          w-full sm:w-[520px] lg:w-[600px]
          bg-white shadow-2xl
          flex flex-col
          transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-gradient-to-r from-[#2E1C1A] to-[#4A2B5E] text-white shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close editor"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold-soft font-semibold opacity-80">
                Content Editor
              </p>
              <h2 className="font-serif text-lg font-medium leading-tight">
                {label || 'Edit Section'}
              </h2>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Editor Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {EditorComponent && localDraft !== null ? (
            <EditorComponent
              value={localDraft}
              onChange={setLocalDraft}
            />
          ) : (
            <div className="flex items-center justify-center h-40 text-stone-400 text-sm">
              {key && !EDITOR_MAP[key]
                ? `No editor available for "${key}" yet.`
                : 'Loading editor...'}
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="px-6 py-4 border-t border-stone-100 bg-stone-50 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={handleClose}
            className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-600 text-xs font-semibold hover:bg-stone-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || localDraft === null}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2E1C1A] via-[#4A2B5E] to-[#2E1C1A] text-white text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-all shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>{saving ? 'Saving...' : 'Save to Supabase'}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
