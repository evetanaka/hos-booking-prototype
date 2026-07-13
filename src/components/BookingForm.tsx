import { useState, useEffect } from 'react';
import type { Venue } from '../data/venues';
import { OCCASIONS } from '../data/venues';

interface Props {
  venue: Venue;
  onSubmit: (data: any) => void;
  onBack: () => void;
}

const GUEST_STORAGE_KEY = 'ds_guest_info';

interface SavedGuest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

function getSavedGuest(): SavedGuest | null {
  try {
    const raw = localStorage.getItem(GUEST_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
}

function saveGuest(data: SavedGuest) {
  try { localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(data)); } catch {}
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
  const [isReturning, setIsReturning] = useState(false);

  // Auto-fill from saved guest data
  useEffect(() => {
    const saved = getSavedGuest();
    if (saved) {
      setFirstName(saved.firstName);
      setLastName(saved.lastName);
      setEmail(saved.email);
      setPhone(saved.phone);
      setIsReturning(true);
    }
  }, []);

  const isValid = firstName && lastName && email && (!venue.bookingConfig.requirePhone || phone) && acceptPolicy;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    // Save guest info for next time
    saveGuest({ firstName, lastName, email, phone });
    onSubmit({ firstName, lastName, email, phone, occasion, allergies, specialRequests, marketingOptIn });
  };

  return (
    <form className="form fade-in" onSubmit={handleSubmit}>
      {isReturning && (
        <div className="returning-guest">
          <div className="returning-guest__icon">👋</div>
          <div>
            <strong>Bon retour, {firstName} !</strong>
            <span>Vos informations ont été pré-remplies.</span>
          </div>
          <button
            type="button"
            className="returning-guest__clear"
            onClick={() => {
              setFirstName(''); setLastName(''); setEmail(''); setPhone('');
              setIsReturning(false);
              localStorage.removeItem(GUEST_STORAGE_KEY);
            }}
          >
            Pas vous ?
          </button>
        </div>
      )}

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
