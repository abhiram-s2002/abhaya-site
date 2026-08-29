import React from 'react';
import { Field, Input, Textarea, SectionTitle, AddButton, RemoveButton, CardWrap } from './EditorFields';

/**
 * OffersEditor — Key: 'offers_page'
 * Edits the promo code cards array
 */
export default function OffersEditor({ value, onChange }) {
  const offers = Array.isArray(value) ? value : [];

  const update = (idx, field, val) =>
    onChange(offers.map((o, i) => i === idx ? { ...o, [field]: val } : o));

  const add = () => onChange([
    ...offers,
    {
      id: `offer-${Date.now()}`,
      code: 'NEWCODE',
      badge: 'SPECIAL OFFER',
      title: 'New Offer',
      description: 'Offer description',
      discount: '10% OFF',
      minSpend: 'No Minimum',
      expires: 'Ongoing',
      category: 'All',
      color: 'from-[#982476] to-[#180516]',
      accentBg: 'bg-royal-violet/10 text-royal-violet border-royal-violet/20',
    },
  ]);

  const remove = (idx) => { if (offers.length > 1) onChange(offers.filter((_, i) => i !== idx)); };

  return (
    <div className="space-y-5">
      <SectionTitle>Promo Code Cards ({offers.length})</SectionTitle>

      <div className="space-y-4">
        {offers.map((offer, idx) => (
          <CardWrap key={offer.id || idx}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-600">Offer {idx + 1}</span>
              {offers.length > 1 && <RemoveButton onClick={() => remove(idx)} />}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Promo Code">
                <Input value={offer.code} onChange={v => update(idx, 'code', v)} placeholder="ELEGANCE10" />
              </Field>
              <Field label="Discount Label">
                <Input value={offer.discount} onChange={v => update(idx, 'discount', v)} placeholder="10% OFF" />
              </Field>
            </div>

            <Field label="Badge Text">
              <Input value={offer.badge} onChange={v => update(idx, 'badge', v)} placeholder="WELCOME OFFER" />
            </Field>
            <Field label="Offer Title">
              <Input value={offer.title} onChange={v => update(idx, 'title', v)} placeholder="10% Off Your First Order" />
            </Field>
            <Field label="Description">
              <Textarea value={offer.description} onChange={v => update(idx, 'description', v)} rows={2} placeholder="Offer description..." />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Min Spend">
                <Input value={offer.minSpend} onChange={v => update(idx, 'minSpend', v)} placeholder="No Minimum" />
              </Field>
              <Field label="Expiry">
                <Input value={offer.expires} onChange={v => update(idx, 'expires', v)} placeholder="Ongoing" />
              </Field>
            </div>
            <Field label="Category">
              <Input value={offer.category} onChange={v => update(idx, 'category', v)} placeholder="All" />
            </Field>
          </CardWrap>
        ))}
      </div>

      <AddButton onClick={add} label="Add Offer Card" />
    </div>
  );
}
