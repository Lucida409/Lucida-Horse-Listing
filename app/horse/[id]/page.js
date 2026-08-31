import { supabase } from '@/lib/supabase';
import HorseCarousel from '@/components/HorseCarousel';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function HorseDetailPage({ params }) {
  const { data: horse, error } = await supabase
    .from('horses')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !horse) {
    notFound();
  }

  const sireLabelText = horse.sire_label === 'in_foal_to' ? 'In foal to' : 'Sired by';

  return (
    <main style={{ maxWidth: '480px', margin: '0 auto', padding: '1.5rem' }}>
      <Link href={horse.status === 'sold' ? '/sold' : '/for-sale'} style={{ color: '#fff', textDecoration: 'none' }}>
        ← Back
      </Link>

      <div className="glass-panel" style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
        <h1 style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '1.5rem' }}>
          {horse.name}
        </h1>

        <HorseCarousel images={horse.image_urls} alt={horse.name} />

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ flex: 1, lineHeight: 1.9, fontSize: '0.95rem' }}>
            <p>DOB: {formatDate(horse.dob)}</p>
            {horse.breed && <p>{horse.breed}</p>}
            {horse.gender && <p>{capitalize(horse.gender)}</p>}
            {horse.colour && <p>{horse.colour}</p>}
            {horse.height && <p>{horse.height}</p>}
            {horse.registration_status && <p>{horse.registration_status}</p>}
            {horse.training_status && <p>{horse.training_status}</p>}
          </div>

          {horse.sire_name && (
            <div style={{ flex: 1, textAlign: 'center', fontSize: '0.95rem' }}>
              <p>{sireLabelText}:</p>
              <p style={{ marginBottom: '0.6rem' }}>{horse.sire_name}</p>
              {horse.sire_photo_url && (
                <div style={{ position: 'relative', width: '100%', aspectRatio: '1', borderRadius: '10px', overflow: 'hidden' }}>
                  <Image src={horse.sire_photo_url} alt={horse.sire_name} fill style={{ objectFit: 'cover' }} />
                </div>
              )}
            </div>
          )}
        </div>

        {horse.description && (
          <p style={{ marginTop: '1.5rem', lineHeight: 1.7, fontSize: '0.95rem' }}>
            {horse.description}
          </p>
        )}

        <p style={{ textAlign: 'center', fontSize: '1.8rem', marginTop: '2rem' }}>
          {horse.status === 'sold'
            ? 'Sold'
            : horse.price
              ? `R${Number(horse.price).toLocaleString('en-ZA')}`
              : 'POA'}
        </p>
      </div>
    </main>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-ZA', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
