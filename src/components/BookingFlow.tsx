import { useState } from 'react';
import type { Venue } from '../data/venues';
import { Calendar } from './Calendar';
import { CoverSelector } from './CoverSelector';
import { TimeSlots } from './TimeSlots';
import { BookingForm } from './BookingForm';
import { DepositStep } from './DepositStep';
import { BookingConfirmation } from './BookingConfirmation';

const STEPS = [
  { num: 1, label: 'Date' },
  { num: 2, label: 'Créneau' },
  { num: 3, label: 'Informations' },
  { num: 4, label: 'Confirmation' },
];

interface Props {
  venue: Venue;
  partner: { name: string; message?: string } | null;
  onConfirm: () => void;
}

export function BookingFlow({ venue, partner, onConfirm }: Props) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [covers, setCovers] = useState(venue.bookingConfig.defaultCovers);
  const [selectedSlot, setSelectedSlot] = useState<{ service: string; time: string } | null>(null);
  const [formData, setFormData] = useState<any>(null);

  const goNext = () => setStep((s) => Math.min(s + 1, 5));
  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="booking fade-in">
      {/* Step indicator */}
      <div className="booking__steps">
        {STEPS.map((s, i) => (
          <div key={s.num} style={{ display: 'flex', alignItems: 'center' }}>
            <div className={`booking__step ${step === s.num ? 'booking__step--active' : ''} ${step > s.num ? 'booking__step--done' : ''}`}>
              <span className="booking__step-num">
                {step > s.num ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                ) : s.num}
              </span>
              <span>{s.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`booking__step-line ${step > s.num ? 'booking__step-line--done' : ''}`} />
            )}
          </div>
        ))}
      </div>

      {partner?.message && (
        <div style={{
          padding: '12px 16px', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)',
          borderRadius: 'var(--radius)', fontSize: 14, color: 'var(--ink-light)', marginBottom: 32, textAlign: 'center'
        }}>
          {partner.message}
        </div>
      )}

      {/* Step 1: Date + Covers */}
      {step === 1 && (
        <div className="fade-in">
          <h3 style={{ textAlign: 'center', marginBottom: 32 }}>
            Quand souhaitez-vous venir ?
          </h3>
          <CoverSelector covers={covers} onChange={setCovers} min={venue.bookingConfig.minCovers} max={venue.bookingConfig.maxCovers} />
          <Calendar
            selectedDate={selectedDate}
            onSelect={(d) => { setSelectedDate(d); setSelectedSlot(null); }}
            maxAdvanceDays={venue.bookingConfig.maxAdvanceDays}
          />
          <button
            className="cta cta--dark cta--full"
            disabled={!selectedDate}
            onClick={goNext}
            style={{ opacity: selectedDate ? 1 : 0.3, marginTop: 8 }}
          >
            Choisir un créneau →
          </button>
        </div>
      )}

      {/* Step 2: Time Slot */}
      {step === 2 && (
        <div className="fade-in">
          <h3 style={{ textAlign: 'center', marginBottom: 8 }}>
            À quelle heure ?
          </h3>
          <p style={{ textAlign: 'center', color: 'var(--ink-muted)', fontSize: 14, marginBottom: 32 }}>
            {selectedDate?.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })} · {covers} {covers > 1 ? 'personnes' : 'personne'}
          </p>
          <TimeSlots services={venue.services} selected={selectedSlot} onSelect={setSelectedSlot} />
          <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
            <button className="cta cta--outline" onClick={goBack} style={{ flex: '0 0 auto', border: '1.5px solid var(--border)', color: 'var(--ink)' }}>
              ← Retour
            </button>
            <button
              className="cta cta--dark cta--full"
              disabled={!selectedSlot}
              onClick={goNext}
              style={{ opacity: selectedSlot ? 1 : 0.3 }}
            >
              Continuer →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Form */}
      {step === 3 && (
        <div className="fade-in">
          <h3 style={{ textAlign: 'center', marginBottom: 8 }}>
            Vos coordonnées
          </h3>
          <p style={{ textAlign: 'center', color: 'var(--ink-muted)', fontSize: 14, marginBottom: 32 }}>
            {selectedDate?.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })} · {selectedSlot?.time} · {covers} {covers > 1 ? 'pers.' : 'pers.'}
          </p>
          <BookingForm
            venue={venue}
            onSubmit={(data) => { setFormData(data); goNext(); }}
            onBack={goBack}
          />
        </div>
      )}

      {/* Step 4: Deposit or Confirmation */}
      {step === 4 && !venue.bookingConfig.requireDeposit && (
        <BookingConfirmation
          venue={venue}
          date={selectedDate!}
          slot={selectedSlot!}
          covers={covers}
          formData={formData}
          partner={partner}
          onViewBooking={onConfirm}
        />
      )}
      {step === 4 && venue.bookingConfig.requireDeposit && !formData?._depositPaid && (
        <DepositStep
          venue={venue}
          covers={covers}
          onPaid={() => { setFormData({ ...formData, _depositPaid: true }); }}
          onBack={goBack}
        />
      )}
      {step === 4 && venue.bookingConfig.requireDeposit && formData?._depositPaid && (
        <BookingConfirmation
          venue={venue}
          date={selectedDate!}
          slot={selectedSlot!}
          covers={covers}
          formData={formData}
          partner={partner}
          onViewBooking={onConfirm}
        />
      )}
    </div>
  );
}
