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
      <section className="section" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div className="section__label">Ils en parlent</div>
          <h2 className="section__title" style={{ marginBottom: 40 }}>Nos avis</h2>

          <div className="review-cards">
            {/* Google */}
            <a href="https://www.google.com/maps/place/Dar+des+Arts/@31.6295,-7.9893" target="_blank" rel="noopener noreferrer" className="review-card">
              <div className="review-card__logo">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="review-card__platform">Google</span>
              </div>
              <div className="review-card__score">4.9</div>
              <div className="review-card__stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FBBC05"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
              </div>
              <div className="review-card__count">127 avis</div>
              <span className="review-card__link">Voir sur Google →</span>
            </a>

            {/* TripAdvisor */}
            <a href="https://www.tripadvisor.com/Restaurant_Review-Marrakech" target="_blank" rel="noopener noreferrer" className="review-card">
              <div className="review-card__logo">
                <svg width="22" height="22" viewBox="0 0 24 24">
                  <circle cx="6.5" cy="13.5" r="3" fill="none" stroke="#00AF87" strokeWidth="1.8"/>
                  <circle cx="6.5" cy="13.5" r="1" fill="#00AF87"/>
                  <circle cx="17.5" cy="13.5" r="3" fill="none" stroke="#00AF87" strokeWidth="1.8"/>
                  <circle cx="17.5" cy="13.5" r="1" fill="#00AF87"/>
                  <path d="M1 13.5C1 13.5 4 8 12 8s11 5.5 11 5.5" stroke="#00AF87" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                  <path d="M12 8V5" stroke="#00AF87" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M9 5h6" stroke="#00AF87" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                <span className="review-card__platform" style={{ color: '#00AF87' }}>Tripadvisor</span>
              </div>
              <div className="review-card__score">5.0</div>
              <div className="review-card__stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#00AF87"><circle cx="12" cy="12" r="10"/></svg>
                ))}
              </div>
              <div className="review-card__count">89 avis</div>
              <span className="review-card__link" style={{ color: '#00AF87' }}>Voir sur Tripadvisor →</span>
            </a>

            {/* Instagram */}
            <a href="https://instagram.com/darsociety" target="_blank" rel="noopener noreferrer" className="review-card">
              <div className="review-card__logo">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <defs><linearGradient id="ig" x1="0" y1="24" x2="24" y2="0"><stop offset="0%" stopColor="#FD5"/><stop offset="50%" stopColor="#FF543E"/><stop offset="100%" stopColor="#C837AB"/></linearGradient></defs>
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#ig)" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="5" stroke="url(#ig)" strokeWidth="2"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="url(#ig)"/>
                </svg>
                <span className="review-card__platform" style={{ background: 'linear-gradient(45deg, #FD5, #FF543E, #C837AB)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Instagram</span>
              </div>
              <div className="review-card__score" style={{ fontSize: '1.6rem' }}>@darsociety</div>
              <div className="review-card__count" style={{ marginTop: 4 }}>Suivez nos événements</div>
              <span className="review-card__link" style={{ color: '#C837AB' }}>Suivre →</span>
            </a>
          </div>

          <button className="cta" onClick={handleBook} style={{ marginTop: 40 }}>
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
