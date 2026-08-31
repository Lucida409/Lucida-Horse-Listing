import { supabase } from '@/lib/supabase';
import HorseCard from '@/components/HorseCard';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function SoldPage() {
  const { data: horses, error } = await supabase
    .from('horses')
    .select('*')
    .eq('status', 'sold')
    .order('created_at', { ascending: false });

  return (
    <main style={{ maxWidth: '480px', margin: '0 auto', padding: '1.5rem' }}>
      <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>← Home</Link>
      <h1 style={{ margin: '1.5rem 0', fontSize: '1.6rem', textAlign: 'center' }}>
        Horses Sold
      </h1>

      {error && <p>Something went wrong loading horses.</p>}
      {horses?.length === 0 && <p style={{ textAlign: 'center', opacity: 0.8 }}>No horses yet.</p>}

      {horses?.map((horse) => (
        <HorseCard key={horse.id} horse={horse} showPrice={false} />
      ))}
    </main>
  );
}
