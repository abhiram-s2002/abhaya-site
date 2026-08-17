import React from 'react';
import { useShop } from '../context/ShopContext';

export default function Footer() {
  const { navigateTo } = useShop();

  return (
    <footer className="w-full bg-surface-container-low border-t border-tertiary/10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-grid-gutter px-mobile-margin md:px-content-margin py-16 md:py-24 max-w-container-max mx-auto">
        
        {/* Brand Column */}
        <div className="flex flex-col space-y-6 md:col-span-1">
          <button
            onClick={() => navigateTo('home')}
            className="font-display-lg text-headline-md text-primary text-left inline-block hover:opacity-80 transition-opacity"
          >
            HAYAT
          </button>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xs">
            Elevating the art of modest luxury. Join our inner circle for early access to limited collections and exclusive editorial content.
          </p>
        </div>

        {/* Links Column 1: Shop */}
        <div className="flex flex-col space-y-4 md:col-start-3">
          <h4 className="font-label-sm text-primary uppercase tracking-widest mb-2 font-semibold">
            Shop
          </h4>
          <button
            onClick={() => navigateTo('shop')}
            className="font-body-md text-body-md text-on-surface-variant hover:underline text-left transition-all opacity-100 hover:opacity-80"
          >
            All Hijabs
          </button>
          <button
            onClick={() => navigateTo('shop', null, 'Chiffon')}
            className="font-body-md text-body-md text-on-surface-variant hover:underline text-left transition-all opacity-100 hover:opacity-80"
          >
            Everyday Collection
          </button>
          <button
            onClick={() => navigateTo('shop', null, 'Silk')}
            className="font-body-md text-body-md text-on-surface-variant hover:underline text-left transition-all opacity-100 hover:opacity-80"
          >
            Occasion Collection
          </button>
          <button
            onClick={() => navigateTo('violet-edition')}
            className="font-body-md text-body-md text-royal-violet hover:underline text-left transition-all opacity-100 hover:opacity-80 font-medium"
          >
            The Violet Edition
          </button>
        </div>

        {/* Links Column 2: Company */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-label-sm text-primary uppercase tracking-widest mb-2 font-semibold">
            Company
          </h4>
          <button
            onClick={() => navigateTo('story')}
            className="font-body-md text-body-md text-on-surface-variant hover:underline text-left transition-all opacity-100 hover:opacity-80"
          >
            Our Story & Atelier
          </button>
          <button
            onClick={() => navigateTo('story')}
            className="font-body-md text-body-md text-on-surface-variant hover:underline text-left transition-all opacity-100 hover:opacity-80"
          >
            Shipping & Returns
          </button>
          <button
            onClick={() => navigateTo('story')}
            className="font-body-md text-body-md text-on-surface-variant hover:underline text-left transition-all opacity-100 hover:opacity-80"
          >
            Sustainability
          </button>
          <button
            onClick={() => navigateTo('story')}
            className="font-body-md text-body-md text-on-surface-variant hover:underline text-left transition-all opacity-100 hover:opacity-80"
          >
            Wholesale
          </button>
        </div>

      </div>

      {/* Copyright Bottom */}
      <div className="px-mobile-margin md:px-content-margin pb-12 max-w-container-max mx-auto border-t border-tertiary/10 pt-8 mt-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
          © 2024 HAYAT. ALL RIGHTS RESERVED.
        </p>
        <div className="flex items-center gap-6 text-on-surface-variant">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">photo_camera</span>
          </a>
          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Pinterest"
            className="hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">push_pin</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
