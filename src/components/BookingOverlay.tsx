import { useEffect, useRef } from 'react';
import type { Venue } from '../data/venues';
import { BookingFlow } from './BookingFlow';

interface Props {
  open: boolean;
  onClose: () => void;
  venue: Venue;
  partner: { name: string; message?: string } | null;
  onConfirm: () => void;
}

export function BookingOverlay({ open, onClose, venue, partner, onConfirm }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="overlay__panel"
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="overlay__header">
          <div>
            <span className="overlay__venue">{venue.name}</span>
            <span className="overlay__subtitle">Réservation en ligne</span>
          </div>
          <button className="overlay__close" onClick={onClose} aria-label="Fermer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overlay__body">
          <BookingFlow venue={venue} partner={partner} onConfirm={onConfirm} />
        </div>

        {/* Trust bar */}
        <div className="overlay__trust">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <span>Paiement sécurisé · Annulation flexible · Confirmation instantanée</span>
        </div>
      </div>
    </div>
  );
}
