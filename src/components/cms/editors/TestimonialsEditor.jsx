import React from 'react';
import { Field, Input, Textarea, SectionTitle, AddButton, RemoveButton, CardWrap } from './EditorFields';

/**
 * TestimonialsEditor
 * Key: 'testimonials'
 */
export default function TestimonialsEditor({ value, onChange }) {
  const items = Array.isArray(value) ? value : [];

  const update = (idx, field, val) => {
    onChange(items.map((t, i) => i === idx ? { ...t, [field]: val } : t));
  };

  const add = () => onChange([...items, { id: Date.now(), review: '', author: '', location: '' }]);
  const remove = (idx) => { if (items.length > 1) onChange(items.filter((_, i) => i !== idx)); };

  return (
    <div className="space-y-5">
      <SectionTitle>Testimonials ({items.length})</SectionTitle>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <CardWrap key={item.id || idx}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-600">Review {idx + 1}</span>
              {items.length > 1 && <RemoveButton onClick={() => remove(idx)} />}
            </div>
            <Field label="Review Text">
              <Textarea value={item.review} onChange={v => update(idx, 'review', v)} rows={3} placeholder="Customer review..." />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Author Name">
                <Input value={item.author} onChange={v => update(idx, 'author', v)} placeholder="Sarah Al-Mansoor" />
              </Field>
              <Field label="Location">
                <Input value={item.location} onChange={v => update(idx, 'location', v)} placeholder="Dubai" />
              </Field>
            </div>
          </CardWrap>
        ))}
      </div>
      <AddButton onClick={add} label="Add Testimonial" />
    </div>
  );
}
