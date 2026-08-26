import React from 'react';
import { Field, Input, SectionTitle } from './EditorFields';

/** FooterEditor — Key: 'footer_content' */
export default function FooterEditor({ value, onChange }) {
  const set = (f, v) => onChange({ ...value, [f]: v });
  return (
    <div className="space-y-5">
      <SectionTitle>Footer</SectionTitle>
      <Field label="Brand Name">
        <Input value={value.brand_name} onChange={v => set('brand_name', v)} placeholder="NOOR AL DHUHA" />
      </Field>
      <Field label="Copyright Text">
        <Input value={value.copyright} onChange={v => set('copyright', v)} placeholder="© 2024 NOOR AL DHUHA. ALL RIGHTS RESERVED." />
      </Field>
    </div>
  );
}
