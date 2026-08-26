import React from 'react';
import { Field, Input, Textarea, SectionTitle } from './EditorFields';

/** NewsletterEditor — Key: 'newsletter' */
export default function NewsletterEditor({ value, onChange }) {
  const set = (f, v) => onChange({ ...value, [f]: v });
  return (
    <div className="space-y-5">
      <SectionTitle>VIP Newsletter Section</SectionTitle>
      <Field label="Badge Text">
        <Input value={value.badge} onChange={v => set('badge', v)} placeholder="JOIN THE ATELIER CIRCLE" />
      </Field>
      <Field label="Headline">
        <Input value={value.title} onChange={v => set('title', v)} placeholder="Receive Editorial Privileges..." />
      </Field>
      <Field label="Subtitle / Description">
        <Textarea value={value.subtitle} onChange={v => set('subtitle', v)} rows={3} placeholder="Sign up for private..." />
      </Field>
      <Field label="Button CTA Text">
        <Input value={value.ctaText} onChange={v => set('ctaText', v)} placeholder="Subscribe" />
      </Field>
    </div>
  );
}
