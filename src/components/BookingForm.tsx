import { useState } from 'react';
import type { Venue } from '../data/venues';
import { OCCASIONS } from '../data/venues';

interface Props {
  venue: Venue;
  onSubmit: (data: any) => void;
  onBack: () => void;
}

export function BookingForm({ venue, onSubmit, onBack }: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [occasion, setOccasion] = useState('');
  const [allergies, setAllergies] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);

  const isValid = firstName && lastName && email && (!venue.bookingConfig.requirePhone || phone) && acceptPolicy;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onSubmit({ firstName, lastName, email, phone, occasion, allergies, specialRequests, marketingOptIn });
  };

  return (
    <form className="form fade-in" onSubmit={handleSubmit}>
      <div className="form__row">
        <div className="form__group">
          <label className="form__label">Prénom *</label>
          <input className="form__input" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Jean" required />
        </div>
        <div className="form__group">
          <label className="form__label">Nom *</label>
          <input className="form__input" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Dupont" required />
        </div>
      </div>

      <div className="form__group">
        <label className="form__label">Email *</label>
        <input className="form__input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jean@exemple.com" required />
      </div>

      {venue.bookingConfig.requirePhone && (
        <div className="form__group">
          <label className="form__label">Téléphone *</label>
          <input className="form__input" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+33 6 12 34 56 78" required />
        </div>
      )}

      <div className="form__group">
        <label className="form__label">Occasion</label>
        <select className="form__select" value={occasion} onChange={(e) => setOccasion(e.target.value)}>
          {OCCASIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      <div className="form__group">
        <label className="form__label">Allergies ou intolérances</label>
        <input className="form__input" type="text" value={allergies} onChange={(e) => setAllergies(e.target.value)} placeholder="Gluten, fruits de mer, lactose..." />
      </div>

      <div className="form__group">
        <label className="form__label">Demandes spéciales</label>
        <textarea className="form__input" value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} placeholder="Table en terrasse, chaise haute, décoration anniversaire..." />
      </div>

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label className="form__checkbox">
          <input type="checkbox" checked={acceptPolicy} onChange={(e) => setAcceptPolicy(e.target.checked)} />
          <span>J'accepte la <strong>politique d'annulation</strong> : {venue.bookingConfig.cancellationPolicy}</span>
        </label>

        <label className="form__checkbox">
          <input type="checkbox" checked={marketingOptIn} onChange={(e) => setMarketingOptIn(e.target.checked)} />
          <span>Je souhaite recevoir les offres et actualités de Dar Society</span>
        </label>
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
        <button type="button" className="cta cta--outline" onClick={onBack} style={{ flex: '0 0 auto', border: '1.5px solid var(--border)', color: 'var(--ink)' }}>
          ← Retour
        </button>
        <button type="submit" className="cta cta--dark cta--full" disabled={!isValid} style={{ opacity: isValid ? 1 : 0.3 }}>
          {venue.bookingConfig.requireDeposit ? 'Procéder au paiement →' : 'Confirmer la réservation →'}
        </button>
      </div>
    </form>
  );
}
