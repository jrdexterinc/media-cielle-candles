import { brand, downloads, portraits } from '@/lib/brand';
import { CopyButton } from '@/components/copy-button';
const assets = '/media/assets/';
const files = '/media/downloads/';
const kit = `${files}Cielle_Candles_Complete_Media_Kit.zip`;
function Arrow({ down = false }: { down?: boolean }) {
  return <svg aria-hidden="true" className="arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">{down ? <path d="M12 4v15m-6-6 6 6 6-6" /> : <path d="M6 18 18 6M6 6h12v12" />}</svg>;
}
function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) { return <p className="eyebrow section-label"><span>{number}</span>{children}</p>; }
export default function Home() {
  return <>
    <div className="announcement">THE OFFICIAL PRESS &amp; PROMOTER RESOURCE</div>
    <header className="site-header wrap">
      <a href="#" aria-label="Cielle Candles media room home" className="brand-mark"><img src={`${assets}logo-primary-transparent.png`} width="1375" height="810" alt="Cielle Candles" /></a>
      <nav aria-label="Main navigation" className="main-nav"><a href="#brand">The brand</a><a href="#founder">The founder</a><a href="#downloads">Media kit</a><a href="#contact">Contact</a></nav>
      <a className="store-link" href={brand.website}>Visit the shop <Arrow /></a>
    </header>
    <main id="main">
      <section className="hero wrap" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="small-line" /> Cielle Candles · Media room</p>
          <h1 id="hero-title">The story<br />behind the <em>glow.</em></h1>
          <p className="hero-tagline">Hand-poured with intention.<br />Made to set the mood.</p>
          <p className="hero-description">{brand.introduction}</p>
          <div className="button-row"><a className="button button-dark" href={kit} download>Download the media kit <Arrow down /></a><a href="#brand" className="text-link">Discover the brand <Arrow /></a></div>
          <p className="file-note">COMPLETE PRESS PACKAGE · ZIP · 12.7 MB</p>
        </div>
        <figure className="hero-figure"><img src={`${assets}portrait-rust-sweater.webp`} width="1254" height="1254" alt="Connie Kersee in a rust sweater, seated beside candles. Digitally edited promotional portrait." fetchPriority="high" /><figcaption><span><strong>Connie Kersee</strong><span>Founder &amp; Artisan</span></span><span className="caption-mark" aria-hidden="true">C.</span></figcaption></figure>
      </section>
      <div className="category-strip" aria-label="Product categories"><span>Candles</span><span aria-hidden="true">✦</span><span>Wax melts</span><span aria-hidden="true">✦</span><span>Reed diffusers</span><span aria-hidden="true" className="strip-extra">✦</span><span className="strip-extra">A little everyday luxury</span></div>
      <section id="brand" className="section wrap brand-section" aria-labelledby="brand-title">
        <SectionLabel number="01">About the brand</SectionLabel>
        <div className="brand-grid"><div><h2 id="brand-title">A beautiful scent.<br />A different <em>feeling.</em></h2><p className="serif-subtitle">Warmth, beauty, and intention<br />in every room.</p></div><div className="brand-story"><p className="lead">{brand.description}</p><p>{brand.background}</p><a className="text-link" href={brand.website}>Explore Cielle Candles <Arrow /></a></div></div>
        <dl className="facts"><div><dt>Founded by</dt><dd>Connie Kersee</dd></div><div><dt>The craft</dt><dd>Small-batch soy candles</dd></div><div><dt>The collection</dt><dd>Candles, wax melts &amp; reed diffusers</dd></div></dl>
      </section>
      <section id="founder" className="founder-section" aria-labelledby="founder-title"><div className="wrap section">
        <SectionLabel number="02">Meet the founder</SectionLabel>
        <div className="founder-intro"><div><p className="eyebrow rust">Founder &amp; Artisan</p><h2 id="founder-title">Connie <em>Kersee.</em></h2></div><div><p className="lead">{brand.biography}</p><p className="muted">For introductions and promotional materials, please use<br className="desktop-break" /> <strong>Connie Kersee, Founder &amp; Artisan.</strong></p></div></div>
        <div className="portrait-grid">{portraits.map((portrait) => <figure className="portrait-card" key={portrait.file}><a href={`${assets}${portrait.file}.png`} download aria-label={`Download Connie Kersee portrait: ${portrait.wardrobe} (PNG)`} className="portrait-image"><img src={`${assets}${portrait.file}.webp`} width="1254" height="1254" loading="lazy" alt={`Connie Kersee, Founder & Artisan, in a ${portrait.wardrobe.toLowerCase()}. Digitally edited promotional portrait.`} /><span className="image-download" aria-hidden="true">↓</span></a><figcaption><span className="eyebrow">{portrait.number} / {portrait.wardrobe}</span><h3>{portrait.title}</h3><a href={`${assets}${portrait.file}.png`} download className="text-link">Download portrait <Arrow down /></a><span className="file-note">PNG · 1254 × 1254 PX</span></figcaption></figure>)}</div>
        <p className="usage-note"><span aria-hidden="true">ⓘ</span> These promotional portraits are AI-assisted edits of reference photographs supplied by the brand. Wardrobes and backgrounds have been digitally altered. Please disclose digital alteration as appropriate for editorial use.</p>
      </div></section>
      <section id="assets" className="section wrap" aria-labelledby="assets-title">
        <SectionLabel number="03">Brand identity</SectionLabel>
        <div className="section-heading"><h2 id="assets-title">The official <em>marks.</em></h2><p>Two approved versions. One unmistakable identity.<br />Use the supplied artwork with generous clear space.</p></div>
        <div className="logo-grid">{[{ file: 'logo-primary-transparent.png', title: 'Primary logo', description: 'For light backgrounds', className: 'light-logo' }, { file: 'logo-reverse-transparent.png', title: 'Reverse logo', description: 'For dark backgrounds', className: 'dark-logo' }].map((logo) => <article key={logo.file}><div className={`logo-display ${logo.className}`}><img src={`${assets}${logo.file}`} width="1375" height="810" loading="lazy" alt={`Cielle Candles ${logo.title.toLowerCase()}`} /></div><div className="logo-caption"><div><h3>{logo.title}</h3><p>{logo.description} · Transparent PNG</p></div><a className="icon-link" href={`${assets}${logo.file}`} download aria-label={`Download ${logo.title.toLowerCase()}`}><Arrow down /></a></div></article>)}</div>
        <p className="usage-note">Please do not stretch, rotate, recolor, or add effects to the logos. <a href={`${files}BRAND_GUIDELINES.md`} download>Download brand usage guidelines <Arrow down /></a></p>
      </section>
      <section id="downloads" className="downloads-section" aria-labelledby="downloads-title"><div className="wrap section">
        <SectionLabel number="04">Press &amp; media downloads</SectionLabel>
        <div className="section-heading"><h2 id="downloads-title">Your story starts <em>here.</em></h2><p>Approved resources for thoughtful coverage,<br />introductions, and event promotion.</p></div>
        <div className="download-layout"><a href={kit} download className="complete-kit"><span className="eyebrow">The complete collection</span><span className="kit-symbol" aria-hidden="true">↓</span><h3>Everything you need.<br />All in one place.</h3><p>Media kit, promoter one-sheet, approved copy, portraits, logos, and brand guidelines.</p><span className="kit-bottom"><span>Download complete media kit<br /><small>ZIP · 12.7 MB</small></span><Arrow down /></span></a><div className="download-list">{downloads.map((item) => <a href={`${files}${item.file}`} download className="download-row" key={item.file}><span className="download-number">{item.number}</span><span className="download-text"><h3>{item.title}</h3><p>{item.description}</p><span className="file-note">{item.format}</span></span><span className="download-circle"><Arrow down /></span></a>)}</div></div>
        <div className="approved-copy"><div><p className="eyebrow">In a few words</p><h3>An introduction,<br />ready to share.</h3></div><div><p>{brand.introduction}</p><CopyButton text={brand.introduction} /><details><summary>Read the approved event spotlight</summary><p>{brand.spotlight}</p></details></div></div>
      </div></section>
      <section id="contact" className="contact-section wrap section" aria-labelledby="contact-title"><SectionLabel number="05">Press &amp; partnerships</SectionLabel><div className="contact-grid"><div><h2 id="contact-title">Let’s make<br />a little <em>light.</em></h2><p>For press inquiries, interviews, event appearances,<br />and permission to use brand materials.</p></div><div className="contact-links"><p className="eyebrow">Get in touch</p><a className="email-link" href={`mailto:${brand.email}`}>{brand.email}<Arrow /></a><div className="social-links"><a href={brand.instagram}>Instagram @ciellecandles26 <Arrow /></a><a href={brand.facebook}>Find Cielle Candles on Facebook <Arrow /></a><a href={brand.website}>ciellecandles.com <Arrow /></a></div></div></div></section>
    </main>
    <footer className="site-footer"><div className="wrap"><div className="footer-top"><a href="#" aria-label="Cielle Candles media room home"><img src={`${assets}logo-reverse-transparent.png`} width="1375" height="810" alt="Cielle Candles" loading="lazy" /></a><p>Hand-poured with intention.<br />Made to set the mood.</p><a href={brand.website} className="text-link">Visit the shop <Arrow /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Cielle Candles</span><span>The official media room · Updated October 2026</span><a href={`${files}BRAND_GUIDELINES.md`} download>Asset usage guidelines</a></div><p className="footer-note">Assets are supplied for accurate coverage and promotion of Cielle Candles. Please request permission for unrelated commercial use. Confirm current product details and availability at ciellecandles.com.</p></div></footer>
  </>;
}
