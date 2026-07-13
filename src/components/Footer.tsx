import type { Venue } from '../data/venues';

interface Props { venue: Venue; }

export function Footer({ venue }: Props) {
  return (
    <footer className="footer">
      <p>© 2026 Dar Society — {venue.name}</p>
      <p style={{ marginTop: 8 }}>
        <a href="https://darsociety.com">darsociety.com</a>
        {' · '}
        <a href={venue.instagramUrl}>Instagram</a>
        {' · '}
        <a href="#">Politique de confidentialité</a>
      </p>
    </footer>
  );
}
