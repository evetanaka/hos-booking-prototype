import { useState } from 'react';
import type { Venue } from '../data/venues';

interface Props {
  venue: Venue;
  covers: number;
  onPaid: () => void;
  onBack: () => void;
}

export function DepositStep({ venue, covers, onPaid, onBack }: Props) {
  const [processing, setProcessing] = useState(false);
  const total = venue.bookingConfig.depositAmount * covers;

  const handlePay = () => {
    setProcessing(true);
    // Simulate Stripe payment
    setTimeout(() => {
      setProcessing(false);
      onPaid();
    }, 2000);
  };

  return (
    <div className="fade-in" style={{ maxWidth: 480, margin: '0 auto' }}>
      <h3 style={{ textAlign: 'center', marginBottom: 8 }}>Caution</h3>
      <p style={{ textAlign: 'center', color: 'var(--ink-muted)', fontSize: 14, marginBottom: 32 }}>
        Une caution est requise pour confirmer votre réservation.
      </p>

      <div style={{
        background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)',
        padding: 32, marginBottom: 24
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14 }}>
          <span style={{ color: 'var(--ink-muted)' }}>Caution par personne</span>
          <span>{venue.bookingConfig.depositAmount} MAD</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14 }}>
          <span style={{ color: 'var(--ink-muted)' }}>Nombre de convives</span>
          <span>× {covers}</span>
        </div>
        <div style={{ height: 1, background: 'var(--border)', margin: '12px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-serif)', fontSize: '1.5rem' }}>
          <span>Total</span>
          <span>{total} MAD</span>
        </div>
      </div>

      <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 24, lineHeight: 1.6 }}>
        {venue.bookingConfig.cancellationPolicy}
      </p>

      {/* Simulated Stripe Elements */}
      <div style={{
        border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', padding: '14px 16px',
        marginBottom: 12, background: 'var(--white)', fontSize: 15, color: 'var(--ink-muted)',
        display: 'flex', alignItems: 'center', gap: 8
      }}>
        <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
          <rect width="20" height="14" rx="2" fill="#1A1F36"/>
          <path d="M9.5 4.5C8.5 4 6.5 4.5 6.5 6s2 1.5 2 3-2 2-3 1.5" stroke="white" strokeWidth="1.2"/>
        </svg>
        4242 4242 4242 4242
      </div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <div style={{
          flex: 1, border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', padding: '14px 16px',
          fontSize: 15, color: 'var(--ink-muted)', background: 'var(--white)'
        }}>
          12 / 28
        </div>
        <div style={{
          flex: 1, border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', padding: '14px 16px',
          fontSize: 15, color: 'var(--ink-muted)', background: 'var(--white)'
        }}>
          123
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <button style={{
          flex: 1, padding: '14px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)',
          background: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          fontSize: 14, fontWeight: 500, cursor: 'pointer'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.72 5.01l1.6 4.55H4.68l1.6-4.55h11.44M21.5 9.56l-2.31-6.56H4.81L2.5 9.56h19zM7.5 18.48c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
          Apple Pay
        </button>
        <button style={{
          flex: 1, padding: '14px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)',
          background: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          fontSize: 14, fontWeight: 500, cursor: 'pointer'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M12 11h8.5c.1.5.2 1 .2 1.6 0 4.7-3.1 8-8 8-4.6 0-8.3-3.7-8.3-8.3S8.1 4 12.7 4c2.2 0 4 .8 5.4 2.1l-2.3 2.2C14.9 7.5 14 7 12.7 7c-2.8 0-5 2.3-5 5.2s2.2 5.2 5 5.2c2.5 0 4.1-1.5 4.5-3.4H12V11z"/></svg>
          Google Pay
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', marginBottom: 24, fontSize: 12, color: 'var(--ink-muted)' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        Paiement sécurisé via Stripe
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button className="cta cta--outline" onClick={onBack} style={{ flex: '0 0 auto', border: '1.5px solid var(--border)', color: 'var(--ink)' }}>
          ← Retour
        </button>
        <button className="cta cta--dark cta--full" onClick={handlePay} disabled={processing}>
          {processing ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="spinner" style={{
                width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)',
                borderTop: '2px solid white', borderRadius: '50%',
                animation: 'spin 0.6s linear infinite', display: 'inline-block'
              }} />
              Paiement en cours...
            </span>
          ) : `Payer ${total} MAD →`}
        </button>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
