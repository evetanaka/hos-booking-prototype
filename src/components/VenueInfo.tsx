import type { Venue } from '../data/venues';

interface Props { venue: Venue; }

export function VenueInfo({ venue }: Props) {
  return (
    <div className="fade-in">
      <div className="section__label">L'expérience</div>
      <h2 className="section__title">À propos</h2>
      <div className="divider" />
      <p className="section__desc">{venue.description}</p>

      <div className="info-grid">
        <div className="info-card">
          <div className="info-card__icon">🕐</div>
          <div className="info-card__title">Horaires</div>
          <div className="info-card__text">
            {venue.services.map(s => (
              <div key={s.id}>{s.label} : {s.startTime} – {s.endTime}</div>
            ))}
          </div>
        </div>
        <div className="info-card">
          <div className="info-card__icon">📍</div>
          <div className="info-card__title">Adresse</div>
          <div className="info-card__text">{venue.address}</div>
        </div>
        <div className="info-card">
          <div className="info-card__icon">📞</div>
          <div className="info-card__title">Contact</div>
          <div className="info-card__text">
            <div>{venue.phone}</div>
            <a href={venue.instagramUrl} target="_blank" rel="noopener" style={{ color: 'var(--gold-dark)', fontWeight: 500, marginTop: 4, display: 'block' }}>
              @darsociety
            </a>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 40 }}>
        <div className="map-placeholder">
          <span>📍 Carte interactive — Dar des Arts, Riad Laarouss, Marrakech</span>
        </div>
      </div>
    </div>
  );
}
