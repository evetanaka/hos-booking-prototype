import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VENUES, PARTNERS } from '../data/venues';
import { Hero } from '../components/Hero';
import { Gallery } from '../components/Gallery';
import { VenueInfo } from '../components/VenueInfo';
import { MenuPreview } from '../components/MenuPreview';
import { BookingFlow } from '../components/BookingFlow';
import { Footer } from '../components/Footer';

export function VenuePage() {
  const { slug, partnerCode } = useParams<{ slug: string; partnerCode?: string }>();
  const navigate = useNavigate();
  const venue = VENUES[slug || ''];
  const partner = partnerCode ? PARTNERS[partnerCode] : null;
  const [showBooking, setShowBooking] = useState(false);

  if (!venue) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <h2>Venue introuvable</h2>
        <button className="cta" onClick={() => navigate('/septem/book')}>Voir Septem</button>
      </div>
    );
  }

  const handleBook = () => {
    setShowBooking(true);
    setTimeout(() => {
      document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleConfirm = () => {
    navigate('/booking/demo-token-abc123');
  };

  return (
    <div>
      <Hero venue={venue} partner={partner} onBook={handleBook} />

      <section className="section">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Gallery images={venue.gallery} />
        </div>
      </section>

      <section className="section section--sand">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <VenueInfo venue={venue} />
        </div>
      </section>

      {venue.bookingConfig.showMenu && (
        <section className="section">
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div className="section__label">La Carte</div>
            <h2 className="section__title">Notre Menu</h2>
            <div className="divider" />
            <MenuPreview menu={venue.menu} />
          </div>
        </section>
      )}

      <section className="section section--sand" id="booking-section">
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {!showBooking ? (
            <div style={{ textAlign: 'center' }} className="fade-in">
              <div className="section__label">Réservation</div>
              <h2 className="section__title">Réservez votre table</h2>
              <div className="divider divider--center" />
              <p className="section__desc" style={{ margin: '0 auto 40px' }}>
                Choisissez votre date, votre créneau et rejoignez-nous pour une expérience culinaire inoubliable.
              </p>
              <button className="cta" onClick={() => setShowBooking(true)}>
                Commencer la réservation
              </button>
            </div>
          ) : (
            <BookingFlow venue={venue} partner={partner} onConfirm={handleConfirm} />
          )}
        </div>
      </section>

      {/* Sticky mobile CTA */}
      {!showBooking && (
        <div className="sticky-cta">
          <button className="cta cta--full" onClick={handleBook}>
            Réserver une table
          </button>
        </div>
      )}

      <Footer venue={venue} />
    </div>
  );
}
