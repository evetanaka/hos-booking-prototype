import { useParams } from 'react-router-dom';

export function ConfirmationPage() {
  const { token } = useParams<{ token: string }>();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--sand)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ maxWidth: 560, width: '100%', background: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: 'clamp(32px, 6vw, 56px)', boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: 8 }}>
            Dar Society
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: 8 }}>
            Ma réservation
          </h2>
          <div style={{ width: 40, height: 2, background: 'var(--gold)', margin: '0 auto' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: '#E8F5E9', borderRadius: 'var(--radius)', marginBottom: 24, fontSize: 14, color: 'var(--green)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
          <strong>Confirmée</strong>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Restaurant', value: 'Septem' },
            { label: 'Date', value: 'Samedi 19 juillet 2026' },
            { label: 'Heure', value: '20:00 — Dîner' },
            { label: 'Convives', value: '4 personnes' },
            { label: 'Référence', value: 'SEP-K7F2' },
          ].map((row) => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid var(--border)', fontSize: 14 }}>
              <span style={{ color: 'var(--ink-muted)' }}>{row.label}</span>
              <span style={{ fontWeight: 500 }}>{row.value}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button className="cta cta--dark cta--full" style={{ fontSize: 14 }}>
            ✏️ Modifier ma réservation
          </button>
          <button className="cta cta--full" style={{ fontSize: 14, background: 'transparent', border: '1.5px solid var(--red)', color: 'var(--red)' }}>
            Annuler ma réservation
          </button>
        </div>

        <p style={{ marginTop: 24, fontSize: 12, color: 'var(--ink-muted)', textAlign: 'center', lineHeight: 1.6 }}>
          Politique d'annulation : gratuit jusqu'à 24h avant.
          <br />
          Token: {token}
        </p>
      </div>
    </div>
  );
}
