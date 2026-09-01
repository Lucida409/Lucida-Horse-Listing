import { supabase } from '@/lib/supabase';
import HorseCard from '@/components/HorseCard';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SearchPage({ searchParams }) {
  const q = searchParams?.q?.trim() || '';

  let horses = [];
  let error = null;

  if (q) {
    const result = await supabase
      .from('horses')
      .select('*')
      .or(`name.ilike.%${q}%,colour.ilike.%${q}%,breed.ilike.%${q}%,gender.ilike.%${q}%`)
      .order('created_at', { ascending: false });

    horses = result.data || [];
    error = result.error;
  }

  return (
    <main style={{ maxWidth: '480px', margin: '0 auto', padding: '1.5rem' }}>
      <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>← Home</Link>
      <h1 style={{ margin: '1.5rem 0', fontSize: '1.6rem', textAlign: 'center' }}>
        Search Results{q ? ` — "${q}"` : ''}
      </h1>

      {error && <p>Something went wrong searching horses.</p>}
      {!error && horses.length === 0 && (
        <p style={{ textAlign: 'center', opacity: 0.8 }}>No horses found matching "{q}".</p>
      )}

      {horses.map((horse) => (
        <HorseCard key={horse.id} horse={horse} showPrice={horse.status === 'for_sale'} />
      ))}
    </main>
  );
}
