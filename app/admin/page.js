'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase-browser';

export default function AdminDashboard() {
  const [tab, setTab] = useState('for_sale');
  const [horses, setHorses] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const loadHorses = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('horses')
      .select('*')
      .eq('status', tab)
      .order('created_at', { ascending: false });
    setHorses(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadHorses();
  }, [tab]);

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(`Delete ${name}? This cannot be undone.`);
    if (!confirmed) return;

    await supabase.from('horses').delete().eq('id', id);
    loadHorses();
  };

  return (
    <main style={{ maxWidth: '480px', margin: '0 auto', padding: '1.5rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.6rem' }}>
        Admin Dashboard
      </h1>

      <Link
        href="/admin/horses/new"
        style={{
          display: 'block', textAlign: 'center', padding: '0.9rem',
          background: 'rgba(255,255,255,0.9)', color: '#333',
          borderRadius: '999px', textDecoration: 'none', marginBottom: '1.5rem',
          fontSize: '1.05rem',
        }}
      >
        + Add Horse
      </Link>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <TabButton active={tab === 'for_sale'} onClick={() => setTab('for_sale')}>
          For Sale
        </TabButton>
        <TabButton active={tab === 'sold'} onClick={() => setTab('sold')}>
          Sold
        </TabButton>
      </div>

      {loading && <p style={{ textAlign: 'center', opacity: 0.8 }}>Loading…</p>}
      {!loading && horses.length === 0 && (
        <p style={{ textAlign: 'center', opacity: 0.8 }}>No horses in this list yet.</p>
      )}

      {horses.map((horse) => (
        <div key={horse.id} className="glass-panel" style={{
          display: 'flex', alignItems: 'center', gap: '0.8rem',
          padding: '0.8rem', marginBottom: '1rem',
        }}>
          <div style={{ width: '60px', height: '60px', position: 'relative', flexShrink: 0 }}>
            {horse.image_urls?.[0] ? (
              <Image src={horse.image_urls[0]} alt={horse.name} fill style={{ objectFit: 'contain' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }} />
            )}
          </div>

          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 700 }}>{horse.name}</p>
            <p style={{ fontSize: '0.85rem', opacity: 0.85 }}>
              {capitalize(horse.gender)} {horse.price ? `· R${Number(horse.price).toLocaleString('en-ZA')}` : ''}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <Link href={`/admin/horses/${horse.id}/edit`} style={smallButtonStyle}>
              Edit
            </Link>
            <button onClick={() => handleDelete(horse.id, horse.name)} style={{ ...smallButtonStyle, cursor: 'pointer' }}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </main>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1, padding: '0.8rem', borderRadius: '999px', border: 'none',
        background: active ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.1)',
        color: active ? '#333' : '#fff', fontFamily: 'inherit', fontSize: '1rem',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

function capitalize(word) {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const smallButtonStyle = {
  display: 'block', textAlign: 'center', padding: '0.4rem 0.8rem',
  background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: '8px',
  textDecoration: 'none', fontSize: '0.85rem', border: 'none', fontFamily: 'inherit',
};

