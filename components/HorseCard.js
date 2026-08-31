import Link from 'next/link';
import Image from 'next/image';

export default function HorseCard({ horse, showPrice }) {
  const coverImage = horse.image_urls?.[0];

  return (
    <Link
      href={`/horse/${horse.id}`}
      className="glass-panel"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        marginBottom: '1.25rem',
        textDecoration: 'none',
        color: '#fff',
      }}
    >
      <div style={{ width: '110px', height: '110px', position: 'relative', flexShrink: 0 }}>
        {coverImage ? (
          <Image
            src={coverImage}
            alt={horse.name}
            fill
            style={{ objectFit: 'contain' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }} />
        )}
      </div>

      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.2rem' }}>
          {horse.name}
        </h2>
        <p style={{ opacity: 0.85, marginBottom: '0.8rem' }}>{horse.breed}</p>
        <p style={{ textAlign: 'right', fontSize: '1.1rem' }}>
          {showPrice
            ? (horse.price ? `R${Number(horse.price).toLocaleString('en-ZA')}` : 'POA')
            : 'Sold'}
        </p>
      </div>
    </Link>
  );
}
