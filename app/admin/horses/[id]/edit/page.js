'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase-browser';

export default function EditHorse() {
  const router = useRouter();
  const params = useParams();
  const supabase = createClient();
  const horseId = params.id;

  const [form, setForm] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [existingSirePhoto, setExistingSirePhoto] = useState(null);
  const [horseImages, setHorseImages] = useState([]);
  const [sirePhoto, setSirePhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [togglingStatus, setTogglingStatus] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadHorse = async () => {
      const { data, error } = await supabase
        .from('horses')
        .select('*')
        .eq('id', horseId)
        .single();

      if (error || !data) {
        setError('Could not load this horse.');
        setLoading(false);
        return;
      }

      setForm({
        name: data.name || '',
        dob: data.dob || '',
        breed: data.breed || '',
        gender: data.gender || 'stallion',
        colour: data.colour || '',
        height: data.height || '',
        registration_status: data.registration_status || '',
        training_status: data.training_status || '',
        description: data.description || '',
        sire_label: data.sire_label || 'sired_by',
        sire_name: data.sire_name || '',
        price: data.price ?? '',
        status: data.status || 'for_sale',
      });
      setExistingImages(data.image_urls || []);
      setExistingSirePhoto(data.sire_photo_url || null);
      setLoading(false);
    };

    loadHorse();
  }, [horseId]);

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

  const handleQuickStatusToggle = async () => {
    setTogglingStatus(true);
    const newStatus = form.status === 'for_sale' ? 'sold' : 'for_sale';

    const { error } = await supabase
      .from('horses')
      .update({ status: newStatus })
      .eq('id', horseId);

    setTogglingStatus(false);

    if (error) {
      setError('Could not update status.');
      return;
    }

    updateField('status', newStatus);
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
      let imageUrls = existingImages;
      if (horseImages.length > 0) {
        imageUrls = [];
        for (const file of horseImages) {
          const url = await uploadFile(file, 'horses');
          imageUrls.push(url);
        }
      }

      let sirePhotoUrl = existingSirePhoto;
      if (sirePhoto) {
        sirePhotoUrl = await uploadFile(sirePhoto, 'sires');
      }

      const { error: updateError } = await supabase
        .from('horses')
        .update({
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
        })
        .eq('id', horseId);

      if (updateError) throw updateError;

      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main style={{ maxWidth: '480px', margin: '0 auto', padding: '1.5rem', textAlign: 'center' }}>
        <p>Loading…</p>
      </main>
    );
  }

  if (!form) {
    return (
      <main style={{ maxWidth: '480px', margin: '0 auto', padding: '1.5rem', textAlign: 'center' }}>
        <p>{error || 'Horse not found.'}</p>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: '480px', margin: '0 auto', padding: '1.5rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.6rem' }}>
        Edit Horse
      </h1>

      {/* Quick status toggle */}
      <button
        onClick={handleQuickStatusToggle}
        disabled={togglingStatus}
        className="glass-panel"
        style={{
          width: '100%', padding: '0.9rem', marginBottom: '1.5rem',
          background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none',
          borderRadius: '999px', fontFamily: 'inherit', fontSize: '1rem', cursor: 'pointer',
        }}
      >
        {togglingStatus
          ? 'Updating…'
          : form.status === 'for_sale'
            ? '✓ Mark as Sold'
            : '↩ Move Back to For Sale'}
      </button>

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
          {existingSirePhoto && !sirePhoto && (
            <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.5rem' }}>
              Current photo on file — choose a new one only to replace it
            </p>
          )}
          <input type="file" accept="image/*" style={inputStyle} onChange={(e) => setSirePhoto(e.target.files[0] || null)} />
        </Field>

        <Field label="Horse Photos (1–4)">
          {existingImages.length > 0 && horseImages.length === 0 && (
            <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.5rem' }}>
              {existingImages.length} existing photo{existingImages.length > 1 ? 's' : ''} on file — choose new ones only to replace them all
            </p>
          )}
          <input type="file" accept="image/*" multiple style={inputStyle} onChange={handleHorseImages} />
          {horseImages.length > 0 && (
            <p style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '0.5rem' }}>
              {horseImages.length} new photo{horseImages.length > 1 ? 's' : ''} selected — will replace existing
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
          {saving ? 'Saving…' : 'Save Changes'}
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
