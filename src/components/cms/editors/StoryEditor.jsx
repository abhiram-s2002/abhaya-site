import React from 'react';
import { Field, Input, Textarea, SectionTitle, AddButton, RemoveButton, CardWrap } from './EditorFields';

/**
 * StoryEditor — Key: 'story_page'
 */
export default function StoryEditor({ value, onChange }) {
  const set = (f, v) => onChange({ ...value, [f]: v });
  const pillars = Array.isArray(value.pillars) ? value.pillars : [];
  const paragraphs = Array.isArray(value.genesis_paragraphs) ? value.genesis_paragraphs : [];
  const services = Array.isArray(value.services) ? value.services : [];

  const updatePillar = (idx, field, val) => {
    const updated = pillars.map((p, i) => i === idx ? { ...p, [field]: val } : p);
    set('pillars', updated);
  };
  const addPillar = () => set('pillars', [...pillars, { icon: 'sparkles', title: '', description: '' }]);
  const removePillar = (idx) => { if (pillars.length > 1) set('pillars', pillars.filter((_, i) => i !== idx)); };

  const updateService = (idx, field, val) => {
    const updated = services.map((s, i) => i === idx ? { ...s, [field]: val } : s);
    set('services', updated);
  };
  const addService = () => set('services', [...services, { icon: 'scissors', title: '', description: '' }]);
  const removeService = (idx) => { if (services.length > 1) set('services', services.filter((_, i) => i !== idx)); };

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
      <Field label="Subheading / Motto">
        <Textarea value={value.subheading} onChange={v => set('subheading', v)} rows={2} />
      </Field>

      <SectionTitle>About Us Section</SectionTitle>
      <Field label="Section Label">
        <Input value={value.about_label} onChange={v => set('about_label', v)} placeholder="About Us" />
      </Field>
      <Field label="About Title">
        <Input value={value.about_title} onChange={v => set('about_title', v)} placeholder="Elegance, Precision & Accessible Luxury" />
      </Field>
      <Field label="About Text">
        <Textarea value={value.about_text} onChange={v => set('about_text', v)} rows={3} placeholder="At NOOR AL DHUHA, we bring you..." />
      </Field>
      <Field label="Brand Motto">
        <Input value={value.motto} onChange={v => set('motto', v)} placeholder="Noor in Every Thread, Wear It with Pride." />
      </Field>

      <SectionTitle>What We Do Section</SectionTitle>
      <Field label="Section Label">
        <Input value={value.what_we_do_label} onChange={v => set('what_we_do_label', v)} placeholder="What We Do" />
      </Field>
      <Field label="Section Title">
        <Input value={value.what_we_do_title} onChange={v => set('what_we_do_title', v)} placeholder="Tailored Excellence from Atelier to Wardrobe" />
      </Field>
      <div className="space-y-3">
        {services.map((srv, idx) => (
          <CardWrap key={idx}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-600">Service {idx + 1}</span>
              {services.length > 1 && <RemoveButton onClick={() => removeService(idx)} />}
            </div>
            <Field label="Title">
              <Input value={srv.title} onChange={v => updateService(idx, 'title', v)} placeholder="Service Title" />
            </Field>
            <Field label="Description">
              <Textarea value={srv.description} onChange={v => updateService(idx, 'description', v)} rows={2} />
            </Field>
          </CardWrap>
        ))}
        <AddButton onClick={addService} label="Add Service Card" />
      </div>

      <SectionTitle>Mission & Vision Section</SectionTitle>
      <Field label="Section Label">
        <Input value={value.mission_label} onChange={v => set('mission_label', v)} placeholder="Mission & Vision" />
      </Field>
      <Field label="Mission Title">
        <Input value={value.mission_title} onChange={v => set('mission_title', v)} placeholder="Our Mission" />
      </Field>
      <Field label="Mission Statement">
        <Textarea value={value.mission_text} onChange={v => set('mission_text', v)} rows={3} placeholder="To empower women..." />
      </Field>
      <Field label="Vision Title">
        <Input value={value.vision_title} onChange={v => set('vision_title', v)} placeholder="Our Vision" />
      </Field>
      <Field label="Vision Statement">
        <Textarea value={value.vision_text} onChange={v => set('vision_text', v)} rows={3} placeholder="To become a leading..." />
      </Field>

      <SectionTitle>Origin Story / Genesis</SectionTitle>
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

      <SectionTitle>Meet Our Co-Founders</SectionTitle>
      <Field label="Section Label / Kicker">
        <Input value={value.founders_label} onChange={v => set('founders_label', v)} placeholder="Meet Our Co-Founders" />
      </Field>
      <Field label="Founders Names">
        <Input value={value.founders_names} onChange={v => set('founders_names', v)} placeholder="Rafique & Kamarunnisa" />
      </Field>
      <Field label="Founders Role / Subtitle">
        <Input value={value.founders_role} onChange={v => set('founders_role', v)} placeholder="Founders & Visionaries" />
      </Field>
      <Field label="Founders Portrait Image URL (leave empty to use default photo)">
        <Input value={value.founders_image} onChange={v => set('founders_image', v)} placeholder="https://... or /src/assets/founders.png" />
      </Field>
      <Field label="Founders Story / Bio">
        <Textarea value={value.founders_bio} onChange={v => set('founders_bio', v)} rows={4} placeholder="For Rafique M U and Kamarunnisa K A, abayas are..." />
      </Field>
      <Field label="Featured Quote">
        <Input value={value.founders_quote} onChange={v => set('founders_quote', v)} placeholder="Abayas are more than just garments..." />
      </Field>

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
