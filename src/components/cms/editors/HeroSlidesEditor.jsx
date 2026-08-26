import React from 'react';
import { Field, Input, Textarea, SectionTitle, AddButton, RemoveButton, CardWrap } from './EditorFields';

/**
 * HeroSlidesEditor
 * Edits: hero_slides array on the HomePage carousel
 * Key: 'hero_slides'
 */
export default function HeroSlidesEditor({ value, onChange }) {
  // value is an array of slide objects
  const slides = Array.isArray(value) ? value : [];

  const updateSlide = (index, field, val) => {
    const updated = slides.map((s, i) => i === index ? { ...s, [field]: val } : s);
    onChange(updated);
  };

  const addSlide = () => {
    onChange([
      ...slides,
      {
        id: Date.now(),
        badge: 'NEW ARRIVAL',
        title: 'New Slide Title',
        description: 'Enter a description for this slide.',
        image: '',
        cta: 'SHOP NOW',
        productId: '',
      },
    ]);
  };

  const removeSlide = (index) => {
    if (slides.length <= 1) return; // always keep at least one
    onChange(slides.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-5">
      <SectionTitle>Hero Carousel Slides ({slides.length})</SectionTitle>

      <p className="text-[11px] text-stone-500 -mt-3">
        Drag-to-reorder coming soon. Images should be high-resolution landscape photos.
      </p>

      <div className="space-y-4">
        {slides.map((slide, idx) => (
          <CardWrap key={slide.id || idx}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-600">
                Slide {idx + 1}
              </span>
              {slides.length > 1 && <RemoveButton onClick={() => removeSlide(idx)} />}
            </div>

            {/* Image preview */}
            {slide.image && (
              <div className="w-full h-28 rounded-lg overflow-hidden bg-stone-200 mb-1">
                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              </div>
            )}

            <Field label="Image URL" hint="Paste a direct image URL (https://...)">
              <Input
                value={slide.image}
                onChange={v => updateSlide(idx, 'image', v)}
                placeholder="https://..."
              />
            </Field>

            <Field label="Badge Text" hint="Small uppercase tag above the title (e.g. NEW ARRIVAL)">
              <Input
                value={slide.badge}
                onChange={v => updateSlide(idx, 'badge', v)}
                placeholder="NEW ARRIVAL"
              />
            </Field>

            <Field label="Headline Title">
              <Input
                value={slide.title}
                onChange={v => updateSlide(idx, 'title', v)}
                placeholder="Slide Title"
              />
            </Field>

            <Field label="Description">
              <Textarea
                value={slide.description}
                onChange={v => updateSlide(idx, 'description', v)}
                rows={2}
                placeholder="Short description..."
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="CTA Button Text">
                <Input
                  value={slide.cta}
                  onChange={v => updateSlide(idx, 'cta', v)}
                  placeholder="SHOP NOW"
                />
              </Field>
              <Field label="Product ID (links CTA)">
                <Input
                  value={slide.productId}
                  onChange={v => updateSlide(idx, 'productId', v)}
                  placeholder="midnight-espresso-silk"
                />
              </Field>
            </div>
          </CardWrap>
        ))}
      </div>

      <AddButton onClick={addSlide} label="Add Slide" />
    </div>
  );
}
