import Link from 'next/link';

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
      <div className="glass-panel" style={{ padding: '2rem', margin: '2rem 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', lineHeight: 1.3, fontWeight: 700 }}>
          Bringing You<br />Colour &amp;<br />Athleticism
        </h2>
      </div>

      {/* Horses For Sale / Sold buttons */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/for-sale" style={pillButtonStyle}>
          Horses For Sale
        </Link>
        <Link href="/sold" style={pillButtonStyle}>
          Horses Sold
        </Link>
      </div>

      {/* Quick links */}
      <p style={{ textAlign: 'center', marginBottom: '1rem', opacity: 0.9 }}>
        Quick Links (Horses for Sale)
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
        <Link href="/for-sale?gender=stallion" style={pillButtonStyle}>Stallions</Link>
        <Link href="/for-sale?gender=mare" style={pillButtonStyle}>Mares</Link>
        <Link href="/for-sale?gender=filly" style={pillButtonStyle}>Fillies</Link>
        <Link href="/for-sale?gender=colt" style={pillButtonStyle}>Colts</Link>
      </div>

      {/* Footer */}
      <div className="glass-panel" style={{ padding: '1.5rem', fontSize: '0.95rem', lineHeight: 1.8 }}>
        <p>🏠 Bloemfontein, Free State, South Africa</p>
        <p style={{ marginTop: '1rem' }}>
          👤 Agents:<br />
          Joey: (+27) 79 019 3590<br />
          Este: (+27) 73 838 8498<br />
          Shelishah: (+27) 79 150 2146
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
  background: 'rgba(255,255,255,0.08)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: '999px',
  color: '#fff',
  textDecoration: 'none',
  fontSize: '1.1rem',
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
