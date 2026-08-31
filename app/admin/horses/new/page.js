'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-browser';

export default function AddHorse() {
  const router = useRouter();
  const supabase = createClient();

  const [form, setForm] = useState({
    name: '',
    dob: '',
    breed: '',
    gender: 'stallion',
    colour: '',
    height: '',
    registration_status: '',
    training_status: '',
    description: '',
    sire_label: 'sired_by',
    sire_name: '',
    price: '',
    status: 'for_sale',
  });

  const [horseImages, setHorseImages] = useState([]); // File objects
  const [sirePhoto, setSirePhoto] = useState(null); // File object
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const updateField = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleHorseImages = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    setHorseImages(files);
  };

  const uploadFile = async (file, folder) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('horse-images')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('horse-images').getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.dob || !form.breed) {
      setError('Name, Date of Birth, and Breed are required.');
      return;
    }

    setSaving(true);

    try {
      const imageUrls = [];
      for (const file of horseImages) {
        const url = await uploadFile(file, 'horses');
        imageUrls.push(url);
      }

      let sirePhotoUrl = null;
      if (sirePhoto) {
        sirePhotoUrl = await uploadFile(sirePhoto, 'sires');
      }

      const { error: insertError } = await supabase.from('horses').insert({
        name: form.name,
        dob: form.dob,
        breed: form.breed,
        gender: form.gender,
        colour: form.colour || null,
        height: form.height || null,
        registration_status: form.registration_status || null,
        training_status: form.training_status || null,
        description: form.description || null,
        sire_label: form.sire_name ? form.sire_label : null,
        sire_name: form.sire_name || null,
        sire_photo_url: sirePhotoUrl,
        image_urls: imageUrls.length > 0 ? imageUrls : null,
        price: form.price ? Number(form.price) : null,
        status: form.status,
      });

      if (insertError) throw insertError;

      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setSaving(false);
    }
  };

  return (
    <main style={{ maxWidth: '480px', margin: '0 auto', padding: '1.5rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.6rem' }}>
        Add Horse
      </h1>

      <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '1.5rem' }}>
        <Field label="Name *">
          <input style={inputStyle} value={form.name} onChange={(e) => updateField('name', e.target.value)} required />
        </Field>

        <Field label="Date of Birth *">
          <input type="date" style={inputStyle} value={form.dob} onChange={(e) => updateField('dob', e.target.value)} required />
        </Field>

        <Field label="Breed *">
          <input style={inputStyle} value={form.breed} onChange={(e) => updateField('breed', e.target.value)} required />
        </Field>

        <Field label="Gender">
          <select style={inputStyle} value={form.gender} onChange={(e) => updateField('gender', e.target.value)}>
            <option value="stallion">Stallion</option>
            <option value="mare">Mare</option>
            <option value="filly">Filly</option>
            <option value="colt">Colt</option>
          </select>
        </Field>

        <Field label="Colour">
          <input style={inputStyle} value={form.colour} onChange={(e) => updateField('colour', e.target.value)} />
        </Field>

        <Field label="Height / Estimated mature height">
          <input style={inputStyle} value={form.height} onChange={(e) => updateField('height', e.target.value)} />
        </Field>

        <Field label="Registration Status">
          <input style={inputStyle} value={form.registration_status} onChange={(e) => updateField('registration_status', e.target.value)} />
        </Field>

        <Field label="Training Status">
          <input style={inputStyle} value={form.training_status} onChange={(e) => updateField('training_status', e.target.value)} />
        </Field>

        <Field label="Description">
          <textarea style={{ ...inputStyle, minHeight: '100px' }} value={form.description} onChange={(e) => updateField('description', e.target.value)} />
        </Field>

        <Field label="Sired by / In foal to">
          <select style={inputStyle} value={form.sire_label} onChange={(e) => updateField('sire_label', e.target.value)}>
            <option value="sired_by">Sired by</option>
            <option value="in_foal_to">In foal to</option>
          </select>
        </Field>

        <Field label="Sire / In foal to — Name">
          <input style={inputStyle} value={form.sire_name} onChange={(e) => updateField('sire_name', e.target.value)} />
        </Field>

        <Field label="Sire / In foal to — Photo">
          <input type="file" accept="image/*" style={inputStyle} onChange={(e) => setSirePhoto(e.target.files[0] || null)} />
        </Field>

        <Field label="Horse Photos (1–4)">
          <input type="file" accept="image/*" multiple style={inputStyle} onChange={handleHorseImages} />
          {horseImages.length > 0 && (
            <p style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '-0.8rem', marginBottom: '1.2rem' }}>
              {horseImages.length} photo{horseImages.length > 1 ? 's' : ''} selected
            </p>
          )}
        </Field>

        <Field label="Selling Price (R)">
          <input type="number" style={inputStyle} value={form.price} onChange={(e) => updateField('price', e.target.value)} />
        </Field>

        <Field label="Status">
          <select style={inputStyle} value={form.status} onChange={(e) => updateField('status', e.target.value)}>
            <option value="for_sale">For Sale</option>
            <option value="sold">Sold</option>
          </select>
        </Field>

        {error && <p style={{ color: '#ffb3b3', marginBottom: '1rem' }}>{error}</p>}

        <button type="submit" disabled={saving} style={buttonStyle}>
          {saving ? 'Saving…' : 'Add Horse'}
        </button>
      </form>
    </main>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: '1.2rem' }}>
      <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem', opacity: 0.85 }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '0.7rem',
  background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: '10px', color: '#fff', fontFamily: 'inherit', fontSize: '1rem',
};
const buttonStyle = {
  width: '100%', padding: '0.9rem', background: 'rgba(255,255,255,0.9)',
  color: '#333', border: 'none', borderRadius: '999px', fontSize: '1rem',
  fontFamily: 'inherit', cursor: 'pointer',
};
