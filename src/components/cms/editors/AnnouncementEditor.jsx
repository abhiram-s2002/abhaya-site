import React from 'react';
import { Field, Input, Textarea, Toggle, SectionTitle } from './EditorFields';

/**
 * AnnouncementEditor
 * Edits: src/components/AnnouncementBar.jsx content
 * Key: 'announcement'
 */
export default function AnnouncementEditor({ value, onChange }) {
  const set = (field, val) => onChange({ ...value, [field]: val });

  return (
    <div className="space-y-5">
      <SectionTitle>Announcement Bar</SectionTitle>

      <Field label="Enable Bar" hint="Hide or show the top announcement bar globally.">
        <Toggle
          label={value.enabled ? 'Bar is visible' : 'Bar is hidden'}
          checked={Boolean(value.enabled)}
          onChange={v => set('enabled', v)}
        />
      </Field>

      <Field label="Left Text (desktop only)" hint="Short perk text shown on the left side.">
        <Input
          value={value.leftText}
          onChange={v => set('leftText', v)}
          placeholder="e.g. Complimentary Silk Gift Box on Orders $150+"
        />
      </Field>

      <Field label="Center Badge" hint="Bold highlighted word at the start of the center message.">
        <Input
          value={value.centerBadge}
          onChange={v => set('centerBadge', v)}
          placeholder="e.g. The Violet Edition:"
        />
      </Field>

      <Field label="Center Text" hint="Main announcement message shown center on all screen sizes.">
        <Input
          value={value.centerText}
          onChange={v => set('centerText', v)}
          placeholder="e.g. Limited Mulberry Silk & Amethyst Drapes"
        />
      </Field>

      <Field label="Right Badge (large screens)" hint="Short trust badge on the right side.">
        <Input
          value={value.rightBadge}
          onChange={v => set('rightBadge', v)}
          placeholder="e.g. Worldwide Express"
        />
      </Field>

      <Field label="Free Shipping Threshold ($)" hint="Amount above which free shipping is offered.">
        <Input
          type="number"
          value={value.thresholdAmount}
          onChange={v => set('thresholdAmount', Number(v))}
          placeholder="150"
        />
      </Field>
    </div>
  );
}
