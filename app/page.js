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
      <div className="glass-panel" style={{
        padding: '2rem', margin: '2rem 0', position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', gap: '0.5rem', minHeight: '260px'
      }}>
        <div style={{ flex: '0 0 42%' }}>
          <h2 style={{ fontSize: '1.7rem', lineHeight: 1.3, fontWeight: 700 }}>
            Bringing You<br />Colour &amp;<br />Athleticism
          </h2>
          <div style={{ position: 'relative', width: '70px', height: '70px', marginTop: '0.8rem' }}>
            <Image
              src="/Photoroom_20260831_162158.png"
              alt="Lucida Farm logo"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>

        <div style={{ flex: '1 1 58%', position: 'relative', height: '240px' }}>
          <Image
            src="/Photoroom_20260831_161514.png"
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
      <SearchIcon />
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

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <line x1="20" y1="20" x2="15.3" y2="15.3" strokeLinecap="round" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3.5L3 11h2v9a1 1 0 001 1h5v-7h2v7h5a1 1 0 001-1v-9h2L12 3.5z" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="7.5" r="4.5" />
      <path d="M4 21c0-5 3.6-8 8-8s8 3 8 8a1 1 0 01-1 1H5a1 1 0 01-1-1z" />
    </svg>
  );
}
