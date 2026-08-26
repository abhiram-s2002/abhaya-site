import React, { useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import SearchModal from './components/SearchModal';
import MobileBottomNav from './components/MobileBottomNav';
import Toast from './components/Toast';
import AdminFloatingDock from './components/AdminFloatingDock';
import CMSEditDrawer from './components/cms/CMSEditDrawer';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CollectionsPage from './pages/CollectionsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import VioletEditionPage from './pages/VioletEditionPage';
import StoryPage from './pages/StoryPage';
import ContactPage from './pages/ContactPage';
import OffersPage from './pages/OffersPage';
import OrderLookupPage from './pages/OrderLookupPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import TermsPage from './pages/TermsPage';
import AdminPage from './pages/AdminPage';

function AppContent() {
  const { currentView, setCurrentView } = useShop();

  // Listen for hash or query parameters on initial load (e.g. /#admin or ?view=admin)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view');
    const hash = window.location.hash.replace('#', '');
    
    if (viewParam === 'admin' || hash === 'admin') {
      setCurrentView('admin');
    }
  }, [setCurrentView]);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'admin':
        return <AdminPage />;
      case 'shop':
        return <ShopPage />;
      case 'collections':
        return <CollectionsPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'violet-edition':
        return <VioletEditionPage />;
      case 'story':
        return <StoryPage />;
      case 'contact':
        return <ContactPage />;
      case 'offers':
        return <OffersPage />;
      case 'order-lookup':
        return <OrderLookupPage />;
      case 'refund-policy':
        return <RefundPolicyPage />;
      case 'terms':
        return <TermsPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fff7fc] text-on-background selection:bg-royal-violet selection:text-white">
      {/* Top Promotional Bar */}
      <AnnouncementBar />

      {/* Main Sticky Luxury Navbar */}
      <Navbar />

      {/* Dynamic Main View */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Navigation Bar (Thumb Friendly) */}
      <MobileBottomNav />

      {/* Overlays, Drawers & Modals */}
      <CartDrawer />
      <QuickViewModal />
      <SearchModal />
      <Toast />

      {/* Admin On-Page Visual Editor */}
      <AdminFloatingDock />
      <CMSEditDrawer />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
