import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main style={{ maxWidth: '480px', margin: '0 auto', padding: '1.5rem' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <NavMenu />
        <h1 style={{ fontSize: '1.8rem', letterSpacing: '2px', textAlign: 'center', flex: 1 }}>
          LUCIDA FARM
        </h1>
      </div>

      {/* Search bar */}
      <SearchBar />

      {/* Hero banner */}
      <div className="glass-panel" style={{ padding: '2rem', margin: '2rem 0', position: 'relative', overflow: 'hidden' }}>
        <h2 style={{ fontSize: '2rem', lineHeight: 1.3, fontWeight: 700, position: 'relative', zIndex: 1 }}>
          Bringing You<br />Colour &amp;<br />Athleticism
        </h2>
        <div style={{ position: 'relative', width: '100%', height: '220px', marginTop: '1rem' }}>
          <Image
            src="/hero-horse.png"
            alt="Lucida Farm horse"
            fill
            style={{ objectFit: 'contain', objectPosition: 'right center' }}
          />
        </div>
      </div>

      {/* Horses For Sale / Sold buttons */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/for-sale" className="glass-panel" style={pillButtonStyle}>
          Horses For Sale
        </Link>
        <Link href="/sold" className="glass-panel" style={pillButtonStyle}>
          Horses Sold
        </Link>
      </div>

      {/* Quick links */}
      <p style={{ textAlign: 'center', marginBottom: '1rem', opacity: 0.9 }}>
        Quick Links (Horses for Sale)
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
        <Link href="/for-sale?gender=stallion" className="glass-panel" style={pillButtonStyle}>Stallions</Link>
        <Link href="/for-sale?gender=mare" className="glass-panel" style={pillButtonStyle}>Mares</Link>
        <Link href="/for-sale?gender=filly" className="glass-panel" style={pillButtonStyle}>Fillies</Link>
        <Link href="/for-sale?gender=colt" className="glass-panel" style={pillButtonStyle}>Colts</Link>
      </div>

      {/* Footer */}
      <div className="glass-panel" style={{ padding: '1.5rem', fontSize: '0.95rem', lineHeight: 1.8 }}>
        <p style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <HomeIcon /> Bloemfontein, Free State, South Africa
        </p>
        <p style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginTop: '1rem' }}>
          <span style={{ marginTop: '0.15rem' }}><PersonIcon /></span>
          <span>
            Agents:<br />
            Joey: (+27) 79 019 3590<br />
            Este: (+27) 73 838 8498<br />
            Shelishah: (+27) 79 150 2146
          </span>
        </p>
      </div>
    </main>
  );
}

const pillButtonStyle = {
  flex: 1,
  display: 'block',
  textAlign: 'center',
  padding: '1rem',
  color: '#fff',
  textDecoration: 'none',
  fontSize: '1.1rem',
  borderRadius: '999px',
};

function NavMenu() {
  return (
    <details style={{ position: 'relative' }}>
      <summary style={{ listStyle: 'none', cursor: 'pointer', fontSize: '1.5rem' }}>☰</summary>
      <div className="glass-panel" style={{
        position: 'absolute', top: '2.5rem', left: 0, zIndex: 10,
        padding: '0.5rem', minWidth: '180px'
      }}>
        <Link href="/for-sale" style={navLinkStyle}>Horses For Sale</Link>
        <Link href="/sold" style={navLinkStyle}>Horses Sold</Link>
        <Link href="/admin/login" style={navLinkStyle}>Admin</Link>
      </div>
    </details>
  );
}

const navLinkStyle = {
  display: 'block',
  padding: '0.6rem 0.8rem',
  color: '#fff',
  textDecoration: 'none',
};

function SearchBar() {
  return (
    <form action="/search" method="get" className="glass-panel" style={{
      display: 'flex', alignItems: 'center', padding: '0.9rem 1.2rem', gap: '0.6rem'
    }}>
      <span>🔍</span>
      <input
        type="text"
        name="q"
        placeholder="Search name, colour, gender"
        style={{
          background: 'transparent', border: 'none', outline: 'none',
          color: '#fff', fontFamily: 'inherit', fontSize: '1rem', flex: 1
        }}
      />
    </form>
  );
}

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 11L12 4l9 7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 10v9a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1v-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.5 3.5-7 8-7s8 2.5 8 7" strokeLinecap="round" />
    </svg>
  );
}
