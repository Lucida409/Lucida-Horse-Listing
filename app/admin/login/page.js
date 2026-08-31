'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setError('Invalid email or password.');
      return;
    }

    router.push('/admin');
    router.refresh();
  };

  return (
    <main style={{ maxWidth: '400px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.6rem' }}>
        Admin Login
      </h1>

      <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '1.5rem' }}>
        <label style={labelStyle}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />

        <label style={labelStyle}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        {error && <p style={{ color: '#ffb3b3', marginBottom: '1rem' }}>{error}</p>}

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? 'Logging in…' : 'Log In'}
        </button>
      </form>
    </main>
  );
}

const labelStyle = { display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem', opacity: 0.85 };
const inputStyle = {
  width: '100%', padding: '0.7rem', marginBottom: '1.2rem',
  background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: '10px', color: '#fff', fontFamily: 'inherit', fontSize: '1rem',
};
const buttonStyle = {
  width: '100%', padding: '0.9rem', background: 'rgba(255,255,255,0.9)',
  color: '#333', border: 'none', borderRadius: '999px', fontSize: '1rem',
  fontFamily: 'inherit', cursor: 'pointer',
};
