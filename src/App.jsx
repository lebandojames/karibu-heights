import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import SiteLayout from '@/components/site/SiteLayout';
// Lazy-load page components so each route ships as its own chunk
const Home = lazy(() => import('@/pages/Home'));
const Rooms = lazy(() => import('@/pages/Rooms'));
const RoomDetail = lazy(() => import('@/pages/RoomDetail'));
const Booking = lazy(() => import('@/pages/Booking'));
const Gallery = lazy(() => import('@/pages/Gallery'));
const Conference = lazy(() => import('@/pages/Conference'));
const Contact = lazy(() => import('@/pages/Contact'));
const Policies = lazy(() => import('@/pages/Policies'));
const Admin = lazy(() => import('@/pages/Admin'));

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Suspense fallback={<div className="fixed inset-0 grid place-items-center bg-[#F9F7F2]"><div className="w-7 h-7 border-2 border-black/10 border-t-[#2D5A43] rounded-full animate-spin" /></div>}>
    <Routes>
      {/* Add your page Route elements here */}
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:id" element={<RoomDetail />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/conference" element={<Conference />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policies" element={<Policies />} />
      </Route>
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    </Suspense>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App