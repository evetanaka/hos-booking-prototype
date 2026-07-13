import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VENUES, PARTNERS } from '../data/venues';
import { Hero } from '../components/Hero';
import { Gallery } from '../components/Gallery';
import { VenueInfo } from '../components/VenueInfo';
import { MenuPreview } from '../components/MenuPreview';
import { BookingOverlay } from '../components/BookingOverlay';
import { Footer } from '../components/Footer';

export function VenuePage() {
  const { slug, partnerCode } = useParams<{ slug: string; partnerCode?: string }>();
  const navigate = useNavigate();
  const venue = VENUES[slug || ''];
  const partner = partnerCode ? PARTNERS[partnerCode] : null;
  const [showBooking, setShowBooking] = useState(false);
  const [heroCtaVisible, setHeroCtaVisible] = useState(true);
  const heroCtaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroCtaRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroCtaVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!venue) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <h2>Venue introuvable</h2>
        <button className="cta" onClick={() => navigate('/septem/book')}>Voir Septem</button>
      </div>
    );
  }

  const handleBook = () => setShowBooking(true);
  const handleConfirm = () => navigate('/booking/demo-token-abc123');

  return (
    <div>
      <Hero venue={venue} partner={partner} onBook={handleBook} heroCtaRef={heroCtaRef} />

      {/* Description — right after hero */}
      <section className="section">
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', lineHeight: 1.7, color: 'var(--ink-light)', fontWeight: 300 }}>
            {venue.description}
          </p>
        </div>
      </section>

      {/* Menu — before gallery and about */}
      {venue.bookingConfig.showMenu && (
        <section className="section section--sand">
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div className="section__label">La Carte</div>
            <h2 className="section__title">Notre Menu</h2>
            <div className="divider" />
            <MenuPreview menu={venue.menu} />
          </div>
        </section>
      )}

      <section className="section" id="gallery">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Gallery images={venue.gallery} />
        </div>
      </section>

      <section className="section section--sand">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <VenueInfo venue={venue} />
        </div>
      </section>

      {/* Social proof */}
      <section className="section" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <div className="social-proof fade-in">
            <div className="social-proof__stats">
              <div className="social-proof__stat">
                <span className="social-proof__number">4.9</span>
                <span className="social-proof__label">★★★★★ Google</span>
              </div>
              <div className="social-proof__divider" />
              <div className="social-proof__stat">
                <span className="social-proof__number">2 800+</span>
                <span className="social-proof__label">Convives cette saison</span>
              </div>
              <div className="social-proof__divider" />
              <div className="social-proof__stat">
                <span className="social-proof__number">7</span>
                <span className="social-proof__label">Services du menu dégustation</span>
              </div>
            </div>
          </div>
          <button className="cta" onClick={handleBook} style={{ marginTop: 32 }}>
            Réserver une table
          </button>
        </div>
      </section>

      <Footer venue={venue} />

      {/* Floating CTA */}
      {!heroCtaVisible && !showBooking && (
        <>
          <button className="floating-cta floating-cta--desktop" onClick={handleBook}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            Réserver
          </button>
          <div className="floating-cta--mobile">
            <div className="floating-cta__info">
              <span className="floating-cta__venue">{venue.name}</span>
              <span className="floating-cta__price">{venue.priceRange} · Marrakech</span>
            </div>
            <button className="cta cta--compact" onClick={handleBook}>
              Réserver
            </button>
          </div>
        </>
      )}

      <BookingOverlay
        open={showBooking}
        onClose={() => setShowBooking(false)}
        venue={venue}
        partner={partner}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
