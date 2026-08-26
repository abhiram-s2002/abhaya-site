import React from 'react';
import { Field, Input, Textarea, SectionTitle, AddButton, RemoveButton, CardWrap } from './EditorFields';

/**
 * StoryEditor — Key: 'story_page'
 */
export default function StoryEditor({ value, onChange }) {
  const set = (f, v) => onChange({ ...value, [f]: v });
  const pillars = Array.isArray(value.pillars) ? value.pillars : [];
  const paragraphs = Array.isArray(value.genesis_paragraphs) ? value.genesis_paragraphs : [];

  const updatePillar = (idx, field, val) => {
    const updated = pillars.map((p, i) => i === idx ? { ...p, [field]: val } : p);
    set('pillars', updated);
  };
  const addPillar = () => set('pillars', [...pillars, { icon: 'sparkles', title: '', description: '' }]);
  const removePillar = (idx) => { if (pillars.length > 1) set('pillars', pillars.filter((_, i) => i !== idx)); };

  const updatePara = (idx, val) => set('genesis_paragraphs', paragraphs.map((p, i) => i === idx ? val : p));
  const addPara = () => set('genesis_paragraphs', [...paragraphs, '']);
  const removePara = (idx) => { if (paragraphs.length > 1) set('genesis_paragraphs', paragraphs.filter((_, i) => i !== idx)); };

  return (
    <div className="space-y-5">
      <SectionTitle>Page Header</SectionTitle>
      <Field label="Tag Line (small text above headline)">
        <Input value={value.tagline} onChange={v => set('tagline', v)} placeholder="Heritage & Manifesto" />
      </Field>
      <Field label="Main Headline">
        <Input value={value.headline} onChange={v => set('headline', v)} placeholder="The House of NOOR AL DHUHA" />
      </Field>
      <Field label="Subheading / Manifesto">
        <Textarea value={value.subheading} onChange={v => set('subheading', v)} rows={2} />
      </Field>

      <SectionTitle>Origin Story Section</SectionTitle>
      <Field label="Section Label">
        <Input value={value.genesis_label} onChange={v => set('genesis_label', v)} placeholder="The Genesis" />
      </Field>
      <Field label="Section Title">
        <Input value={value.genesis_title} onChange={v => set('genesis_title', v)} placeholder="Crafted in Reverence of Detail" />
      </Field>
      <Field label="Story Paragraphs">
        <div className="space-y-2">
          {paragraphs.map((para, idx) => (
            <div key={idx} className="relative">
              <Textarea value={para} onChange={v => updatePara(idx, v)} rows={3} placeholder={`Paragraph ${idx + 1}...`} />
              {paragraphs.length > 1 && (
                <button onClick={() => removePara(idx)} className="absolute top-1 right-1 text-red-400 hover:text-red-600 text-xs px-1">✕</button>
              )}
            </div>
          ))}
          <AddButton onClick={addPara} label="Add Paragraph" />
        </div>
      </Field>

      <SectionTitle>Stats</SectionTitle>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Stat 1 Value">
          <Input value={value.stat1_value} onChange={v => set('stat1_value', v)} placeholder="100%" />
        </Field>
        <Field label="Stat 1 Label">
          <Input value={value.stat1_label} onChange={v => set('stat1_label', v)} placeholder="Grade 6A Mulberry Silk" />
        </Field>
        <Field label="Stat 2 Value">
          <Input value={value.stat2_value} onChange={v => set('stat2_value', v)} placeholder="0%" />
        </Field>
        <Field label="Stat 2 Label">
          <Input value={value.stat2_label} onChange={v => set('stat2_label', v)} placeholder="Synthetic Fillers" />
        </Field>
      </div>

      <SectionTitle>Four Pillars of Excellence</SectionTitle>
      <Field label="Section Label">
        <Input value={value.pillars_label} onChange={v => set('pillars_label', v)} placeholder="Guiding Principles" />
      </Field>
      <Field label="Section Title">
        <Input value={value.pillars_title} onChange={v => set('pillars_title', v)} placeholder="The Four Pillars..." />
      </Field>
      <div className="space-y-3">
        {pillars.map((pillar, idx) => (
          <CardWrap key={idx}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-600">Pillar {idx + 1}</span>
              {pillars.length > 1 && <RemoveButton onClick={() => removePillar(idx)} />}
            </div>
            <Field label="Title">
              <Input value={pillar.title} onChange={v => updatePillar(idx, 'title', v)} placeholder="Pillar title" />
            </Field>
            <Field label="Description">
              <Textarea value={pillar.description} onChange={v => updatePillar(idx, 'description', v)} rows={2} />
            </Field>
          </CardWrap>
        ))}
        <AddButton onClick={addPillar} label="Add Pillar" />
      </div>
    </div>
  );
}
