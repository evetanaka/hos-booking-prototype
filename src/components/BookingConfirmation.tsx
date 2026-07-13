import type { Venue } from '../data/venues';

interface Props {
  venue: Venue;
  date: Date;
  slot: { service: string; time: string };
  covers: number;
  formData: any;
  partner: { name: string } | null;
  onViewBooking: () => void;
}

export function BookingConfirmation({ venue, date, slot, covers, formData, partner, onViewBooking }: Props) {
  const serviceName = venue.services.find(s => s.id === slot.service)?.label ?? slot.service;
  const ref = 'SEP-' + Math.random().toString(36).substring(2, 6).toUpperCase();

  return (
    <div className="confirmation fade-in">
      <div className="confirmation__check">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>

      <h2 className="confirmation__title">Réservation confirmée</h2>
      <p className="confirmation__subtitle">
        Un email de confirmation a été envoyé à <strong>{formData?.email}</strong>
      </p>

      <div className="confirmation__ref">{ref}</div>

      <div className="confirmation__card">
        <div className="confirmation__row">
          <span className="confirmation__row-label">Restaurant</span>
          <span className="confirmation__row-value">{venue.name}</span>
        </div>
        <div className="confirmation__row">
          <span className="confirmation__row-label">Date</span>
          <span className="confirmation__row-value">
            {date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>
        <div className="confirmation__row">
          <span className="confirmation__row-label">Heure</span>
          <span className="confirmation__row-value">{slot.time} — {serviceName}</span>
        </div>
        <div className="confirmation__row">
          <span className="confirmation__row-label">Convives</span>
          <span className="confirmation__row-value">{covers} {covers > 1 ? 'personnes' : 'personne'}</span>
        </div>
        <div className="confirmation__row">
          <span className="confirmation__row-label">Nom</span>
          <span className="confirmation__row-value">{formData?.firstName} {formData?.lastName}</span>
        </div>
        {formData?.occasion && (
          <div className="confirmation__row">
            <span className="confirmation__row-label">Occasion</span>
            <span className="confirmation__row-value">{formData.occasion}</span>
          </div>
        )}
        {partner && (
          <div className="confirmation__row">
            <span className="confirmation__row-label">Via</span>
            <span className="confirmation__row-value">{partner.name}</span>
          </div>
        )}
        {venue.bookingConfig.requireDeposit && (
          <div className="confirmation__row">
            <span className="confirmation__row-label">Caution</span>
            <span className="confirmation__row-value" style={{ color: 'var(--green)' }}>
              {venue.bookingConfig.depositAmount * covers} MAD — Payée ✓
            </span>
          </div>
        )}
      </div>

      <div className="confirmation__actions">
        <button className="cta cta--dark" onClick={onViewBooking}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          Ajouter au calendrier
        </button>
        <button className="cta" onClick={onViewBooking}>
          Gérer ma réservation
        </button>
      </div>

      <p style={{ marginTop: 32, fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.6 }}>
        Vous pouvez modifier ou annuler votre réservation à tout moment via le lien envoyé par email.
        <br />
        {venue.bookingConfig.cancellationPolicy}
      </p>
    </div>
  );
}
