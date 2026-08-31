import './globals.css';

export const metadata = {
  title: 'Lucida Farm | Horses',
  description: 'Horses for sale from Lucida Farm — Bloemfontein, South Africa',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
