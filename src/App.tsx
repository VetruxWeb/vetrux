// src/App.tsx
// Root application with React Router. Wraps all pages in Layout.

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/organisms/Layout';
import RouteSeo from './components/seo/RouteSeo';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import InquiryPage from './pages/InquiryPage';
import EquipmentPage from './pages/EquipmentPage';
import InsightsPage from './pages/InsightsPage';
import ArticlePage from './pages/ArticlePage';
import ProductPage from './pages/ProductPage';
import PlantingPage from './pages/PlantingPage';

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <p className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant mb-4">404</p>
      <h1 className="text-5xl font-extrabold text-on-background tracking-tighter mb-4">Page Not Found</h1>
      <p className="text-sm text-on-surface-variant mb-8">
        The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        className="inline-flex items-center px-6 py-3 bg-primary text-white text-xs font-bold tracking-widest uppercase rounded-md hover:bg-primary-container transition-all duration-300"
      >
        Return Home
      </a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteSeo />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/inquiry" element={<InquiryPage />} />
          <Route path="/equipment" element={<EquipmentPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/insights/:slug" element={<ArticlePage />} />
          <Route path="/products/cbd-isolate" element={<ProductPage />} />
          <Route path="/planting" element={<PlantingPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
