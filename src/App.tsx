import { lazy } from 'react';
import { Route, Routes } from 'react-router';
import { SiteLayout } from './components/SiteLayout';

const FaqPage = lazy(() => import('./pages/FaqPage').then((module) => ({ default: module.FaqPage })));
const HomePage = lazy(() => import('./pages/HomePage').then((module) => ({ default: module.HomePage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })));
const PrivacyPage = lazy(() => import('./pages/LegalPage').then((module) => ({ default: module.PrivacyPage })));
const RulesPage = lazy(() => import('./pages/RulesPage').then((module) => ({ default: module.RulesPage })));
const ServerPage = lazy(() => import('./pages/ServerPage').then((module) => ({ default: module.ServerPage })));
const StatusPage = lazy(() => import('./pages/StatusPage').then((module) => ({ default: module.StatusPage })));
const StorePage = lazy(() => import('./pages/StorePage').then((module) => ({ default: module.StorePage })));
const TermsPage = lazy(() => import('./pages/LegalPage').then((module) => ({ default: module.TermsPage })));

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="servidor" element={<ServerPage />} />
        <Route path="loja" element={<StorePage />} />
        <Route path="regras" element={<RulesPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="status" element={<StatusPage />} />
        <Route path="termos" element={<TermsPage />} />
        <Route path="privacidade" element={<PrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
