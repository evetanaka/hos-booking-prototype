import { Routes, Route, Navigate } from 'react-router-dom';
import { VenuePage } from './pages/VenuePage';
import { ConfirmationPage } from './pages/ConfirmationPage';

export default function App() {
  return (
    <Routes>
      <Route path="/:slug/book" element={<VenuePage />} />
      <Route path="/:slug/partner/:partnerCode/book" element={<VenuePage />} />
      <Route path="/booking/:token" element={<ConfirmationPage />} />
      <Route path="*" element={<Navigate to="/septem/book" replace />} />
    </Routes>
  );
}
