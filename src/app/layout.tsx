import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL('https://media.ciellecandles.com'),
  title: 'Cielle Candles | Media Room',
  description: 'Discover Cielle Candles and founder Connie Kersee. Download the official media kit, founder portraits, logos, and approved press resources.',
  alternates: { canonical: '/' }, robots: { index: true, follow: true },
  icons: { icon: '/media/assets/favicon.png', apple: '/media/assets/favicon.png' },
  openGraph: { type: 'website', url: 'https://media.ciellecandles.com', siteName: 'Cielle Candles Media Room', title: 'Cielle Candles | The story behind the glow', description: 'The official press and promoter resource for Cielle Candles and founder Connie Kersee.', locale: 'en_US', images: [{ url: '/media/assets/social-preview.jpg', width: 1200, height: 630, alt: 'Cielle Candles — The story behind the glow. Connie Kersee in a digitally edited promotional portrait.' }] },
  twitter: { card: 'summary_large_image', title: 'Cielle Candles | Media Room', description: 'Official media kit, founder portraits, logos, and press resources.', images: ['/media/assets/social-preview.jpg'] },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>;
}
