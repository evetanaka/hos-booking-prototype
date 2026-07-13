import type { Venue } from '../data/venues';

interface Props {
  venue: Venue;
  partner: { name: string; message?: string } | null;
  onBook: () => void;
}

export function Hero({ venue, partner, onBook }: Props) {
  return (
    <div className="hero">
      <div className="hero__bg" style={{ backgroundImage: `url(${venue.heroImage})` }} />
      <div className="hero__overlay" />
      <div className="hero__content fade-in">
        {partner && (
          <div className="partner-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Réservation via {partner.name}
          </div>
        )}
        <div className="hero__venue-label">Dar Society présente</div>
        <h1 className="hero__title">{venue.name}</h1>
        <p className="hero__subtitle">{venue.headline}</p>
        <div className="hero__meta">
          <span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Marrakech
          </span>
          <span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            {venue.priceRange}
          </span>
          <span>{venue.cuisine.join(' · ')}</span>
        </div>
        <div style={{ marginTop: 32, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <button className="cta" onClick={onBook}>Réserver une table</button>
          <a href="#gallery" className="cta cta--outline">Découvrir</a>
        </div>
      </div>
      <div className="hero__scroll">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
      </div>
    </div>
  );
}
