import { useState, useEffect } from 'react';
import { importPharmacies } from './lib/importPharmacies';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FindMedicinesPage from './pages/FindMedicinesPage';
import PharmaciesPage from './pages/PharmaciesPage';
import PharmacyDetailsPage from './pages/PharmacyDetailsPage';
import ReserveModal from './components/ReserveModal';
import LoginModal from './components/LoginModal';
import Toast from './components/Toast';

export default function App() {
  // Navigation State
  const [activeView, setActiveView] = useState('home'); // 'home' | 'medicines' | 'pharmacies' | 'pharmacy-details'
  const [selectedPharmacyId, setSelectedPharmacyId] = useState('ph-1');

  // Shared Search & Category State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Auth State
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Reserve Modal State
  const [reserveModalState, setReserveModalState] = useState({
    isOpen: false,
    medicine: null,
    pharmacy: null,
    stockItem: null
  });

  // Notification Toast State
  const [toast, setToast] = useState(null);

  // Hash Navigation Sync for browser forward/back buttons & bookmarks
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('pharmacy/')) {
        const id = hash.replace('pharmacy/', '');
        setSelectedPharmacyId(id);
        setActiveView('pharmacy-details');
      } else if (hash === 'medicines') {
        setActiveView('medicines');
      } else if (hash === 'pharmacies') {
        setActiveView('pharmacies');
      } else if (hash === 'home' || hash === '') {
        setActiveView('home');
      }
    };

    // Initialize from current hash if present
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view, pharmacyId = null) => {
    setActiveView(view);
    if (view === 'pharmacy-details' && pharmacyId) {
      setSelectedPharmacyId(pharmacyId);
      window.location.hash = `pharmacy/${pharmacyId}`;
    } else {
      window.location.hash = view;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handlers
  const handleHeroSearch = (query) => {
    setSearchQuery(query);
    navigateTo('medicines');
    if (query) {
      setToast({
        message: `Searching stock for "${query}" across local pharmacies...`,
        type: 'info'
      });
    }
  };

  const handleSelectCategory = (catName) => {
    setSelectedCategory(catName);
    setSearchQuery('');
    navigateTo('medicines');
  };

  const handleSelectPharmacy = (pharmacyId) => {
    navigateTo('pharmacy-details', pharmacyId);
  };

  const handleOpenReserve = (medicine, pharmacy, stockItem) => {
    setReserveModalState({
      isOpen: true,
      medicine,
      pharmacy,
      stockItem
    });
  };

  const handleCloseReserve = () => {
    setReserveModalState({
      isOpen: false,
      medicine: null,
      pharmacy: null,
      stockItem: null
    });
  };

  const handleConfirmReservation = (resData) => {
    setToast({
      message: `Reservation ${resData.code} placed for ${resData.medicineName} at ${resData.pharmacyName}!`,
      type: 'success'
    });
  };

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setToast({
      message: `Welcome back, ${userData.name}! Logged in as ${userData.role}.`,
      type: 'success'
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setToast({
      message: 'You have been successfully logged out.',
      type: 'info'
    });
  };

  return (
    <div className="app-root">
      <button onClick={async () => await importPharmacies()}>
  Import Pharmacies
</button>{/* Healthcare Navigation Bar */}
      <Navbar
        activeView={activeView}
        setActiveView={(view) => navigateTo(view)}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main View Router */}
      <main className="main-content">
        {activeView === 'home' && (
          <HomePage
            onSearchSubmit={handleHeroSearch}
            onSelectCategory={handleSelectCategory}
            onSelectPharmacy={handleSelectPharmacy}
            onOpenReserve={handleOpenReserve}
            setActiveView={(view) => navigateTo(view)}
          />
        )}

        {activeView === 'medicines' && (
          <FindMedicinesPage
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onSelectPharmacy={handleSelectPharmacy}
            onOpenReserve={handleOpenReserve}
          />
        )}

        {activeView === 'pharmacies' && (
          <PharmaciesPage
            onSelectPharmacy={handleSelectPharmacy}
          />
        )}

        {activeView === 'pharmacy-details' && (
          <PharmacyDetailsPage
            pharmacyId={selectedPharmacyId}
            onBackToPharmacies={(view) => navigateTo(view)}
            onOpenReserve={handleOpenReserve}
            onShowToast={setToast}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveView={(view) => navigateTo(view)} />

      {/* Interactive Reservation Modal */}
      <ReserveModal
        isOpen={reserveModalState.isOpen}
        onClose={handleCloseReserve}
        medicine={reserveModalState.medicine}
        pharmacy={reserveModalState.pharmacy}
        stockItem={reserveModalState.stockItem}
        onConfirmReservation={handleConfirmReservation}
      />

      {/* Login & Demo Accounts Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* System Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
