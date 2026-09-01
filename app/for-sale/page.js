import { supabase } from '@/lib/supabase';
import HorseCard from '@/components/HorseCard';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ForSalePage({ searchParams }) {
  const gender = searchParams?.gender;

  let query = supabase
    .from('horses')
    .select('*')
    .eq('status', 'for_sale')
    .order('created_at', { ascending: false });

  if (gender) {
    query = query.eq('gender', gender);
  }

  const { data: horses, error } = await query;

  return (
    <main style={{ maxWidth: '480px', margin: '0 auto', padding: '1.5rem' }}>
      <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>← Home</Link>
      <h1 style={{ margin: '1.5rem 0', fontSize: '1.6rem', textAlign: 'center' }}>
        Horses For Sale{gender ? ` — ${capitalize(gender)}s` : ''}
      </h1>

      {error && <p>Something went wrong loading horses.</p>}
      {horses?.length === 0 && <p style={{ textAlign: 'center', opacity: 0.8 }}>No horses found.</p>}

      {horses?.map((horse) => (
        <HorseCard key={horse.id} horse={horse} showPrice />
      ))}
    </main>
  );
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
